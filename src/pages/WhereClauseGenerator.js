import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { TextField, Button, Box, Tabs, Tab, Container, Typography } from '@mui/material';
import { generateClausesFromPaste, generateWhereClause } from '../utils/sqlGenerator';

function WhereClauseGenerator() {
  const [excelData, setExcelData] = useState('');
  const [parsedData, setParsedData] = useState([]);
  const [whereClause, setWhereClause] = useState('');
  const [attributeName, setAttributeName] = useState('column_name');
  const [notIn, setNotIn] = useState(false);
  const [batchSize, setBatchSize] = useState(0);
  const [currentTab, setCurrentTab] = useState(0); // 0 for Pasted Data, 1 for Where Clause
  const [unformattedClauses, setUnformattedClauses] = useState([]); // 0 for Pasted Data, 1 for Where Clause


  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handlePaste = (event) => {
    const pastedText = event.target.value;
    setExcelData(pastedText);
  };

  const parseExcelData = () => {
    const workbook = XLSX.read(excelData, { type: 'string' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    setParsedData(jsonData);
    setUnformattedClauses(generateClausesFromPaste(jsonData, batchSize));
    setWhereClause(generateWhereClause(unformattedClauses, notIn, attributeName));
    setCurrentTab(1);
  };

  useEffect(() => {
    if (parsedData.length !== 0) {
        setUnformattedClauses(generateClausesFromPaste(parsedData, batchSize));
        setWhereClause(generateWhereClause(unformattedClauses, notIn, attributeName));
    }
  }, [parsedData, batchSize, unformattedClauses, notIn, attributeName]);


  return (
    <Container>
      <Typography variant="h1">Where Clause Generator</Typography>
      <Box>
        <Tabs 
            mb={2} 
            value={currentTab} 
            onChange={handleTabChange}
            // TabIndicatorProps={{ style: { height: '4px' } }} // Adjust the height of the indicator
            >
            <Tab label="Pasted Data" />
            <Tab label="Where Clause" />
            
        </Tabs>
      </Box>
      {currentTab === 0 && (
        <Box>
          <TextField 
            label="Paste Excel Data Here"
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            value={excelData}
            onChange={handlePaste}
            style={{ marginTop: '10px', zIndex: 1 }} // Ensure it stays above other elements

          />
          <Button
            variant="contained"
            color="primary"
            onClick={parseExcelData}
            style={{ marginTop: '10px' }}
          >
            Parse Excel Data
          </Button>
        </Box>
      )}
      {currentTab === 1 && (
        <Box>
          <TextField
            label="Where Clause"
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            value={whereClause}
            onChange={(e) => setWhereClause(e.target.value)}
            style={{ marginTop: '10px', zIndex: 1 }} // Ensure it stays above other elements
          />
        </Box>
      )}
    </Container>
  );
}

export default WhereClauseGenerator;

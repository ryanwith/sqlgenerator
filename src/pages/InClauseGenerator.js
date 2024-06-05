import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { TextField, Button, Box, Tabs, Tab, Container, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { generateClausesFromPaste, generateInClause } from '../utils/sqlGenerator';

function InClauseGenerator() {
  const [excelData, setExcelData] = useState('');
  const [parsedData, setParsedData] = useState([]);
  const [inClause, setInClause] = useState('');
  const [columnName, setColumnName] = useState('column_name');
  const [notIn, setNotIn] = useState(false);
  const [batchSize, setBatchSize] = useState(0);
  const [currentTab, setCurrentTab] = useState(0); // 0 for Pasted Data, 1 for In Clause
  const [unformattedClauses, setUnformattedClauses] = useState([]); // 0 for Pasted Data, 1 for In Clause

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
    setInClause(generateInClause(unformattedClauses, notIn, columnName));
    setCurrentTab(1);
  };

  const handleSQLCriteriaChange = (event) => {
    const { name, value } = event.target;
    if (name === 'columnName') setColumnName(value);
    if (name === 'notIn') setNotIn(value === 'EXCLUDE' ? true : false);
    if (name === 'batchSize') setBatchSize(value);
  };

  useEffect(() => {
    if (parsedData.length !== 0) {
        setUnformattedClauses(generateClausesFromPaste(parsedData, batchSize));
        setInClause(generateInClause(unformattedClauses, notIn, columnName));
    }
  }, [parsedData, batchSize, notIn, columnName]);


  return (
    <Container>
      <Typography variant="h5">In Clause Generator</Typography>
      <Box>
        <Tabs 
            mb={2} 
            value={currentTab} 
            onChange={handleTabChange}
            >
            <Tab label="Pasted Data" />
            <Tab label="Generated In Clause" />
            
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
        </Box>
      )}
      {currentTab === 1 && (
        <Box>
          <TextField
            label="In Clause"
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            value={inClause}
            onChange={(e) => setInClause(e.target.value)}
            style={{ marginTop: '10px', zIndex: 1 }} // Ensure it stays above other elements
          />
        </Box>
      )}
      <Grid id='sql-criteria' item xs={12}>
        <Box mt={2}>
          <Grid container spacing={2}>
          <Grid item sm={4} xs={12}>
              <FormControl fullWidth>
                <TextField
                  labelId="column-name-label"
                  id="column-name-input"
                  label="Column Name"
                  name='columnName'
                  value={columnName}
                  onChange={handleSQLCriteriaChange}
                />
              </FormControl>
            </Grid>
            <Grid item sm={4} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="not-in">Include or Exclude</InputLabel>
                <Select
                  labelId="not-in"
                  id='not-in-select'
                  name='notIn'
                  value={notIn === true ? 'EXCLUDE' : 'INCLUDE'}
                  label='Include or Exclude'
                  onChange={handleSQLCriteriaChange}
                >
                  <MenuItem value='INCLUDE' selected>Include</MenuItem>
                  <MenuItem value='EXCLUDE'>Exclude</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={4} xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="batch-size"
                  label="Batch Size"
                  name='batchSize'
                  type='number'
                  value={batchSize > 0 ? batchSize : ''}
                  onChange={handleSQLCriteriaChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Button
            variant="contained"
            color="primary"
            onClick={parseExcelData}
            style={{ marginTop: '10px' }}
          >
            Parse Excel Data
        </Button>
      </Grid>
    </Container>
  );
}

export default InClauseGenerator;

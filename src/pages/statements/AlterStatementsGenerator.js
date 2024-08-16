import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { TextField, Button, Box, Tabs, Tab, Container, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import sqlGenerator from '../../utils/sqlGenerator';
const { generateInClausesFromPaste, generateAlterStatements  } = sqlGenerator;

function InClauseGenerator() {
  const [excelData, setExcelData] = useState('');
  const [parsedData, setParsedData] = useState([]);
  const [alterStatements, setAlterStatements] = useState('');
  const [alterStatementBeginning, setAlterStatementBeginning] = useState('ALTER TABLE');
  const [alterStatementEnd, setAlterStatementEnd] = useState('REPLICA IDENTITY FULL');
  const [objectBeginningDelimiter, setObjectBeginningDelimiter] = useState('"');
  const [objectEndDelimiter, setObjectEndDelimiter] = useState('"');
  const [notIn, setNotIn] = useState(false);
  const [batchSize, setBatchSize] = useState(0);
  const [currentTab, setCurrentTab] = useState(0); // 0 for Pasted Data, 1 for In Clause
  const [unformattedClauses, setUnformattedClauses] = useState([]); // 0 for Pasted Data, 1 for In Clause
  const [disableButtons, setDisableButtons] = useState(true);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handlePaste = (event) => {
    const pastedText = event.target.value;
    setExcelData(pastedText);
  };

  const parseExcelData = () => {
    // Split the pasted text by new lines and then by tabs or other delimiters
    const rows = excelData.trim().split('\n').map(row => row.split('\t'));

    // Create a worksheet from the rows
    const sheet = XLSX.utils.aoa_to_sheet(rows);
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    setParsedData(jsonData);
    setUnformattedClauses(generateInClausesFromPaste(jsonData, batchSize));
    setAlterStatements(generateAlterStatements(unformattedClauses));
    setCurrentTab(1);
  };

  useEffect(() => {
    if (parsedData.length !== 0) {
      const clauses = generateInClausesFromPaste(parsedData, batchSize);
      setUnformattedClauses(clauses);
    }
  }, [parsedData, batchSize]);

  useEffect(() => {
    if (excelData){
      setDisableButtons(false);
    } else {
      setDisableButtons(true);
    }
  }, [excelData])

  const handleSQLCriteriaChange = (event) => {
    const { name, value } = event.target;
    if (name === 'alterStatementBeginning') setAlterStatementBeginning(value);
    if (name === 'alterStatementEnd') setAlterStatementEnd(value);
    // if (name === 'notIn') setNotIn(value === 'EXCLUDE' ? true : false);
    // if (name === 'batchSize') setBatchSize(value);
  };




  return (
    <Container>
      <Typography variant="h1">Alter Statements Generator</Typography>
      <Typography variant='body1' style={{"margin-top": '4px'}}>
        Copy and paste a list of tables you want to generate alter statements for from excel.  This will generate alter statements for each table matching the format you provide below.
      </Typography>
      <Box>
        <Tabs 
            mb={2} 
            value={currentTab} 
            onChange={handleTabChange}
            >
            <Tab label="Pasted Data" />
            <Tab label="Generated Alter Statements" />
            
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
            label="Alter Statements"
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            value={alterStatements}
            onChange={(e) => setAlterStatements(e.target.value)}
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
                  labelId="alter-statement-beginning-label"
                  id="alter-statement-beginning-input"
                  label="Alter Statement Beginning"
                  name='alterStatementBeginning'
                  value={alterStatementBeginning}
                  onChange={handleSQLCriteriaChange}
                />
              </FormControl>
            </Grid>
            <Grid item sm={4} xs={12}>
              <FormControl fullWidth>
                <TextField
                  labelId="alter-statement-end-label"
                  id="alter-statement-end-input"
                  label="Alter Statement End"
                  name='alterStatementEnd'
                  value={alterStatementEnd}
                  onChange={handleSQLCriteriaChange}
                />
              </FormControl>
            </Grid>
            <Grid item sm={2} xs={12}>
              <FormControl fullWidth>
                <TextField
                  labelId="object-beginning-delimiter-label"
                  id="object-beginning-delimitert"
                  label="Object Beginning Delimiter"
                  name='objectBeginningDelimiter'
                  value={objectBeginningDelimiter}
                  onChange={handleSQLCriteriaChange}
                />
              </FormControl>
            </Grid>
            <Grid item sm={2} xs={12}>
              <FormControl fullWidth>
                <TextField
                  labelId="object-end-delimiter-label"
                  id="object-end-delimitert"
                  label="Object End Delimiter"
                  name='objectEndDelimiter'
                  value={objectEndDelimiter}
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
            disabled={disableButtons}
          >
            Generate
        </Button>
      </Grid>
    </Container>
  );
}

export default InClauseGenerator;

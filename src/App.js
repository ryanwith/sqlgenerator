import React, { useState, useEffect } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import SQLDisplay from './components/SQLDisplay';
import { generateAllStatements } from './utils/sqlGenerator';
import { Container, Typography, Grid, Box, InputLabel, Select, FormHelperText, FormControl, MenuItem, TextField} from '@mui/material';

function App() {
  const [sql, setSQL] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [tableType, setTableType] = useState('TEMP');
  const [tableName, setTableName] = useState('table_name');
  const [columnType, setColumnType] = useState('VARCHAR');
  const [batchSize, setBatchSize] = useState("");
  const [fileData, setFileData] = useState(null);

  const handleData = (data) => { setFileData(data) };

  const handleSQLCriteriaChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'tableType':
        setTableType(value);
        break;
      case 'tableName':
        setTableName(value);
        break;
      case 'columnType':
        setColumnType(value);
        break;
      case 'batchSize':
        setBatchSize(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (fileData !== null && (fileData || tableName || columnType || tableType || batchSize !== null)) {
      const allStatements = generateAllStatements(fileData, tableName, columnType, tableType, batchSize);
      const newSQL = allStatements.join("");
      setSQL(newSQL);
      setIsVisible(!!newSQL); // Show SQLDisplay if newSQL is not empty
    }
  }, [fileData, tableName, columnType, tableType, batchSize]);

return (
  <Container>
    <h1>Excel to SQL</h1>
    <Grid container >
      <Grid item md={10} sm={9}>
          Easily convert and transform your excel, CSVs, TSVs, and other data files to SQL. Allows you to easily extract, transform, and load small amounts of data between data warehouses.
      </Grid>
      <Grid item md={2} sm={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <FileUpload onData={handleData} />
      </Grid>
      <Grid item xs={12}>
        <Box mt={2}>
          {isVisible && <SQLDisplay sql={sql} onChange={handleData} />}
        </Box>
      </Grid>
      <Grid id='sql-criteria' item xs={12}>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="table-type">Table Type</InputLabel>
                <Select
                  labelId="table-type"
                  id='table-type-select'
                  name='tableType'
                  value={tableType}
                  label='Table Type'
                  onChange={handleSQLCriteriaChange}
                >
                  <MenuItem value='TEMP'>Temp Table</MenuItem>
                  <MenuItem value='PERM'>Permanent Table</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="table-name"
                  label="Table Name"
                  name='tableName'
                  value={tableName}
                  onChange={handleSQLCriteriaChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="column-type"
                  label="Column Type"
                  name='columnType'
                  value={columnType}
                  onChange={handleSQLCriteriaChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="batch-size"
                  label="Batch Size"
                  type="number"
                  name='batchSize'
                  value={batchSize}
                  onChange={handleSQLCriteriaChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>

  </Container>
);

}
export default App;



import React, { useState, useEffect } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import SQLDisplay from './components/SQLDisplay';
import { generateAllStatements } from './utils/sqlGenerator';
import { Container, Typography, Grid, Box, InputLabel, Select, FormHelperText, FormControl, MenuItem} from '@mui/material';

function App() {
  const [sql, setSQL] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [tableType, setTableType] = useState('TEMP');
  const [tableName, setTableName] = useState('table_name');
  const [columnType, setColumnType] = useState('VARCHAR');
  const [batchSize, setBatchSize] = useState(null);
  const [fileData, setFileData] = useState(null);

  const handleData = (data) => {
    setFileData(data);
  };

  useEffect(() => {
    if (fileData !== null && (fileData || tableName || columnType || tableType || batchSize !== null)) {
      const allStatements = generateAllStatements(fileData, tableName, columnType, tableType, batchSize);
      const newSQL = allStatements.join("\n\n");
      setSQL(newSQL);
      setIsVisible(!!newSQL); // Show SQLDisplay if newSQL is not empty
    }
  }, [fileData, tableName, columnType, tableType, batchSize]);

  const handleTableTypeChange = (event) => {
    setTableType(event.target.value);
    // handleData(data, tableType)
  };


return (
  <Container>
    <h1>Excel to SQL</h1>
    <Grid container spacing={2}>
      <Grid item xs={8}>
          Easily convert and transform your excel, CSVs, TSVs, and other data files to SQL. Allows you to easily extract, transform, and load small amounts of data between data warehouses.
      </Grid>
      <Grid item xs={2}>
        <FileUpload onData={handleData} />
      </Grid>
      <Grid item xs={10}>
        <Box mt={2}>
          {isVisible && <SQLDisplay sql={sql} onChange={handleData} />}
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Box mt={2}>
        <FormControl fullWidth margin="normal">
            <InputLabel id="table-type">Table Type</InputLabel>
            <Select
              labelId="table-type"
              value={tableType}
              onChange={handleTableTypeChange}
            >
              <MenuItem value='TEMP'>Temp Table</MenuItem>
              <MenuItem value='PERM'>Permanent Table</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  </Container>
);

}
export default App;

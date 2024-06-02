import React, { useState, useEffect } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import SQLDisplay from './components/SQLDisplay';
import { generateAllStatements } from './utils/sqlGenerator';
import { Container, Typography, Grid, Box, InputLabel, Select, FormControl, MenuItem, TextField, 
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';


function App() {
  const [sql, setSQL] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [tableType, setTableType] = useState('TEMP');
  const [tableName, setTableName] = useState('table_name');
  const [columnType, setColumnType] = useState('VARCHAR');
  const [batchSize, setBatchSize] = useState("");
  const [fileData, setFileData] = useState(null);
  const [fields, setFields] = useState([]);

  const handleData = (data) => { 
    setFileData(data) ;
    const fields = data[0].map((field, index) => ({
      index,
      name: field,
      type: 'VARCHAR',
      include: true
    }));
    setFields(fields);
  };

  const handleSQLCriteriaChange = (event) => {
    const { name, value } = event.target;
    if (name === 'tableType') setTableType(value);
    if (name === 'tableName') setTableName(value);
    if (name === 'columnType') setColumnType(value);
    if (name === 'batchSize') setBatchSize(value);
  };

  const handleSQLChange = (event) => {
    setSQL(event.value);
  }

  const handleFieldChange = (index, field, value) => {
    const newFields = [...fields];
    newFields[index][field] = value;
    setFields(newFields);
  };

  const handleIncludeChange = (index) => {
    const newFields = [...fields];
    newFields[index].include = !newFields[index].include;
    setFields(newFields);
  };

  useEffect(() => {
    if (fileData !== null ) {
      const allStatements = generateAllStatements(fileData, fields, tableName, columnType, tableType, batchSize);
      const newSQL = allStatements.join("");
      setSQL(newSQL);
      setIsVisible(!!newSQL); // Show SQLDisplay if newSQL is not empty
    }
  }, [fileData, tableName, columnType, tableType, batchSize, fields]);

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
          {isVisible && <SQLDisplay sql={sql} onChange={handleSQLChange}/>}
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
      <Grid item xs={12}>
          <Box mt={2}>
            {/* ADDED: Table for Column Details */}
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Column Number</TableCell>
                    <TableCell>Column Name</TableCell>
                    <TableCell>Column Type</TableCell>
                    <TableCell>Include</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.index}>
                      <TableCell>{field.index + 1}</TableCell>
                      <TableCell>
                        <TextField
                          value={field.name}
                          onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={field.type}
                          onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={field.include}
                          onChange={() => handleIncludeChange(index)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
    </Grid>

  </Container>
);

}
export default App;



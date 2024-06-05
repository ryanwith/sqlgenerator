import React, { useState, useEffect } from 'react';
import '../App.css';
import FileUpload from '../components/FileUpload';
// import SQLDownload from './components/SQLDownload';
import SQLDisplay from '../components/SQLDisplay';
import { generateCreateAndInsertStatements } from '../utils/sqlGenerator';
import { Container, Typography, Grid, Box, InputLabel, Select, FormControl, MenuItem, TextField, 
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button } from '@mui/material';
// import { downloadAsSingleFile } from './utils/sqlUnloader';


function TableGenerator() {
  const [sql, setSQL] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [tableType, setTableType] = useState('TEMP');
  const [tableName, setTableName] = useState('table_name');
  const [columnType, setColumnType] = useState('VARCHAR');
  const [batchSize, setBatchSize] = useState("");
  const [fileData, setFileData] = useState(null);
  const [fields, setFields] = useState([]);
  const [disableButtons, setDisableButtons] = useState(true);

  const handleData = (data) => { 
    setFileData(data) ;
    const fields = data[0].map((field, index) => ({
      index,
      name: field,
      type: 'VARCHAR',
      include: true
    }));
    console.log(1)
    setFields(fields);
    setDisableButtons(false);
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

  const downloadSQL = () => {
    const blob = new Blob([sql], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tableName}.sql`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  

  useEffect(() => {
    if (fileData ) {
      const allStatements = generateCreateAndInsertStatements(fileData, fields, tableName, columnType, tableType, batchSize);
      const newSQL = allStatements.join("");
      setSQL(newSQL);
      setIsVisible(!!newSQL); // Show SQLDisplay if newSQL is not empty
    }
  }, [fileData, tableName, columnType, tableType, batchSize, fields]);

return (
  <Container>
    <Typography variant="h5">Excel to SQL Converter</Typography>
    <Grid container >
      <Typography variant='body1'>
          Easily convert and transform your excel, CSVs, TSVs, and other data files to SQL. Allows you to easily extract, transform, and load small amounts of data between data warehouses.
      </Typography>
      <Box mt={2} display="flex" flexDirection="row" spacing={2} > 
        <Box mr={1}><FileUpload onData={handleData} /></Box>
        <Button variant="contained" color="primary" onClick={downloadSQL} disabled={disableButtons}>
            Download SQL
        </Button>
      </Box>
      <Grid item xs={12}>
        <Box mt={2}>
          <SQLDisplay sql={sql} onChange={handleSQLChange}/>
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
export default TableGenerator;



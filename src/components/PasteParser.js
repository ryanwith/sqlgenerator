import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { TextField, Button, Box } from '@mui/material';

function PasteParser() {
  const [excelData, setExcelData] = useState('');
  const [parsedData, setParsedData] = useState([]);

  const handlePaste = (event) => {
    const pastedText = event.target.value;
    setExcelData(pastedText);
  };



  return (
    <Box>
      <TextField
        label="Paste Excel Data Here"
        multiline
        rows={10}
        variant="outlined"
        fullWidth
        value={excelData}
        onChange={handlePaste}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={parseExcelData}
        style={{ marginTop: '10px' }}
      >
        Parse Excel Data
      </Button>
      <Box mt={2}>
        <pre>{JSON.stringify(parsedData, null, 2)}</pre>
      </Box>
    </Box>
  );
}

export default PasteParser;

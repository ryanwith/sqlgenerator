import React, { useState } from 'react';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';

function FileUpload({ onData }) {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setData(jsonData);
      onData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <input
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        style={{ display: 'none' }}
        id="file-upload"
        type="file"
        onChange={handleFileUpload}
      />
      <label htmlFor="file-upload" style={{ flex: 1 }}>
        <Button variant="contained" component="span" >
          Upload File
        </Button>
      </label>
    </div>
  );
}

export default FileUpload;
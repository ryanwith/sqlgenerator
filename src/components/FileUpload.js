import React from 'react';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';
import {formatJSON} from '../utils/jsonFormatter'

const spreadsheetToJSON = (e) => {
  const binaryStr = e.target.result;
  const workbook = XLSX.read(binaryStr, { type: 'binary' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  return jsonData;
}

const jsonToJSON = (e) => {
  const jsonStr = e.target.result;
  const jsonData = JSON.parse(jsonStr);

  return formatJSON(jsonData)
}

const acceptedFileType = (fileType) => {
  if(fileType === 'SPREADSHEET'){
    return ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
  }else if(fileType === 'JSON'){
    return "application/json"
  }
}

function FileUpload({ fileType, onData }) {

  const handleFileUpload = (event ) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = fileType === 'SPREADSHEET' ? spreadsheetToJSON(e) : jsonToJSON(e);
        onData(jsonData)
      } catch(error){
        alert('There was a problem with the file. Please check your file and try again.');
        console.error('File processing error:', error);      
      }
    };

    reader.onerror = () => {
      alert('There was a problem reading the file.');
    };
    
    if (fileType === 'SPREADSHEET') {
      reader.readAsArrayBuffer(file);
      console.log(reader)
    } else if (fileType === 'JSON') {
      reader.readAsText(file);
    }
  };

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <input
        accept={acceptedFileType(fileType)}
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

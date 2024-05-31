import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import SQLDisplay from './components/SQLDisplay';
import { generateCreateTableSQL, generateInsertStatements } from './utils/sqlGenerator';

function App() {
  const [sql, setSQL] = useState('');

  const handleData = (data) => {
    const createTableSQL = generateCreateTableSQL(data[0]);
    const insertStatements = generateInsertStatements(data);
    setSQL(`${createTableSQL}\n\n${insertStatements}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SQL Generator</h1>
        <FileUpload onData={handleData} />
        <SQLDisplay sql={sql} />
      </header>
    </div>
  );
}

export default App;
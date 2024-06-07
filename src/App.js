import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import InClauseGenerator from './pages/InClauseGenerator';
import TableGenerator from './pages/TableGenerator';
import TableGeneratorFromJSON from './pages/TableGeneratorFromJSON';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar></Navbar>

        <Routes>
          <Route path="/" element={<InClauseGenerator />} />
          <Route path="/in-clause-generator" element={<InClauseGenerator />} />
          <Route path="/sql-table-generator/excel-to-sql" element={<TableGenerator />} />
          <Route path="/sql-table-generator/json-to-sql" element={<TableGeneratorFromJSON />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

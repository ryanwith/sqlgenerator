import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import InClauseGenerator from './pages/InClauseGenerator';
import TableGenerator from './pages/TableGenerator';
import TableGeneratorFromJSON from './pages/TableGeneratorFromJSON';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar></Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/in-clause-generator" element={<InClauseGenerator />} />
          <Route path="/sql-converter/excel-to-sql" element={<TableGenerator />} />
          <Route path="/sql-converter/json-to-sql" element={<TableGeneratorFromJSON />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import InClauseGenerator from './pages/InClauseGenerator';
import TableGeneratorFromExcel from './pages/TableGeneratorFromExcel';
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
          <Route path="/sql-in-clause-generator" element={<InClauseGenerator />} />
          <Route path="/sql-converter/excel-to-sql" element={<TableGeneratorFromExcel />} />
          <Route path="/sql-converter/json-to-sql" element={<TableGeneratorFromJSON />} />
          <Route path="/in-clause-generator" element={<Navigate to="/sql-in-clause-generator" />} />
          {/* Add a catch-all redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

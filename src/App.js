import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import InClauseGenerator from './pages/InClauseGenerator';
import TableGenerator from './pages/TableGenerator';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar></Navbar>

        <Routes>
          <Route path="/" element={<InClauseGenerator />} />
          <Route path="/table-generator" element={<TableGenerator />} />
          <Route path="/in-clause-generator" element={<InClauseGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

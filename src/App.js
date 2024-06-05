import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import InClauseGenerator from './pages/InClauseGenerator';
import TableGenerator from './pages/TableGenerator';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/table-generator">Table Generator</Link></li>
            <li><Link to="/in-clause-generator">In Clause Generator</Link></li>
          </ul>
        </nav>

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

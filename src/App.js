import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WhereClauseGenerator from './pages/WhereClauseGenerator';
import TableGenerator from './pages/TableGenerator';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/table-generator">About</Link></li>
            <li><Link to="/where-clause-generator">SQL Page</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<WhereClauseGenerator />} />
          <Route path="/table-generator" element={<TableGenerator />} />
          <Route path="/where-clause-generator" element={<WhereClauseGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

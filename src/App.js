import React from 'react';
import { HashRouter as Router, Route, Routes} from 'react-router-dom';
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
          <Route path="/" exact component={<Home />} />
          <Route path="/in-clause-generator" component={<InClauseGenerator />} />
          <Route path="/sql-converter/excel-to-sql" component={<TableGenerator />} />
          <Route path="/sql-converter/json-to-sql" component={<TableGeneratorFromJSON />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import SQLDisplay from './components/SQLDisplay';
import { generateAllStatements } from './utils/sqlGenerator';
import { Container, Typography } from '@mui/material';

function App() {
  const [sql, setSQL] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleData = (data) => {
    const allStatements = generateAllStatements(data);
    const newSQL = allStatements.join("\n\n");
    setSQL(newSQL);
    setIsVisible(!!newSQL); // Show SQLDisplay if newSQL is not empty
  };

  const handleChange = (event) => {
    setSQL(event.target.value);
    setIsVisible(!!event.target.value); // Show SQLDisplay if there's content
  };

  return (
    <Container>
      <h1>Excel to SQL</h1>
      <p>
        Easily convert and transform your excel, CSVs, TSVs, and other data files to SQL. Allows you to easily extract, transform, and load small amounts of data between data warehouses.
      </p>
      <FileUpload onData={handleData} />
      {isVisible && <SQLDisplay sql={sql} onChange={handleChange} />}
    </Container>
  );
}

export default App;



// import React, { useState } from 'react';
// import './App.css';
// import FileUpload from './components/FileUpload';
// import SQLDisplay from './components/SQLDisplay';
// import { generateAllStatements } from './utils/sqlGenerator';
// import { Container, Typography } from '@mui/material';


// function App() {
//   const [sql, setSQL] = useState('');

//   const handleData = (data) => {
//     const allStatements = generateAllStatements(data);
//     setSQL(allStatements.join("\n\n"));
//   };

//   const handleChange = (event) => {
//     setSQL(event.target.value);
//   };

//   return (
//     // <div className="App">
//     //   <header className="App-header">
//     <Container>
//         <h1>Excel to SQL</h1>
//         <p>Easily convert and transform your excel, CSVs, TSVs, and other data files
//           to SQL.  Allows you to easily extract, transform, and load small amounts of 
//           data between data warehouses.
//         </p>
//         <FileUpload onData={handleData} />
//         <SQLDisplay sql={sql} onChange={handleChange} />
//      </Container>
//     // </div>
//   );
// }

// export default App;
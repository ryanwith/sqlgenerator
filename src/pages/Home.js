import React from 'react';
import { Container, Typography, List, ListItem, Link } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to SQL Generator
      </Typography>
      <Typography variant="h6" gutterBottom>
        This site currently provides threee tools to help you generate SQL queries quickly and efficiently:
      </Typography>
      <List>
        <ListItem>
          <Typography variant="body1">
            <strong><Link href='/in-clause-generator'>SQL IN Clause Generator</Link>: </strong>Converts pasted data to a SQL in-clause.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            <strong><Link href='/sql-converter/excel-to-sql'>Excel/CSV to SQL Converter</Link>: </strong> 
            Converts Excel, CSV, or spreadsheet data to SQL create table and insert statements so you can query and join it.  Upload a file or paste the data directly.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1"><strong>
          <Link href='/sql-converter/json-to-sql'>JSON to SQL</Link>: </strong>
            Converts JSON or spreadsheet data to SQL create table and insert statements so you can query and join it.  Upload a file or paste the data directly.
          </Typography>
        </ListItem>
      </List>
      <Typography variant="body1" >
        All operations are performed client-side. No data is sent to the server, ensuring your data remains private and secure.
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        This site is open source.  You can clone the <Link href="https://github.com/rywaldor/sqlgenerator" target="_blank" rel="noopener noreferrer">
          repository on GitHub
        </Link> and host it on your own servers for added security.
        Just please make sure you provide attribution if you host any substantial portion on your resources.
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        
      </Typography>
    </Container>
  );
};

export default Home;

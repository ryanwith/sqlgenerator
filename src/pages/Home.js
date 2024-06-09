import React from 'react';
import { Container, Typography, List, ListItem, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to SQL Generator
      </Typography>
      <Typography variant="h6" gutterBottom>
        This site currently provides three tools to help you generate SQL queries quickly and efficiently:
      </Typography>
      <List>
        <ListItem>
          <Typography variant="body1">
            <strong><MuiLink component={RouterLink} to='/in-clause-generator'>SQL IN Clause Generator</MuiLink>: </strong>
            Generates a SQL in-clause from pasted data.  Great when you have a CSV containing identifiers like customer or order IDs that you want to filter an existing table on.  
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            <strong><MuiLink component={RouterLink} to='/sql-converter/excel-to-sql'>Excel to SQL Converter</MuiLink>: </strong> 
            Generates a SQL CREATE TABLE and SQL INSERT INTO statements from uploaded spreadsheet files like excel, CSV, and TSV and pasted data.  Great for when you need to ingest and join data sets into a warehouse for adhoc analyses.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            <strong><MuiLink component={RouterLink} to='/sql-converter/json-to-sql'>JSON to SQL</MuiLink>: </strong> 
            Generates a SQL CREATE TABLE and SQL INSERT INTO statements from uploaded JSON files and pasted JSON.  Great for when you need to ingest and join data sets into a warehouse for adhoc analyses.
          </Typography>
        </ListItem>
      </List>
      <Typography variant="body1">
        All operations are performed client-side. No data is sent to the server, ensuring your data remains private and secure.
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        This site is open source. You can clone the <MuiLink href="https://github.com/rywaldor/sqlgenerator" target="_blank" rel="noopener noreferrer">
          repository on GitHub
        </MuiLink> and host it on your own servers for added security.
        Just please provide attribution if you do.
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
      </Typography>
    </Container>
  );
};

export default Home;

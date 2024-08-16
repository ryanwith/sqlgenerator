import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Container, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
    const [sqlTableGenerator, setSqlTableGenerator] = useState(null);
    const [sqlStatementGenerator, setSqlStatementGenerator] = useState(null);

    const handleSqlTableGeneratorClick = (event) => {
        setSqlTableGenerator(event.currentTarget);
    };
    const handleSqlTableGeneratorClose = () => {
        setSqlTableGenerator(null);
    };
    const handleSqlStatementGeneratorClick = (event) => {
        setSqlStatementGenerator(event.currentTarget);
    };
    const handleSqlStatementGeneratorClose = () => {
        setSqlStatementGenerator(null);
    };
    return (
        <Box mb={2}>
            <AppBar position="static">
                <Container>
                    <Toolbar style={{ paddingLeft: 0 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Button color="inherit" component={RouterLink} to="/">Home</Button>
                            <Button color="inherit" onClick={handleSqlTableGeneratorClick}>SQL Table Generator</Button>
                            <Menu anchorEl={sqlTableGenerator} open={Boolean(sqlTableGenerator)} onClose={handleSqlTableGeneratorClose}>
                                <MenuItem onClick={handleSqlTableGeneratorClose} component={RouterLink} to="/sql-converter/excel-to-sql">Excel to SQL</MenuItem>
                                <MenuItem onClick={handleSqlTableGeneratorClose} component={RouterLink} to="/sql-converter/csv-to-sql">CSV to SQL</MenuItem>
                                <MenuItem onClick={handleSqlTableGeneratorClose} component={RouterLink} to="/sql-converter/json-to-sql">JSON to SQL</MenuItem>
                            </Menu>
                            <Button color="inherit" onClick={handleSqlStatementGeneratorClick}>SQL Statement Generator</Button>
                            <Menu anchorEl={sqlStatementGenerator} open={Boolean(sqlStatementGenerator)} onClose={handleSqlStatementGeneratorClose}>
                                <MenuItem onClick={handleSqlStatementGeneratorClose} component={RouterLink} to="/sql-statement-generator/alter-statements">Alter Statements</MenuItem>
                            </Menu>
                            <Button color="inherit" component={RouterLink} to="/sql-in-clause-generator">In-Clause Generator</Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}

export default Navbar;
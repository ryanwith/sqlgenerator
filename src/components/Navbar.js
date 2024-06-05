import React from 'react';
import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';

function Navbar() {
  return (
    <Box mb={2}>
    <AppBar position="static">
        <Container>
            <Toolbar style={{'padding-left': 0 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Button color="inherit" href="/">Home</Button>
                    <Button color="inherit" href="/sql-table-generator">SQL Table Generator</Button>
                    <Button color="inherit" href="/in-clause-generator">In-Clause Generator</Button>
                </Box>
            </Toolbar>
            </Container>
        </AppBar>
    </Box>
  );
}

export default Navbar;
import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Container, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
        <Box mb={2}>
            <AppBar position="static">
                <Container>
                    <Toolbar style={{ paddingLeft: 0 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Button color="inherit" component={RouterLink} to="/">Home</Button>
                            <Button color="inherit" onClick={handleClick}>SQL Table Generator</Button>
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                <MenuItem onClick={handleClose} component={RouterLink} to="/sql-converter/excel-to-sql">Excel to SQL</MenuItem>
                                <MenuItem onClick={handleClose} component={RouterLink} to="/sql-converter/json-to-sql">JSON to SQL</MenuItem>
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
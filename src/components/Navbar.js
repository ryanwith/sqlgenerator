import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Container, Menu, MenuItem } from '@mui/material';

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
                <Toolbar style={{'padding-left': 0 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Button color="inherit" href="/">Home</Button>
                        <Button color="inherit" href="/in-clause-generator">In-Clause Generator</Button>
                        <Button color="inherit" onClick={handleClick}>SQL Table Generator</Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose} component="a" href="/sql-converter/excel-to-sql">Excel to SQL</MenuItem>
                            <MenuItem onClick={handleClose} component="a" href="/sql-converter/json-to-sql">JSON to SQL</MenuItem>
                        </Menu>                    </Box>
                </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}

export default Navbar;
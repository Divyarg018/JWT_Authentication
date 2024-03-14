import React, { useState } from 'react';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const [value, setValue] = useState();
    return (
        <div>
            <AppBar position='sticky'>
                <Toolbar>
                    <Typography variant='h3'>MernAuth</Typography>
                    <Box sx={{ marginLeft: "auto" }}>
                        <Tabs
                            indicatorColor='secondary'
                            onChange={(e, val) => setValue(val)}
                            value={value}
                            textColor='inherit'
                        >
                            <Tab to="/login" LinkComponent={Link} label="Login" />
                            <Tab to="/signup" LinkComponent={Link} label="Signup" />
                            {isLoggedIn && <Tab to="/" LinkComponent={Link} label="Logout" />}
                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;
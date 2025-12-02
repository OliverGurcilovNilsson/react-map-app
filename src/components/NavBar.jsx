// src/NavBar.jsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../ThemeContext'; // Import the Context

export function NavBar() {
    // These hooks now run INSIDE the Provider wrapper when rendered by App.jsx
    const colorMode = useContext(ColorModeContext);
    const theme = useTheme();

    return (
        <>
            <AppBar position="fixed" sx={{
                // Use theme colors for a proper dark/light mode switch
                backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#000000',
            }}>
                <Toolbar sx={{ pb: 0 }}>
                    {/* ... (App Title/Logo) ... */}
                    <Typography variant="h6" component="div">
                        <Button color="inherit" component={Link} to="/">
                            My App
                        </Button>
                    </Typography>

                    {/* Spacer Box */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* Toggle Button */}
                    <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>

                    {/* Navigation Links */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button color="inherit" component={Link} to="/home">Home</Button>
                        <Button color="inherit" component={Link} to="/homecomponent">Products</Button>
                        <Button color="inherit" component={Link} to="/map">Map</Button>
                        <Button color="inherit" component={Link} to="/binance">Binance</Button>
                        <Button color="inherit" component={Link} to="/grids">Grids</Button>
                        <Button color="inherit" component={Link} to="/flexgrow">Flex Grow</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            {/* Spacer Toolbar remains here to offset content below the fixed AppBar */}
            <Toolbar sx={{ mt: 1 }} />
        </>
    );
}

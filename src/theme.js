import { createTheme } from '@mui/material/styles';

// 1. Define the Light Theme
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#ffffff', // Set primary main color to white (same as your AppBar background)
            // 💥 FIX 1: Explicitly set the text color that sits ON the primary color (AppBar background)
            contrastText: '#000000',
        },
        text: {
            primary: '#000000',
            secondary: '#555555',
        },
        action: {
            active: '#000000',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
    },
});

// 2. Define the Dark Theme
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9', // Lighter blue for dark mode
        },
        secondary: {
            main: '#f48fb1',
        },
        background: {
            default: '#121212', // Dark background for the whole page
            paper: '#1d1d1d', // Slightly lighter dark for Cards, etc.
        },
    },
});

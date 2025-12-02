import React, { useState, useMemo, createContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme'; // Import your themes

// 1. Create the Context (This is what components will consume)
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

// 2. Create the Provider (This wraps your application)
export function ThemeContextProvider({ children }) {
    // Use local state to track the current mode ('light' or 'dark')
    // 💥 FIX: Use lazy initialization to guarantee state is set only once
    // and avoid potential synchronous re-render loops upon mount.
    const [mode, setMode] = useState(() => {
        return 'dark'; // Function runs once to set initial value
    });

    // Memoize the function to toggle the state
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    // Memoize the current theme object based on the state
    const theme = useMemo(
        () => (mode === 'light' ? lightTheme : darkTheme),
        [mode],
    );

    return (
        // Pass the toggle function down through the Context
        <ColorModeContext.Provider value={colorMode}>
            {/* Pass the actual MUI theme object down through the MUI ThemeProvider */}
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

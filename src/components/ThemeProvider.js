import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Button } from '@mui/material';

// Light and Dark Theme configurations
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Customize primary color for light theme
    },
    secondary: {
      main: '#f50057', // Customize secondary color for light theme
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Customize primary color for dark theme
    },
    secondary: {
      main: '#f48fb1', // Customize secondary color for dark theme
    },
  },
});

function App() {
  const [mode, setMode] = useState('light'); // Default mode is light

  // Toggle between light and dark theme
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply the theme globally */}
      <div>
        {/* Button to toggle themes */}
        <Button onClick={toggleTheme} variant="contained" color="primary">
          Toggle Theme
        </Button>

        <h1>Welcome to the {mode === 'light' ? 'Light' : 'Dark'} Mode</h1>
        {/* Your other components go here */}
      </div>
    </ThemeProvider>
  );
}

export default App;

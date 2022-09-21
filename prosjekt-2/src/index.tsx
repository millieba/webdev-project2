import * as React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Theme for the MUI-components (does ONLY work on MUI-components)
const theme = createTheme({
  palette: {
    primary: {
      // Lilac color
      main: "#8d6b94",
    },
    secondary: {
      // Some blue color
      main: '#9dbbae',
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>
);
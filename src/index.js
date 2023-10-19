import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { light } from '@mui/material/styles/createPalette';
import { green, red } from '@mui/material/colors';
import { CssBaseline } from '@mui/material';

const theme =  createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: red[900],
            background: {
                default: '#000000',
            },
        },
        neutral: {
            main: green,
        }
    },
    typography: {
        fontFamily: ['Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Helvetica', 'Arial'].join(','),
    },
    components: {
        MuiButton: {
          styleOverrides: {
            text: {
              fontWeight: 600,
              textTransform: 'inherit'
            },
            contained: {
              fontWeight: 700,
              textTransform: 'inherit',
              borderRadius: 25
            },
          }
        }
    }
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme} >
        <CssBaseline />
        <App />
    </ThemeProvider>
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

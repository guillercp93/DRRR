import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '../contexts/AuthContext';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Chat from './Chat';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FFD700' },
    background: { default: '#000000', paper: '#0f0f0f' },
    text: { primary: '#f0f0f0', secondary: '#888888' },
    divider: '#1a1a1a',
  },
  typography: {
    fontFamily: "'FiraCode', monospace",
    h5: { fontFamily: "'Staatliches', sans-serif", letterSpacing: '0.05em' },
    h6: { fontFamily: "'Staatliches', sans-serif", letterSpacing: '0.05em' },
  },
  shape: { borderRadius: 6 },
  components: {
    MuiCssBaseline: {
      styleOverrides: { body: { backgroundColor: '#000000' } },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#1a1a1a', transition: 'border-color 0.2s' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#2a2a2a' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FFD700', borderWidth: 1 },
        },
        input: { color: '#f0f0f0' },
      },
    },
    MuiInputLabel: {
      styleOverrides: { root: { color: '#888888', '&.Mui-focused': { color: '#FFD700' } } },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: "'Staatliches', sans-serif",
          letterSpacing: '0.08em',
          fontSize: '1rem',
          padding: '8px 24px',
        },
        outlined: {
          borderColor: '#FFD700',
          color: '#FFD700',
          borderWidth: 1.5,
          '&:hover': {
            borderColor: '#FFD700',
            backgroundColor: 'rgba(255, 215, 0, 0.08)',
            borderWidth: 1.5,
          },
        },
        contained: {
          backgroundColor: '#FFD700',
          color: '#000000',
          '&:hover': { backgroundColor: '#e6c200' },
          '&.Mui-disabled': { backgroundColor: '#1a1a1a', color: '#444444' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none', backgroundColor: '#0f0f0f' },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a' },
      },
    },
    MuiList: {
      styleOverrides: { root: { backgroundColor: 'transparent' } },
    },
    MuiListItem: {
      styleOverrides: { root: { '&.MuiDivider-root': { borderBottomColor: '#1a1a1a' } } },
    },
    MuiSnackbar: {
      styleOverrides: { root: { '& .MuiAlert-filled': { backgroundColor: '#1a1a1a', color: '#f0f0f0' } } },
    },
  },
});

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;

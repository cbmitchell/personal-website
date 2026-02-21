import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      contrastText: '#000000',
    },
    secondary: {
      main: '#888888',
    },
    background: {
      default: '#000000',
      paper: '#111111',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.8)',
    },
    success: {
      main: '#4ade80',
    },
    error: {
      main: '#f87171',
    },
    divider: '#444444',
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
      paddingTop: '1rem',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      paddingTop: '1rem',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      paddingTop: '1rem',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      paddingTop: '1rem',
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 600,
      paddingTop: '1rem',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      paddingTop: '1rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#000000',
        },
        // Offset anchor scroll targets by the fixed navbar height on desktop
        '@media (min-width: 900px)': {
          html: {
            scrollPaddingTop: '80px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#333333',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#111',
            '& fieldset': {
              borderColor: '#444',
            },
            '&:hover fieldset': {
              borderColor: '#666',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#888',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          '&:hover': {
            opacity: 0.9,
            backgroundColor: '#ffffff',
          },
          '&:disabled': {
            opacity: 0.5,
            backgroundColor: '#ffffff',
            color: '#000000',
          },
        },
      },
    },
  },
})


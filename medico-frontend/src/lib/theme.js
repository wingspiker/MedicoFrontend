import { createTheme } from "@mui/material/styles";
import { blue, teal, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
      light: blue[500],
      dark: blue[900],
    },
    secondary: {
      main: teal[500],
      light: teal[300],
      dark: teal[700],
    },
    background: {
      default: "#f8fafc", // Light gray background
      paper: "#ffffff",
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
      color: blue[900],
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      color: blue[800],
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      color: blue[700],
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: blue[600],
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: blue[500],
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      color: blue[400],
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
      color: grey[800],
    },
    body1: {
      fontSize: "1rem",
      color: grey[900],
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          padding: "8px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          },
        },
        containedPrimary: {
          background: `linear-gradient(45deg, ${blue[700]} 30%, ${blue[500]} 90%)`,
          "&:hover": {
            background: `linear-gradient(45deg, ${blue[800]} 30%, ${blue[600]} 90%)`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(45deg, ${teal[500]} 30%, ${teal[300]} 90%)`,
          "&:hover": {
            background: `linear-gradient(45deg, ${teal[600]} 30%, ${teal[400]} 90%)`,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: grey[300],
            },
            "&:hover fieldset": {
              borderColor: blue[300],
            },
            "&.Mui-focused fieldset": {
              borderColor: blue[500],
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: `1px solid ${grey[200]}`,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: blue[50],
          "& .MuiTableCell-head": {
            color: blue[900],
            fontWeight: 600,
          },
        },
      },
    },
  },
});

export default theme;

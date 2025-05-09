import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#d35d90", // Soft pink for primary actions
    },
    secondary: {
      main: "#f7a8b8", // Lighter pink for accents
    },
    error: {
      main: "#d32f2f", // Red for dislikes
    },
    success: {
      main: "#388e3c", // Green for likes
    },
    background: {
      default: "#fce4ec", // Soft pink background
      paper: "#ffffff",
    },
    text: {
      primary: "#333",
      secondary: "#555",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#d35d90",
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#555",
    },
    body1: {
      fontSize: "1rem",
      color: "#555",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50%",
          minWidth: 64,
          minHeight: 64,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.1)",
          },
        },
      },
    },
  },
});

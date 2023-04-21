import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    // mode: "dark",
    primary: {
      main: "#f8eb27",
      contrastText: "#fff",
    },
    secondary: {
      main: "#03a9f4",
      contrastText: "#fff",
    },
  },
  shape: {
    borderRadius: 3,
  },

  components: {
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },

    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiMenuItem: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
    },
  },
});

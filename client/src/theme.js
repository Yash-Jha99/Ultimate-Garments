export default {
  palette: {
    primary: {
      main: "#f8eb27",
      light: "#f9ef52",
      dark: "ada41b",
      contrastText: "#000",
    },
    secondary: {
      main: "#03a9f4",
      light: "#35baf6",
      dark: "#0276aa",
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
    MuiPaper: {
      defaultProps: {
        elevation: 2,
      },
    },
  },
};

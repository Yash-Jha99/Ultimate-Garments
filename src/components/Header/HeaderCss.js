import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  category: {
    textDecoration: "none",
  },

  right: {
    marginLeft: 20,
    position: "relative",
    display: "flex",
    listStyle: "none",
    alignItems: "center",
    columnGap: 16,
  },

  button: {
    padding: "10px 20px",
    background: "black",
    color: "white",
    border: "1px solid black",
    outline: "none",
    cursor: "pointer",
  },

  input: {
    padding: "10px 10px",
    width: "100%",
    border: "1px solid black",
    borderRadius: 0,
    outline: "none",
  },

  auth: {
    color: "white !important",
    background: "black",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "6px 64px",
  },
});

export default useStyles;

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
    mainContainer: {
        width: '100wh',
        height: '100vh',
        background: '#a4b0be',
        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    },
    box: {
        height: "75%",
        width: "50%",
        borderRadius: 15,
        background: "white",
        padding: 32
    },
    headingText: {
        fontSize: 20,
        fontWeight: 700,
        padding: 2,
        margin: 3,
        color: "#636e72",
    }
})

export default useStyles
import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material"

const useNotify = () => {
    const [open, setOpen] = useState(false)
    const [element, setElement] = useState(null)
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
        setElement(null)

    };
    const setNotify = (message, severity = "info") => {
        setOpen(true)
        setElement(<Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert
                severity={severity}
                sx={{ width: "100%" }}
                variant="filled"
                elevation={2}
            >
                {message}
            </Alert>
        </Snackbar>)
    }
    return [element, setNotify]

}

export default useNotify
import { Box, Typography } from "@mui/material";
import React from "react";
import NotFoundImage from "../../assets/not-found.png";
import Image from "next/image";

const NotFound = ({ message }) => {
    return (
        <Box
            height="calc(100vh - 108px)"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Image
                src={NotFoundImage}
                style={{ objectFit: "contain" }}
                width={200}
                height={200}
                alt="not found"
                priority
            ></Image>
            <Typography mt={2} variant="h4">
                {message}
            </Typography>
        </Box>
    );
};

export default NotFound;
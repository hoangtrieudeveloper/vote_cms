import React, {Component, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

function Loading({...props}) {
    return <Box className="col-xl-12">
        {props?.load && <Backdrop
            sx={{ color: '#fff',zIndex:999999 }}
            open={props?.load}
        >
            <CircularProgress color="inherit" />
        </Backdrop>}
    </Box>;
}

export default Loading;

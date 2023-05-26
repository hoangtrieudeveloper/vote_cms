import React, {Component, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
} from "@mui/material";

function Notification({...props}) {
    return <Box className="col-xl-12">
        {props.data ?
            <Box className={"text-center alert " + props.data.success}>
                <Typography variant={"span"}>{props.data.messager || props.data.message}</Typography>
                <button type="button" className="close" data-bs-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </Box> : ''}
    </Box>;
}

export default Notification;

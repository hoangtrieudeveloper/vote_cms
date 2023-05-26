import React, {Component, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
} from "@mui/material";

function NotificationTextField({...props}) {
    return <Box className="col-xl-12">
        {props.data ?
            <Typography color='red' variant='caption' sx={{
                fontSize: 12,
                lineHeight: 2.0,
            }}>{props.data}</Typography>
            : ''}
    </Box>;
}

export default NotificationTextField;

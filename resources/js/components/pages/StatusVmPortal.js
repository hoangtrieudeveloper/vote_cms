import React, {Component, useEffect, useState} from 'react';
import {
    Typography,
} from "@mui/material";

export default function StatusVmPortal({...props}) {
    const checkStatus = (item) =>{
        if(item == "INITIALIZING" || item == "NOT_FOUND") return 'badge badge-warning';
        if(item == "POWERED_ON") return 'badge badge-success';
        if(item != "POWERD_ON" || item != "INITIALIZING" || item != "NOT_FOUND") return 'badge badge-danger';
    }
    return <label
        className={'mb-0 '+checkStatus(props?.status)}>
        <Typography variant="inherit"
                    color="white">
            {props.status}
        </Typography>
    </label>;
}


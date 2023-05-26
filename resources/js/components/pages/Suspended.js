import React, {Component, useEffect, useState} from 'react';
import {
    Typography,
} from "@mui/material";

export default function Suspended({...props}) {
    const checkMessage = (item) =>{
        if(item == 0) return 'Hoạt động';
        if(item == 1) return 'Không hoạt động';
    }
    const checkStatus = (item) =>{
        if(item == 0) return 'badge badge-success';
        if(item == 1) return 'badge badge-danger';
    }
    return <label
        className={'mb-0 '+checkStatus(props?.status)}>
        <Typography variant="inherit"
                    color="white">
            {checkMessage(props.status)}
        </Typography>
    </label>;
}


import React, {Component, useEffect, useState} from 'react';
import {
    Typography,
} from "@mui/material";

export default function Status({...props}) {
    const checkMessage = (item) =>{
        if(item == 0) return 'Không hoạt động';
        if(item == 1) return 'Hoạt động';
    }
    const checkStatus = (item) =>{
        if(item == 0) return 'alert alert-danger';
        if(item == 1) return 'alert alert-success';
    }
    return <label
        className={'mb-0 '+checkStatus(props?.status)}>
        <Typography variant="inherit">
            {checkMessage(props.status)}
        </Typography>
    </label>;
}


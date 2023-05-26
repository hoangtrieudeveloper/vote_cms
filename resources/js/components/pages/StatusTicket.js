import React, {Component, useEffect, useState} from 'react';
import {
    Typography,
} from "@mui/material";

export default function StatusTicket({...props}) {
    const checkMessage = (item) =>{
        if(item == 1) return 'Chờ phản hồi';
        if(item == 2) return 'Đã phản hồi';
    }
    const checkStatus = (item) =>{
        if(item == 1) return 'badge badge-primary';
        if(item == 2) return 'badge badge-success';
    }
    return <label
        className={'mb-0 '+checkStatus(props?.status)}>
        <Typography variant="inherit"
                    color="white">
            {checkMessage(props.status)}
        </Typography>
    </label>;
}


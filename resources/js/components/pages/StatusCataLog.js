import React, {Component, useEffect, useState} from 'react';
import {
    Typography,
} from "@mui/material";

export default function StatusCatalog({...props}) {
    const checkMessage = (item) =>{
        if(item == 0) return 'Trang chủ';
        if(item == 1) return 'SideBar';
    }
    const checkStatus = (item) =>{
        if(item == 0) return 'badge badge-success';
        if(item == 1) return 'badge badge-primary';
    }
    return <label
        className={'mb-0 '+checkStatus(props?.status)}>
        <Typography variant="inherit"
                    color="white">
            {checkMessage(props.status)}
        </Typography>
    </label>;
}


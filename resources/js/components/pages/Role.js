import React, {Component, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

function Role({...props}) {
    const [role, setRole] = useState(props.role);
    const checkMessage = (item) =>{
        if(item == 'read') return 'Chỉ có quyền xem tất cả các file';
        if(item == 'write') return 'chỉ tạo ra bucket, tạo object trong bucket (Không có quyền xem object)';
        if(item == 'readwrite') return 'tạo và xem được bucket và object trong bucket (Không có phần quyền cho bucket)';
        if(item == 'full') return 'tạo và xem được bucket và object trong bucket, phần quyền cho bucket';
    }
    return <label
        className={'mb-0 badge badge-success'}>
        <Typography variant="inherit"
                    color="white">
            {role} - {checkMessage(role)}
        </Typography>
    </label>;
}

export default Role;

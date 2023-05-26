import React, {Component, useEffect, useState} from 'react';
import {
    Typography,
} from "@mui/material";

export default function StatusVm({...props}) {
    const checkMessage = (item) => {
        if (item == 0) return 'Đang khởi tạo';
        if (item == -1) return 'Chờ xóa';
        if (item == -2) return 'Đã xóa';
    }
    const checkStatus = (item) => {
        if (item == 0) return 'badge badge-danger';
        if (item == -1) return 'badge badge-warning';
        if (item == -2) return 'badge badge-danger';
    }
    return <label
        className={'mb-0 ' + checkStatus(props?.status)}>
        <Typography variant="inherit"
                    color="white">
            {checkMessage(props.status)}
        </Typography>
    </label>;
}


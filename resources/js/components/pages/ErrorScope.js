import React, {Component, useEffect, useState} from 'react';
import {
    Box,
    Typography,
} from "@mui/material";
import {Link} from "react-router-dom";

function ErrorScope() {
    return <Box className="ad-auth-wrapper">
        <Box className="ad-auth-box">
            <Box className="row align-items-center">
                <Box className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <Box className="ad-auth-img">
                        <img src="template/assets/images/imagelogo.png" alt=""/>
                    </Box>
                </Box>
                <Box className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <Box className="ad-auth-content">
                            <Typography className="ad-register-text" variant='caption' sx={{
                                fontSize: 16,
                                lineHeight: 2.0,
                            }}>Bạn không có quyền truy cập vào đường dẫn này!<Link
                                to='/'>
                                Nhấn vào đây để quay lại!
                            </Link></Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>;
}

export default ErrorScope;

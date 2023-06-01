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

                <Box className="auth-page-content">
                    <Box className="container">
                        <Box className="row justify-content-center">
                            <Box className="col-md-8 col-lg-6 col-xl-5">
                                <Box className="card mt-4 card-bg-fill">
                                    <Box className="card-body p-4 text-center">
                                        <Box className="avatar-lg mx-auto mt-2">
                                            <Box
                                                className="avatar-title bg-light text-primary display-3 rounded-circle">
                                                <i className="ri-checkbox-circle-fill"></i>
                                            </Box>
                                        </Box>
                                        <Box className="mt-4 pt-2">
                                            <h4>Error!</h4>
                                            <p className="text-muted mx-4">Đã có lỗi xảy ra !</p>
                                            <Box className="mt-4">
                                                <a href="/login" className="btn btn-primary w-100">Quay lại</a>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>;
}

export default ErrorScope;

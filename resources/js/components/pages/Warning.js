import React, {Component, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

function Warning({...props}) {
    return <Box className="col-xl-12">
        <Box className="card">
            <Box className="card-content">
                <Box className="p-2">
                    <Typography variant='span' sx={{
                        fontSize: 14,
                    }}>Tài khoản của quý khách đã hết hạn dùng thử. Vui lòng nâng cấp tài khoản để
                        tiếp
                        tục
                        sử dụng dịch vụ.</Typography>
                    <LoadingButton
                        variant="outlined"
                        sx={{
                            backgroundColor: '#11a1fd',
                            color: 'white',
                            py: 0.5,
                            my: 0.5,
                            fontSize: 14,
                            fontWeight: 400,
                            ml: 1.5
                        }}
                    >
                        Nâng cấp tài khoản
                    </LoadingButton>
                </Box>
            </Box>
        </Box>
    </Box>;
}

export default Warning;

import React, {useEffect, useState} from "react";
import {Box, Typography, TextField} from "@mui/material";

export default function Footer() {
    return (
        <footer className="footer">
            <Box className="container">
                <Box className="row">
                    <Box className="col-lg-12">
                        <Box className="text-center">
                            <p className="mb-0">&copy;
                                Copyright© 2023 VOTE . All rights reserved. <i className="mdi mdi-heart text-danger"></i> by BONBON
                            </p>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </footer>
    )
}

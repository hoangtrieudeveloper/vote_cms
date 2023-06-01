import React, {Component, useEffect, useState} from 'react';
import {
    Box, Modal, Typography,
} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import {VoteResultService} from "../../../model/VoteResultService";
import Footer from "../../pages/Footer";

function Index() {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getListReportDocx = (page) => {
        setLoading(true);
        VoteResultService.getListReportDocx(page)
            .then(
                data => {
                    setLoading(false);
                    if (data.status == 1) {
                        setDataList(data?.data);
                    }
                }
            );
    }
    //useEffect
    useEffect(() => {
        getListReportDocx();
    }, []);
    return (
        <Box className="main-content">

            <Box className="page-content">
                <Box className="container-fluid">
                    <Box className="row">
                        <Box className="col-12">
                            <Box className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Xuất Biên bản - Nghị quyết ĐH</h4>

                            </Box>
                        </Box>
                    </Box>
                    <Box className="row">
                        <Box className="col-xl-12">
                            <Box className="row">
                                <Box className="col-lg-12">
                                    <Box>
                                        <Box className="timeline">
                                            <Box className="timeline-item left">
                                                <i className="icon ri-stack-line"></i>
                                                <Box className="date">15 Dec 2021</Box>
                                                <Box className="content">
                                                    <Box className="d-flex">
                                                        <Box className="flex-shrink-0">
                                                            <h6>Xuất Biên Bản Đại Hội</h6>
                                                        </Box>
                                                        <Box className="flex-grow-1 ms-3">
                                                            <p className="text-muted mb-2">
                                                                Tải về
                                                            </p>
                                                            <Box className="row g-2">
                                                                <Box className="col-sm-12">
                                                                    <Box
                                                                        className="d-flex border border-dashed p-2 rounded position-relative">
                                                                        <Box className="flex-shrink-0 avatar-xs">
                                                                            <Box
                                                                                className="avatar-title bg-soft-info text-info fs-15 rounded">
                                                                                <i className="ri-file-zip-line"></i>
                                                                            </Box>
                                                                        </Box>
                                                                        <Box
                                                                            className="flex-grow-1 ms-2 overflow-hidden">
                                                                            <h6 className="mb-0 text-truncate"><a
                                                                                href={dataList.file_content_vn}
                                                                                className="stretched-link" download>{dataList.file_content_vn}</a></h6>
                                                                            <small>1.7 MB</small>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box className="timeline-item right">
                                                <i className="icon ri-vip-diamond-line"></i>
                                                <Box className="date">22 Oct 2021</Box>
                                                <Box className="content">
                                                    <h6>Xuất Nghị Quyết Đại Hội</h6>
                                                    <p className="text-muted">Tải về</p>
                                                    <Box className="row g-2">
                                                        <Box className="col-sm-9">
                                                            <Box
                                                                className="d-flex border border-dashed p-2 rounded position-relative">
                                                                <Box className="flex-shrink-0 avatar-xs">
                                                                    <Box
                                                                        className="avatar-title bg-soft-info text-info fs-15 rounded">
                                                                        <i className="ri-file-zip-line"></i>
                                                                    </Box>
                                                                </Box>
                                                                <Box className="flex-grow-1 ms-2 overflow-hidden">
                                                                    <h6 className="mb-0 text-truncate"><a
                                                                        href={dataList.file_content_en}
                                                                        className="stretched-link" download>{dataList.file_content_en}</a></h6>
                                                                    <small>1.4 MB</small>
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


                        </Box>
                    </Box>
                </Box>
            </Box>

            <Footer></Footer>
        </Box>

    )
}

export default Index;

import React, {Component, useEffect, useState} from 'react';
import {
    Box,Typography
} from "@mui/material";
import Footer from "../pages/Footer";

function Home() {
    return (
        <Box className="main-content">
            <Box className="page-content">
                <Box className="container-fluid">
                    <Box className="row">
                        <Box className="col-12">
                            <Box className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Xin chào</h4>
                                <Box className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#">Trang chủ</a>
                                        </li>
                                        <li className="breadcrumb-item active">hướng dẫn</li>
                                    </ol>
                                </Box>

                            </Box>
                        </Box>
                    </Box>
                    <Box className="row">
                        <Box className="col">
                            <Box className="h-100">
                                <Box className="row mb-3 pb-1">
                                    <Box className="col-12">
                                        <Box className="d-flex align-items-lg-center flex-lg-row flex-column">
                                            <Box className="flex-grow-1">
                                                <h4 className="fs-16 mb-1">Trang chủ</h4>
                                                <p className="text-muted mb-0">Đại hội Cổ đông 2023</p>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="row">
                        <Box className="col-xl-12">
                            <Box className="card">
                                <Box className="card-header align-items-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">BÁO CÁO KIỂM TRA TƯ CÁCH CỔ ĐÔNG</h4>
                                    <Box className="flex-shrink-0">
                                        <Box className="dropdown card-header-dropdown">
                                            <a className="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown"
                                               aria-haspopup="true" aria-expanded="false">
                                                <span className="text-muted">02 Nov 2021 to 31 Dec 2021<i
                                                    className="mdi mdi-chevron-down ms-1"></i></span>
                                            </a>
                                            <Box className="dropdown-menu dropdown-menu-end">
                                                <a className="dropdown-item" href="#">Today</a>
                                                <a className="dropdown-item" href="#">Last Week</a>
                                                <a className="dropdown-item" href="#">Last Month</a>
                                                <a className="dropdown-item" href="#">Current Year</a>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="card-body">
                                    <Box className="table-responsive table-card">
                                        <table
                                            className="table table-borderless table-hover table-nowrap align-middle mb-0">
                                            <thead className="table-light">
                                            <tr className="text-muted">
                                                <th scope="col">STT</th>
                                                <th scope="col">Nội dung</th>
                                                <th scope="col">Số lượng (Cổ đông)</th>
                                                <th scope="col">Số CP đại diện sở hữu(Cổ phần)</th>
                                                <th scope="col">Tỉ lệ%/tổng CP của công ty</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Cổ đông được mời họp</td>
                                                <td><span className="badge badge-soft-success p-2">1.901</span></td>
                                                <td>
                                                    <span className="badge badge-soft-success p-2">67.894.960</span>
                                                </td>
                                                <td>
                                                    <Box className="text-nowrap">100%</Box>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Cổ đông/đại diện ủy quyền tham dự</td>
                                                <td><span className="badge badge-soft-success p-2">4</span></td>
                                                <td>
                                                    <span className="badge badge-soft-success p-2">12.087.270</span>
                                                </td>
                                                <td>
                                                    <Box className="text-nowrap">17,8%</Box>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Cổ đông vắng mặt</td>
                                                <td><span className="badge badge-soft-success p-2">1.897	</span></td>
                                                <td>
                                                    <span className="badge badge-soft-success p-2">55.807.690</span>
                                                </td>
                                                <td>
                                                    <Box className="text-nowrap">82,2%</Box>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="col-xl-12">
                            <Box className="card">
                                <Box className="card-header align-items-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">Ý KIẾN CỔ ĐÔNG</h4>
                                    <Box className="flex-shrink-0">
                                        <Box className="dropdown card-header-dropdown">
                                            <a className="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown"
                                               aria-haspopup="true" aria-expanded="false">
                                                <span className="text-muted">02 Nov 2021 to 31 Dec 2021<i
                                                    className="mdi mdi-chevron-down ms-1"></i></span>
                                            </a>
                                            <Box className="dropdown-menu dropdown-menu-end">
                                                <a className="dropdown-item" href="#">Today</a>
                                                <a className="dropdown-item" href="#">Last Week</a>
                                                <a className="dropdown-item" href="#">Last Month</a>
                                                <a className="dropdown-item" href="#">Current Year</a>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="card-body">
                                    <Box className="table-responsive table-card">
                                        <table
                                            className="table table-borderless table-hover table-nowrap align-middle mb-0">
                                            <thead className="table-light">
                                            <tr className="text-muted">
                                                <th scope="col">STT</th>
                                                <th scope="col">Tên Cổ đông</th>
                                                <th scope="col">CMND/CCCD</th>
                                                <th scope="col">Nội dung ý kiến</th>
                                                <th scope="col">Thời gian</th>
                                                <th scope="col">Số cổ phần</th>
                                                <th scope="col">Chức năng</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td colSpan="9" className="text-center"><Typography
                                                    variant="subtitle1">Không
                                                    có dữ liệu!</Typography>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
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

export default Home;

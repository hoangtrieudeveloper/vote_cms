import React, {Component, useEffect, useState} from 'react';
import {
    Box, Select, TextField, Typography, MenuItem
} from "@mui/material";
import Footer from "../pages/Footer";
import {userShareholderService} from "../../model/userShareholderService";
import Pagination from "../pages/Pagination";
import ToastNotifi from "../pages/ToastNotifi";
import Loading from "../pages/Loading";
import helpers from "../pages/Helpers";

function ExportShareHolder() {
    //paginate
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageLast, setPageLast] = useState(1);
    const [linkPage, setLinkPage] = useState([]);
    //props
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [total1, setTotal1] = useState([]);
    const [total2, setTotal2] = useState([]);
    const [total3, setTotal3] = useState([]);
    const [total4, setTotal4] = useState([]);

    useEffect(() => {
        statisticalShareHolder();
        getListData(pageCurrent);
    }, [])

    const resetData = () => {
        setData([]);
        setLinkPage([]);
        setPageLast(1);
        setPageCurrent(1);
    }

    const statisticalShareHolder = () => {
        userShareholderService.statistical()
            .then(data => {
                setLoading(false);
                if (data.status == 1) {
                    setTotal1(data?.data?.total1);
                    setTotal2(data?.data?.total2);
                    setTotal3(data?.data?.total3);
                    setTotal4(data?.data?.total4);
                    // Helpers.showToast('success', data?.mess);
                } else {
                    resetData();
                    // Helpers.showToast('error', data?.mess);

                }
            });
    }

    const getListData = (page = 1) => {
        console.log(pageCurrent < pageLast);
        setPageCurrent(page);
        setLoading(true);
        userShareholderService.getListExport(page)
            .then(data => {
                setLoading(false);
                if (data.status == 1) {
                    setData(data?.data?.data);
                    setLinkPage(data?.data?.links);
                    setPageLast(parseInt(data?.data?.last_page));
                    // Helpers.showToast('success', data?.mess);
                } else {
                    resetData();
                    // Helpers.showToast('error', data?.mess);

                }
            });
    }

    return (
        <Box className="main-content">
            <ToastNotifi></ToastNotifi>
            <Loading load={loading}></Loading>
            <Box className="page-content">
                <Box className="container-fluid">
                    <Box className="row">
                        <Box className="col-12">
                            <Box className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Biên bản kiểm tra tư cách Cổ đông</h4>
                                <Box className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#">Biên bản kiểm tra tư cách Cổ đông</a>
                                        </li>
                                        <li className="breadcrumb-item active">Xuất biên bản kiểm tra tư cách</li>
                                    </ol>
                                </Box>

                            </Box>
                        </Box>
                    </Box>
                    <Box className="row">
                        <Box className="col-xl-12">
                            <Box className="card">
                                <Box className="card-header align-items-center d-flex">
                                    <h3 className="card-title mb-0 flex-grow-1">Thống kê</h3>
                                </Box>
                                <Box className="card-body">
                                    <Box className="row">

                                        <Box className="col-xxl-3 col-lg-6">
                                            <Box className="card card-height-100">
                                                <Box className="card-header align-items-center d-flex background-label">
                                                    <h4 className="card-title mb-0 flex-grow-1 h4-color">Tổng số CĐ:</h4>
                                                    <Box className="flex-shrink-0">
                                                        <Box className="dropdown card-header-dropdown">
                                                            <a className="text-reset dropdown-btn" href="#"
                                                               data-bs-toggle="dropdown" aria-haspopup="true"
                                                               aria-expanded="false">
                                                            <span
                                                                className="fw-semibold text-uppercase fs-12 ">{helpers.formatNumber(total1.totalCD1)}</span>
                                                            </a>

                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box className="card-body p-0">
                                                    <Box>
                                                        <Box className="p-3">

                                                            <Box className="d-flex align-items-center">

                                                                <Box className="flex-grow-1 ms-3">
                                                                    <h6 className="fs-14 mb-1">Tổng số CP:</h6>
                                                                </Box>
                                                                <Box className="flex-shrink-0 text-end">
                                                                    <h6 className="mb-1 ">{helpers.formatNumber(total1.totalCP1)}</h6>
                                                                </Box>
                                                            </Box>

                                                            <Box className="d-flex align-items-center mt-3">

                                                                <Box className="flex-grow-1 ms-3">
                                                                    <h6 className="fs-14 mb-1">Tỷ lệ:</h6>
                                                                </Box>
                                                                <Box className="flex-shrink-0 text-end">
                                                                    <h6 className="mb-1 ">{total1.ratio1}%</h6>
                                                                </Box>
                                                            </Box>


                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box className="col-xxl-3 col-lg-6">
                                            <Box className="card card-height-100">
                                                <Box className="card-header align-items-center d-flex background-label">
                                                    <h4 className="card-title mb-0 flex-grow-1 h4-color">CĐ tham dự online:</h4>
                                                    <Box className="flex-shrink-0">
                                                        <Box className="dropdown card-header-dropdown">
                                                            <a className="text-reset dropdown-btn" href="#"
                                                               data-bs-toggle="dropdown" aria-haspopup="true"
                                                               aria-expanded="false">
                                                            <span
                                                                className="fw-semibold text-uppercase fs-12 ">{helpers.formatNumber(total2.totalCD2)}</span>
                                                            </a>

                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box className="card-body p-0">
                                                    <Box>
                                                        <Box className="p-3">

                                                            <Box className="d-flex align-items-center">

                                                                <Box className="flex-grow-1 ms-3">
                                                                    <h6 className="fs-14 mb-1">Số lượng CP:</h6>
                                                                </Box>
                                                                <Box className="flex-shrink-0 text-end">
                                                                    <h6 className="mb-1 ">{helpers.formatNumber(total2.totalCP2)}</h6>
                                                                </Box>
                                                            </Box>

                                                            <Box className="d-flex align-items-center mt-3">

                                                                <Box className="flex-grow-1 ms-3">
                                                                    <h6 className="fs-14 mb-1">Tỷ lệ:</h6>
                                                                </Box>
                                                                <Box className="flex-shrink-0 text-end">
                                                                    <h6 className="mb-1 ">{total2.ratio2}%</h6>
                                                                </Box>
                                                            </Box>


                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box className="col-xxl-3 col-lg-6">
                                            <Box className="card card-height-100">
                                                <Box className="card-header align-items-center d-flex background-label">
                                                    <h4 className="card-title mb-0 flex-grow-1 h4-color">CĐ tham dự trực tiếp:</h4>
                                                    <Box className="flex-shrink-0">
                                                        <Box className="dropdown card-header-dropdown">
                                                            <a className="text-reset dropdown-btn" href="#"
                                                               data-bs-toggle="dropdown" aria-haspopup="true"
                                                               aria-expanded="false">
                                                            <span
                                                                className="fw-semibold text-uppercase fs-12">{helpers.formatNumber(total3.totalCD3)}</span>
                                                            </a>

                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box className="card-body p-0">
                                                    <Box>
                                                        <Box className="p-3">

                                                            <Box className="d-flex align-items-center">

                                                                <Box className="flex-grow-1 ms-3">
                                                                    <h6 className="fs-14 mb-1">Tổng số CP:</h6>
                                                                </Box>
                                                                <Box className="flex-shrink-0 text-end">
                                                                    <h6 className="mb-1">{helpers.formatNumber(total3.totalCD3)}</h6>
                                                                </Box>
                                                            </Box>

                                                            <Box className="d-flex align-items-center mt-3">

                                                                <Box className="flex-grow-1 ms-3">
                                                                    <h6 className="fs-14 mb-1">Tỷ lệ:</h6>
                                                                </Box>
                                                                <Box className="flex-shrink-0 text-end">
                                                                    <h6 className="mb-1 ">{total3.ratio3}%</h6>
                                                                </Box>
                                                            </Box>


                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box className="col-xxl-3 col-lg-6">
                                            <Box className="card card-height-100">
                                                <Box className="card-header align-items-center d-flex background-label">
                                                    <h4 className="card-title mb-0 flex-grow-1 h4-color">CĐ ủy quyền:</h4>
                                                    <Box className="flex-shrink-0">
                                                        <Box className="dropdown card-header-dropdown">
                                                            <a className="text-reset dropdown-btn" href="#"
                                                               data-bs-toggle="dropdown" aria-haspopup="true"
                                                               aria-expanded="false">
                                                            <span
                                                                className="fw-semibold text-uppercase fs-12">{helpers.formatNumber(total4.totalCD4)}</span>
                                                            </a>

                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box className="card-body p-0">
                                                    <Box>
                                                        <Box className="p-3">

                                                            <Box className="d-flex align-items-center">

                                                                <Box className="flex-grow-1 ms-3">
                                                                    <h6 className="fs-14 mb-1">Tổng số CP:</h6>
                                                                </Box>
                                                                <Box className="flex-shrink-0 text-end">
                                                                    <h6 className="mb-1 ">{helpers.formatNumber(total4.totalCP4)}</h6>
                                                                </Box>
                                                            </Box>

                                                            <Box className="d-flex align-items-center mt-3">

                                                                <Box className="flex-grow-1 ms-3">
                                                                    <h6 className="fs-14 mb-1">Tỷ lệ:</h6>
                                                                </Box>
                                                                <Box className="flex-shrink-0 text-end">
                                                                    <h6 className="mb-1">{total4.ratio4}%</h6>
                                                                </Box>
                                                            </Box>


                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>

                                    </Box>
                                    <Box className="row justify-content-sm-end">
                                        <Box className="col-sm-auto">
                                            <button type="button"
                                                    className="btn btn-outline-success waves-effect waves-ligh">
                                                <i className="bx bxs-file-export"></i>
                                                Xuất biển bản kiểm tra tư cách
                                            </button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="row">
                        <Box className="col-xl-12">
                            <Box className="card">
                                <Box className="card-body">
                                    <Box className="table-responsive table-card mb-3">
                                        <table
                                            className="table table-borderless table-hover table-nowrap align-middle mb-0">
                                            <thead className="table-light">
                                            <tr className="text-muted">
                                                <th scope="col">#</th>
                                                <th scope="col">Biên bản kiểm tra tư cách</th>
                                                <th scope="col">Danh sách Cổ đông</th>
                                                <th scope="col">Thời gian tạo</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {data.length > 0 ? data?.map((i, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        uploads/BienBanKiemTraCoDongTemplate_19_10_31__06_06_2023.docx
                                                        <i className="bx bx-download"></i>
                                                    </td>
                                                    <td>
                                                        uploads/DanhSachCheckin_19_10_31__06_06_2023.docx
                                                        <i className="bx bx-download"></i>
                                                    </td>
                                                    <td>
                                                        19:10 06/06/2023
                                                    </td>

                                                </tr>
                                            )) : <tr>
                                                <td colSpan="9" className="text-center"><Typography
                                                    variant="subtitle1">Không
                                                    có dữ liệu!</Typography>
                                                </td>
                                            </tr>}
                                            </tbody>
                                        </table>
                                    </Box>
                                    <Pagination linkPage={linkPage} pageCurrent={pageCurrent} pageLast={pageLast}
                                                getListData={getListData}/>
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

export default ExportShareHolder;

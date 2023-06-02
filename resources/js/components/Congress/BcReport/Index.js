import React, {Component, useEffect, useState} from 'react';
import {
    Box, Modal, TextField, Typography,
} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import {congressService} from "../../../model/congressService";
import Paginate from "../../pages/Paginate";
import Helpers from "../../pages/Helpers";
import Footer from "../../pages/Footer";
import LoadingButton from "@mui/lab/LoadingButton";

function Index() {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [linkPage, setLinkPage] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageLast, setPageLast] = useState(1);
    const deleteReport = (id) => {
        setLoading(true);

        congressService.deletedBcReport(id)
            .then(
                data => {
                    setLoading(false);
                    if (data.status == 1) {
                        getListDocument();
                        Helpers.showToast('success', data?.mess);
                    } else Helpers.showToast('error', data?.mess);
                }
            );
    }
    const getListDocument = (page) => {
        setPageCurrent(page);
        setLoading(true);
        congressService.getListBcReport(page)
            .then(
                data => {
                    setLoading(false);
                    if (data.status == 1) {
                        setDataList(data?.data?.data);
                        setLinkPage(data?.data?.links);
                        setPageLast(parseInt(data?.data?.last_page));
                    }
                }
            );
    }
    //useEffect
    useEffect(() => {
        getListDocument(pageCurrent);
    }, []);
    return (
        <Box className="main-content">

            <Box className="page-content">
                <Box className="container-fluid">
                    <Box className="row">
                        <Box className="col-12">
                            <Box className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">KHAI BÁO BÁO CÁO - TỜ TRÌNH</h4>
                                <Box className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#">KHAI BÁO BÁO CÁO - TỜ TRÌNH</a>
                                        </li>
                                        <li className="breadcrumb-item active">Danh sách</li>
                                    </ol>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="row">
                        <Box className="col-xl-12">
                            <Box className="card">
                                <Box className="card-header align-items-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">Danh sách</h4>
                                    <Link to="/tao-moi-bc-to-trinh"
                                          className="btn btn-info squer-btn mt-2 mr-2 sm-btn"><i
                                        className={"fas fa-plus"}></i> Tạo mới
                                    </Link>
                                </Box>
                                <Box className="card-body">
                                    <Box className="live-preview">
                                        <Box className="table-responsive table-card">
                                            <table
                                                className="table align-middle mb-0">
                                                <thead className="table-light">
                                                <tr>
                                                    <th scope="col">
                                                        STT
                                                    </th>
                                                    <th scope="col">Tên nội dung</th>
                                                    <th scope="col">Tên nội dung (Tiếng Anh)</th>
                                                    <th scope="col">Thứ tự</th>
                                                    <th scope="col">Xử lý</th>
                                                    <th scope="col"></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {dataList.length > 0 ? dataList.map((i, index) => (
                                                    <tr key={index}>
                                                        <td className="text-center">
                                                            {index + 1}
                                                        </td>
                                                        <td>
                                                            {i.name_vn}
                                                        </td>
                                                        <td>
                                                            {i.name_en}
                                                        </td>
                                                        <td>
                                                            {i.sort}
                                                        </td>
                                                        <td>
                                                            <Link to={"/cap-nhat-bc-to-trinh?id=" + i.id}
                                                                  className="link-primary text-reset text-decoration-underline " data-bs-toggle="modal" data-bs-target=".bs-example-modal-xl"><small>Chặn CĐ biểu quyết</small>
                                                            </Link>

                                                            <Box className="modal fade bs-example-modal-xl"
                                                                 tabIndex="-1" role="dialog"
                                                                 aria-labelledby="myExtraLargeModalLabel"
                                                                 aria-hidden="true">
                                                                <Box className="modal-dialog modal-xl">
                                                                    <Box className="modal-content">
                                                                        <Box className="modal-header">
                                                                            <h5 className="modal-title"
                                                                                id="myExtraLargeModalLabel">CHẶN CỔ ĐÔNG BIỂU QUYẾT</h5>
                                                                            <button type="button" className="btn-close"
                                                                                    data-bs-dismiss="modal"
                                                                                    aria-label="Close"></button>
                                                                        </Box>
                                                                        <Box className="modal-body">
                                                                            <h6 className="fs-15">Tờ trình: Báo cáo hoạt động của HĐQT năm 2022 và kế hoạch năm 2023
                                                                                </h6>
                                                                            <h6>Thiết lập danh sách Cổ đông bị chặn biểu quyết</h6>

                                                                            <Box className="d-flex mt-2">
                                                                                <Box className="card-body">
                                                                                    <Box>
                                                                                        <Box className="row">
                                                                                            <Box className="col-xl-4">
                                                                                                <Box className="mb-3">
                                                                                                    <label htmlFor="cleave-date" className="form-label">Tên nội
                                                                                                        dung <Typography variant="span"
                                                                                                                         color="red">*</Typography></label>
                                                                                                    <TextField
                                                                                                        className="form-control"
                                                                                                        fullWidth
                                                                                                        name="name_vn"
                                                                                                        type='text'
                                                                                                        required
                                                                                                        onChange={e => onInputChange(e)}
                                                                                                        sx={{
                                                                                                            'input': {
                                                                                                                '&::placeholder': {
                                                                                                                    fontSize: 16,
                                                                                                                }
                                                                                                            },
                                                                                                        }}
                                                                                                        label="Tên nội dung"
                                                                                                        variant="outlined"
                                                                                                        value=''
                                                                                                    />
                                                                                                </Box>
                                                                                            </Box>
                                                                                            <Box className="col-xl-4">
                                                                                                <Box className="mb-3">
                                                                                                    <label htmlFor="cleave-date-format" className="form-label">Tên nội
                                                                                                        dung(Tiếng Anh)<Typography variant="span"
                                                                                                                                   color="red">*</Typography></label>
                                                                                                    <TextField
                                                                                                        className="form-control"
                                                                                                        fullWidth
                                                                                                        name="name_en"
                                                                                                        type='text'
                                                                                                        required
                                                                                                        onChange={e => onInputChange(e)}
                                                                                                        sx={{
                                                                                                            'input': {
                                                                                                                '&::placeholder': {
                                                                                                                    fontSize: 16,
                                                                                                                }
                                                                                                            },
                                                                                                        }}
                                                                                                        label="Nhập nội dung (Tiếng Anh)"
                                                                                                        variant="outlined"
                                                                                                        value=''
                                                                                                    />
                                                                                                </Box>
                                                                                            </Box>
                                                                                            <Box className="col-xl-4 text-center">
                                                                                                <LoadingButton
                                                                                                    className="ad-btn ad-login-member bg-success mt-3"
                                                                                                    variant="outlined"
                                                                                                    startIcon={<i className="mdi mdi-plus"></i>}
                                                                                                    loading={loading}
                                                                                                    disabled={loading}
                                                                                                    sx={{
                                                                                                        color: 'white',
                                                                                                        fontSize: 13,
                                                                                                        fontWeight: 200,
                                                                                                        width:'100%'
                                                                                                    }}
                                                                                                >
                                                                                                    {!loading ? 'Tìm Kiếm' : ''}
                                                                                                </LoadingButton>
                                                                                            </Box>
                                                                                        </Box>
                                                                                    </Box>
                                                                                </Box>
                                                                            </Box>
                                                                            <h6 className="fs-16 my-3"></h6>
                                                                            <Box className="d-flex mt-2">
                                                                                <Box className="row">
                                                                                    <Box className="col-xl-12">
                                                                                        <Box className="card">
                                                                                            <Box className="card-header align-items-center d-flex">
                                                                                                <h4 className="card-title mb-0 flex-grow-1">Danh sách cổ đông</h4>
                                                                                            </Box>
                                                                                            <Box className="card-body">
                                                                                                <Box className="live-preview">
                                                                                                    <Box className="table-responsive table-card">
                                                                                                        <table
                                                                                                            className="table align-middle mb-0">
                                                                                                            <thead className="table-light">
                                                                                                            <tr>
                                                                                                                <th scope="col">
                                                                                                                    STT
                                                                                                                </th>
                                                                                                                <th scope="col">Tên nội dung</th>
                                                                                                                <th scope="col">Tên nội dung (Tiếng Anh)</th>
                                                                                                                <th scope="col">Thứ tự</th>
                                                                                                                <th scope="col"></th>
                                                                                                            </tr>
                                                                                                            </thead>
                                                                                                            <tbody>
                                                                                                            {dataList.length > 0 ? dataList.map((i, index) => (
                                                                                                                <tr key={index}>
                                                                                                                    <td className="text-center">
                                                                                                                        {index + 1}
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {i.name_vn}
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {i.name_en}
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {i.sort}
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        <Box className="hstack gap-3 fs-15">
                                                                                                                            <Link to={"/cap-nhat-bc-to-trinh?id=" + i.id}
                                                                                                                                  className="link-primary"><i
                                                                                                                                className="ri-settings-4-line"></i></Link>
                                                                                                                            <Link to="/khai-bao-bc-to-trinh"
                                                                                                                                  onClick={() => {
                                                                                                                                      deleteReport(i.id)
                                                                                                                                  }}
                                                                                                                                  data-bs-toggle="modal"
                                                                                                                                  data-bs-target="#myModal"><i
                                                                                                                                className="ri-delete-bin-5-line"></i></Link>
                                                                                                                        </Box>
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
                                                                                                </Box>
                                                                                            </Box>
                                                                                        </Box>
                                                                                        <Paginate linkPage={linkPage} pageCurrent={pageCurrent} pageLast={pageLast}
                                                                                                  pageCurentRollBack={e => getListDocument(e)}></Paginate>
                                                                                    </Box>
                                                                                </Box>
                                                                            </Box>
                                                                        </Box>
                                                                        <Box className="modal-footer">
                                                                            <a href="javascript:void(0);"
                                                                               className="btn btn-link link-success fw-medium"
                                                                               data-bs-dismiss="modal"><i
                                                                                className="ri-close-line me-1 align-middle"></i> Close</a>
                                                                            <button type="button"
                                                                                    className="btn btn-primary ">Save
                                                                                changes
                                                                            </button>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </td>
                                                        <td>
                                                            <Box className="hstack gap-3 fs-15">
                                                                <Link to={"/cap-nhat-bc-to-trinh?id=" + i.id}
                                                                      className="link-primary"><i
                                                                    className="ri-settings-4-line"></i></Link>
                                                                <Link to="/khai-bao-bc-to-trinh"
                                                                      onClick={() => {
                                                                          deleteReport(i.id)
                                                                      }}
                                                                      data-bs-toggle="modal"
                                                                      data-bs-target="#myModal"><i
                                                                    className="ri-delete-bin-5-line"></i></Link>
                                                            </Box>
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
                                    </Box>
                                </Box>
                            </Box>
                            <Paginate linkPage={linkPage} pageCurrent={pageCurrent} pageLast={pageLast}
                                      pageCurentRollBack={e => getListDocument(e)}></Paginate>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Footer></Footer>
        </Box>

    )
}

export default Index;

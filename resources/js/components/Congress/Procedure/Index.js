import React, {Component, useEffect, useState} from 'react';
import {
    Box, Modal, Typography,
} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import {procedureService} from "../../../model/procedureService";
import Paginate from "../../pages/Paginate";
import Helpers from "../../pages/Helpers";
import Footer from "../../pages/Footer";

function Index() {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [linkPage, setLinkPage] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageLast, setPageLast] = useState(1);
    const deleteProcedure = (id) => {
        setLoading(true);

        procedureService.deleted(id)
            .then(
                data => {
                    setLoading(false);
                    if (data.status == 1) {
                        getListProcedure();
                        Helpers.showToast('success', data?.mess);
                    } else Helpers.showToast('error', data?.mess);
                }
            );
    }
    const getListProcedure = (page) => {
        setPageCurrent(page);
        setLoading(true);
        procedureService.getList(page)
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
        getListProcedure(pageCurrent);
    }, []);
    return (
        <Box className="main-content">

            <Box className="page-content">
                <Box className="container-fluid">
                    <Box className="row">
                        <Box className="col-12">
                            <Box className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">KHAI BÁO BIÊN BẢN - NGHỊ QUYẾT ĐẠI HỘI</h4>
                                <Box className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#">KHAI BÁO BIÊN BẢN - NGHỊ QUYẾT ĐẠI HỘI</a>
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
                                    <Link to="/tao-moi-thu-tuc-be-mac"
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
                                                                          deleteProcedure(i.id)
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
                                      pageCurentRollBack={e => getListProcedure(e)}></Paginate>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Footer></Footer>
        </Box>

    )
}

export default Index;

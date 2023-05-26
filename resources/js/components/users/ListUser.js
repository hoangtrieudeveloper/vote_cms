import React, {Component, useEffect, useState} from 'react';
import {
    Box, Typography,
} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import Status from "../pages/Status";
import {userService} from "../../model/userService";
import Loading from "../pages/Loading";
import ToastNotifi from "../pages/ToastNotifi";
import {toast} from "react-toastify";
import Paginate from "../pages/Paginate";
import Helpers from "../pages/Helpers";
import Footer from "../pages/Footer";

function ListUser() {
    const [loading, setLoading] = useState(false);
    const [linkPage, setLinkPage] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageLast, setPageLast] = useState(1);
    const [dataList, setDataList] = useState([]);
    const [listGroup, setListGroup] = useState([]);
    const deleteCt = (id) => {
        setLoading(true);
        userService.deleteUser(id)
            .then(
                data => {
                    setLoading(false);
                    if (data.status == 1) {
                        getListUser();
                        Helpers.showToast('success', data?.messager);
                    } else Helpers.showToast('error', data?.messager);
                }
            );
    }
    const getListUser = (page) => {
        setLoading(true);
        userService.getListUser(page)
            .then(
                data => {
                    setLoading(false);
                    if (data.status == 1) {
                        setDataList(data?.data?.data);
                        setListGroup(data.group_name);
                        setLinkPage(data?.data?.links);
                        setPageLast(parseInt(data?.data?.last_page));
                    }
                }
            );
    }
    const trangThai = (st) => {
        return st;
    }
    //useEffect
    useEffect(() => {
        getListUser(pageCurrent);
    }, []);
    return (
        <Box className="main-content">
            <Box className="page-content">
                <Box className="container-fluid">
                    <Box className="row">
                        <Box className="col-12">
                            <Box className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Danh sách nhân viên</h4>
                                <Box className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#">Nhân viên</a>
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
                                    <Link to="/createuser"
                                          className="btn btn-info squer-btn mt-2 mr-2 sm-btn"><i
                                        className={"fas fa-plus"}></i> Tạo mới
                                    </Link>
                                </Box>
                                <Box className="card-body">
                                    <Box className="live-preview">
                                        <Box className="table-responsive table-card">
                                            <table
                                                className="table align-middle table-nowrap table-striped-columns mb-0">
                                                <thead className="table-light">
                                                <tr>
                                                    <th scope="col">
                                                        STT
                                                    </th>
                                                    <th scope="col">Họ tên</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Điện thoại</th>
                                                    <th scope="col">Nhóm quyền</th>
                                                    <th scope="col">Ngày tạo</th>
                                                    <th scope="col">Trạng thái</th>
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
                                                            {i.name}
                                                        </td>
                                                        <td>
                                                            <Typography variant="inherit">
                                                                {i.email}
                                                            </Typography>
                                                        </td>
                                                        <td>
                                                            <Typography variant="subtitle1">
                                                                {i.phone_number}
                                                            </Typography>
                                                        </td>
                                                        <td>
                                                            {listGroup[i.group_scope]}
                                                        </td>
                                                        <td>
                                                            <Typography variant="subtitle1">
                                                                {i.created_at}
                                                            </Typography>
                                                        </td>
                                                        <td>
                                                            <Status status={trangThai(i.status)}></Status>
                                                        </td>
                                                        <td>
                                                            <Box className="hstack gap-3 fs-15">
                                                                <a href="/updateuser"
                                                                   className="link-primary"><i
                                                                    className="ri-settings-4-line"></i></a>
                                                                <a href="/listuser" className="link-danger"
                                                                   onClick={() => {
                                                                       deleteCt(i.id)
                                                                   }}><i
                                                                    className="ri-delete-bin-5-line"></i></a>
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
                                      pageCurentRollBack={e => getListUser(e)}></Paginate>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Footer></Footer>
        </Box>
    )
}

export default ListUser;

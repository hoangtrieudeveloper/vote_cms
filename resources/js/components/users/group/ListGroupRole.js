import React, {Component, useEffect, useState} from 'react';
import {
    Box, Typography,
} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import Notification from "../../pages/Notification";
import {userService} from "../../../model/userService";
import Loading from "../../pages/Loading";
import Status from "../../pages/Status";
import Paginate from "../../pages/Paginate";
import Footer from "../../pages/Footer";

function ListGroupRole() {
    let history = useHistory();
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const deleteCt = (id) => {
        setLoading(true);
        userService.deleteGroupUser(id)
            .then(
                data => {
                    setLoading(false);
                    if (data.status == 1) {
                        getListGroup();
                        setErrors(data);
                    } else {
                        setErrors(data);
                    }
                    setTimeout(() => {
                        setErrors('');
                    }, 5000)
                }
            );
    }
    const getListGroup = () => {
        setLoading(true);
        userService.getListGroupUser()
            .then(
                data => {
                    setLoading(false);
                    if (data.status == 1) {
                        setDataList(data.data);
                    }
                }
            );
    }
    //useEffect
    useEffect(() => {
        getListGroup();
    }, []);
    return (<Box className="main-content">
        <Box className="page-content">
            <Box className="container-fluid">
                <Box className="row">
                    <Box className="col-12">
                        <Box className="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 className="mb-sm-0">Danh sách nhóm quyền</h4>
                            <Box className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><a href="#">Nhóm quyền</a>
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
                                <Link to="/create-group-role"
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
                                                <th>
                                                    STT
                                                </th>
                                                <th>Tên nhóm</th>
                                                <th>Hành động</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {dataList.length > 0 ? dataList.map((i, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        {i.group_name}
                                                    </td>
                                                    <td>
                                                        <Box className="hstack gap-3 fs-15">
                                                            <Link to={"/update-group-role?id=" + i.id}
                                                                  className="link-primary"><i
                                                                className="ri-settings-4-line"></i></Link>
                                                            <Link to="/list-group-role" className="link-danger"
                                                                  onClick={() => {
                                                                      deleteCt(i.id)
                                                                  }}><i
                                                                className="ri-delete-bin-5-line"></i></Link>
                                                        </Box>
                                                    </td>
                                                </tr>
                                            )) : <tr>
                                                <td colSpan="8" className="text-center"><Typography variant="subtitle1">Không
                                                    có dữ liệu!</Typography>
                                                </td>
                                            </tr>}
                                            </tbody>
                                        </table>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        <Footer></Footer>
    </Box>)
}

export default ListGroupRole;

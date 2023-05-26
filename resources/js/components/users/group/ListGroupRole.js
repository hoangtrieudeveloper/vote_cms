import React, {Component, useEffect, useState} from 'react';
import {
    Box, Typography,
} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import Notification from "../../pages/Notification";
import {userService} from "../../../model/userService";
import Loading from "../../pages/Loading";

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
    return (<Box className="page-wrapper">
        <Box className="main-content">
            <Box className="row">
                <Box className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <Box className="card chart-card">
                        <Notification data={errors}></Notification>
                        <Loading load={loading}></Loading>
                        <Box className="card-header p-3">
                            <Typography variant="h5">Danh sách nhóm quyền</Typography>
                            <Link to="/create-group-role"
                                  className="btn btn-info squer-btn mt-2 mr-2 sm-btn"><i className={"fas fa-plus"}></i> Tạo mới
                            </Link>
                        </Box>
                        <Box className="card-body pb-4">
                            <Box className="chart-holder">
                                <Box className="table-responsive pt-1" sx={{overflowX: 'initial'}}>
                                    <table className="table table-styled mb-0">
                                        <thead>
                                        <tr>
                                            <th className="text-center">
                                                STT
                                            </th>
                                            <th>Tên nhóm</th>
                                            <th>Hành động</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {dataList.length > 0 ? dataList.map((i, index) => (
                                            <tr key={index}>
                                                <td className="text-center">
                                                    {index+1}
                                                </td>
                                                <td>
                                                    <label
                                                        className="mb-0 badge badge-primary">
                                                        <Typography variant="inherit"
                                                                    color="white">
                                                            {i.group_name}
                                                        </Typography>
                                                    </label>
                                                </td>
                                                <td className="relative">
                                                    <Typography variant={"body1"} className="action-btn "
                                                       href="/#">
                                                        <svg className="default-size "
                                                             viewBox="0 0 341.333 341.333 ">
                                                            <g>
                                                                <g>
                                                                    <g>
                                                                        <path
                                                                            d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z "></path>
                                                                        <path
                                                                            d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z "></path>
                                                                        <path
                                                                            d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z "></path>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </Typography>
                                                    <Box className="action-option">
                                                        <ul>
                                                            <li>
                                                                <Link to={"/update-group-role?id="+i.id}><i
                                                                    className="far fa-edit mr-2 "></i>Chi tiết</Link>
                                                            </li>
                                                            <li>
                                                                <Link onClick={() => {
                                                                    deleteCt(i.id)
                                                                }} to={"#/"}><i
                                                                    className="far fa-trash-alt mr-2 "></i>Xóa</Link>
                                                            </li>
                                                        </ul>
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
    </Box>)
}

export default ListGroupRole;

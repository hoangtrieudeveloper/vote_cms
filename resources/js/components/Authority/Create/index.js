import React, {Component, useEffect, useState} from 'react';
import {
    Box, Select, TextField, Typography, MenuItem
} from "@mui/material";
import Footer from "../../pages/Footer";
import {AuthorityService} from "../../../model/AuthorityService";
import Pagination from "../../pages/Pagination";
import ToastNotifi from "../../pages/ToastNotifi";
import Loading from "../../pages/Loading";
import helpers from "../../pages/Helpers";
import {Link} from "react-router-dom";
import {congressService} from "../../../model/congressService";

function CreateAuthority() {
    //paginate
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageLast, setPageLast] = useState(1);
    const [linkPage, setLinkPage] = useState([]);
    //props
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    const [authority, setAuthority] = useState({});
    const onInputChange = e => {
        setAuthority({...authority, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        getListData(pageCurrent);
    }, [])

    const resetData = () => {
        setData([]);
        setLinkPage([]);
        setPageLast(1);
        setPageCurrent(1);
    }

    const getListData = (page = 1) => {
        console.log(pageCurrent < pageLast);
        setPageCurrent(page);
        setLoading(true);
        AuthorityService.getAllUserShareHolder(page, nameSearch)
            .then(data => {
                setLoading(false);
                if (data.status == 1) {
                    setData(data?.data?.data);
                    setLinkPage(data?.data?.links);
                    setPageLast(parseInt(data?.data?.last_page));
                    // helpers.showToast('success', data?.mess);
                } else {
                    resetData();
                    // helpers.showToast('error', data?.mess);

                }
            });
    }

    const getListById = (id) => {
        setLoading(true);
        AuthorityService.getListById(id)
            .then(data => {
                console.log('data', data);
                setLoading(false);
                if (data.status == 1) {
                    setAuthority(data?.data);
                } else Helpers.showToast('error', data?.mess);
            });
    }

    async function createAuthority() {
        if (authority.name === '') {
            Helpers.showToast('error', 'Vui lòng nhập tên cổ đông!');
        } else if (authority.cccd === '') {
            Helpers.showToast('error', 'Vui lòng nhập căn cước công dân!');
        } else if (authority.password === '') {
            Helpers.showToast('error', 'Vui lòng nhập mật khẩu!');
        } else {
            setLoading(true);
            AuthorityService.register(authority)
                .then(
                    data => {
                        setLoading(false);
                        if (data?.status == 1) {
                            Helpers.showToast('success', data?.mess);
                            getListData(pageCurrent);
                        } else {
                            Helpers.showToast('error', data?.mess);
                        }
                    }
                );
        }
    }

    async function editAuthority() {
        if (authority.name === '') {
            Helpers.showToast('error', 'Vui lòng nhập tên cổ đông!');
        } else if (authority.cccd === '') {
            Helpers.showToast('error', 'Vui lòng nhập căn cước công dân!');
        } else if (authority.password === '') {
            Helpers.showToast('error', 'Vui lòng nhập mật khẩu!');
        } else {
            setLoading(true);
            AuthorityService.edit(authority)
                .then(
                    data => {
                        setLoading(false);
                        if (data?.status == 1) {
                            Helpers.showToast('success', data?.mess);
                            getListData(pageCurrent);
                        } else {
                            Helpers.showToast('error', data?.mess);
                        }
                    }
                );
        }
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
                                <h4 className="mb-sm-0">Xử lý ủy quyền</h4>
                                <Box className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#">Xử lý ủy quyền</a>
                                        </li>
                                    </ol>
                                </Box>

                            </Box>
                        </Box>
                    </Box>

                    <Box className="row">
                        <Box className="col-lg-12">
                            <Box>
                                    <Box className="tab-pane active" id="overview-tab" role="tabpanel">
                                        <Box className="row">
                                            <Box className="col-xl-12">
                                                <Box className="card">
                                                    <Box className="card-header align-items-center d-flex">
                                                        <h3 className="card-title mb-0 flex-grow-1">Tìm kiếm</h3>
                                                    </Box>
                                                    <Box className="card-body">
                                                        <Box className="row">
                                                            <Box className="col-4">
                                                                <input type="text" className="form-control"
                                                                       placeholder={'Họ tên/CMND/CCCD...'}
                                                                       value={nameSearch}
                                                                       onChange={(e) => setNameSearch(e.target.value)}/>
                                                            </Box>

                                                            <Box className="col-2">
                                                                <button type="button"
                                                                        onClick={() => getListData()}
                                                                        className="btn btn-primary waves-effect waves-ligh">
                                                                    Tìm kiếm
                                                                </button>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>

                                            <Box className="col-xl-12">
                                                <Box className="card">
                                                    <Box className="card-body">
                                                        <Box className="table-responsive table-card mb-3">
                                                            <table
                                                                className="table table-borderless table-hover table-nowrap align-middle mb-0">
                                                                <thead className="table-light">
                                                                <tr className="text-muted">
                                                                    <th scope="col">Mã CĐ</th>
                                                                    <th scope="col">Họ và tên</th>
                                                                    <th scope="col">CMND/CCCD</th>
                                                                    <th scope="col">Ngày cấp</th>
                                                                    <th scope="col">Số điện thoại</th>
                                                                    <th scope="col">Cổ phần sở hữu(1)</th>
                                                                    <th scope="col">Cổ phần ủy quyền (2)</th>
                                                                    <th scope="col">Cổ phần nhận ủy quyền (3)</th>
                                                                    <th scope="col">Tổng (4) = (1) + (3) - (2)</th>
                                                                    <th scope="col">Xử lý</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {data.length > 0 ? data?.map((i, index) => (
                                                                    <tr key={index}>
                                                                        <td className="text-center">
                                                                            {index + 1}
                                                                        </td>
                                                                        <td>
                                                                            {i.name}
                                                                        </td>
                                                                        <td>
                                                                            {i.cccd}
                                                                        </td>
                                                                        <td>
                                                                            {i.date_range}
                                                                        </td>
                                                                        <td>
                                                                            {i.phone_number}
                                                                        </td>
                                                                        <td>
                                                                            <span
                                                                                className="badge badge-soft-success p-2">{helpers.formatNumber(i.total)}</span>

                                                                        </td>
                                                                        <td>
                                                                            <span
                                                                                className="badge badge-soft-warning p-2">
                                                                            {helpers.formatNumber(i.setAuthority)}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                             <span
                                                                                 className="badge badge-soft-secondary p-2">
                                                                            {helpers.formatNumber(i.getAuthority)}
                                                                             </span>
                                                                        </td>
                                                                        <td>
                                                                            <span
                                                                                className="badge text-bg-success">
                                                                            {helpers.formatNumber(i.totalALL)}
                                                                            </span>
                                                                        </td>

                                                                        <td>
                                                                            <button type="button"
                                                                                    className="btn btn-soft-success waves-effect waves-light">Ủy quyền
                                                                            </button>

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
                                                        <Pagination linkPage={linkPage} pageCurrent={pageCurrent}
                                                                    pageLast={pageLast}
                                                                    getListData={getListData}/>
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

export default CreateAuthority;

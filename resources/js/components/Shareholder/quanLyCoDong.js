import React, {Component, useEffect, useState} from 'react';
import {
    Box, Select, TextField, Typography, MenuItem
} from "@mui/material";
import Footer from "../pages/Footer";
import {userShareholderService} from "../../model/userShareholderService";
import Pagination from "../pages/Pagination";
import ToastNotifi from "../pages/ToastNotifi";
import Loading from "../pages/Loading";
import Helpers from "../pages/Helpers";
import Modals from "./components/Modals";

function QuanLyCoDong() {
    //paginate
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageLast, setPageLast] = useState(1);
    const [linkPage, setLinkPage] = useState([]);
    //props
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [dataVotes, setDataVotes] = useState([]);
    const [userShare, setUserShare] = useState({});
    const [nameSearch, setNameSearch] = useState('');
    const [voteStatus, setVoteStatus] = useState('');
    const [jointType, setJointType] = useState('');
    const [authority, setAuthority] = useState('');
    //select option
    const [listJointTypes, setListJointTypes] = useState([]);
    const [listAuthority, setListAuthority] = useState([]);
    const [listVoteStatus, setListVoteStatus] = useState([]);

    const resetData = () => {
        setData([]);
        setLinkPage([]);
        setPageLast(1);
        setPageCurrent(1);
    }

    const downloadFileCD = () => {
        setLoading(true);
        userShareholderService.exportCoDong().then((res) => {
                setLoading(false);
            }
        ).catch((error) => {
            setLoading(false);
        })
    }

    const getListSelect = () => {
        userShareholderService.getListAuthority()
            .then(data => {
                if (data.status == 1) {
                    setListAuthority(Object.values(data?.data));
                }
            });
        userShareholderService.getListJointTypes()
            .then(data => {
                if (data.status == 1) {
                    setListJointTypes(Object.values(data?.data));
                }
            });
        userShareholderService.getListVoteStatus()
            .then(data => {
                if (data.status == 1) {
                    setListVoteStatus(Object.values(data?.data));
                }
            });
    }

    const getListData = (page = 1) => {
        console.log(pageCurrent < pageLast);
        setPageCurrent(page);
        setLoading(true);
        userShareholderService.getQuanLyCD(page, nameSearch, voteStatus, jointType, authority).then(data => {
            setLoading(false);
            if (data.status == 1) {
                if (data?.data) {
                    setData(data?.data?.data);
                    setLinkPage(data?.data?.links);
                    setPageLast(parseInt(data?.data?.last_page));
                }
                Helpers.showToast('success', data?.mess);
            } else {
                resetData();
                Helpers.showToast('error', data?.mess);
            }
        }).catch((error) => {
            setLoading(false);
        });
    }

    const getCongressContent = (id, userShare) => {
        setLoading(true);
        userShareholderService.getCongressContent(id).then(data => {
            console.log(data);
            setLoading(false);
            if (data.status == 1) {
                Helpers.showToast('success', data?.mess);
                setDataVotes(data?.data);
                setUserShare(userShare);
            } else {
                setDataVotes([]);
                setUserShare({});
                Helpers.showToast('error', data?.mess);
            }
        }).catch((error) => {
            setDataVotes([]);
            setUserShare({});
            setLoading(false);
        });
    }

    useEffect(() => {
        getListData(pageCurrent);
        getListSelect();
    }, []);

    return (
        <Box className="main-content">
            <ToastNotifi></ToastNotifi>
            <Loading load={loading}></Loading>
            <Box className="page-content">
                <Box className="container-fluid">
                    <Box className="row">
                        <Box className="col-12">
                            <Box className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Quản lý Cổ đông</h4>
                                <Box className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item active"><a href="#">Quản lý Cổ đông</a></li>
                                    </ol>
                                </Box>

                            </Box>
                        </Box>
                    </Box>

                    <Box className="row">
                        <Box className="col-xl-12">
                            <Box className="card">
                                <Box className="card-header align-items-center text-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">Danh sách cổ đông</h4>
                                </Box>
                                <Box className="card-body">
                                    <Box className="row mb-4">
                                        <Box className="col-4">
                                            <input type="text" className="form-control"
                                                   placeholder={'Họ tên/CMND/CCCD...'}
                                                   value={nameSearch}
                                                   onChange={(e) => setNameSearch(e.target.value)}/>
                                        </Box>
                                        <Box className="col-4">
                                            <select className="form-select"
                                                    aria-label="Default select example" onChange={(e) => {
                                                console.log(e.target.value);
                                                setVoteStatus(e.target.value);
                                            }}>
                                                <option value={''} selected>--- Trạng thái biểu quyết ---</option>
                                                {listVoteStatus?.map((item, index) => (
                                                    <option key={index} value={item.value}
                                                            selected={item.value == voteStatus}>
                                                        {item.label}
                                                    </option>))}
                                            </select>
                                        </Box>
                                        <Box className="col-4">
                                            <select className="form-select"
                                                    aria-label="Default select example" onChange={(e) => {
                                                console.log(e.target.value);
                                                setJointType(e.target.value);
                                            }}>
                                                <option value={''} selected>--- Hình thức tham gia ---</option>
                                                {listJointTypes?.map((item, index) => (
                                                    <option key={index} value={item.value}
                                                            selected={item.value == jointType}>
                                                        {item.label}
                                                    </option>))}
                                            </select>
                                        </Box>
                                    </Box>
                                    <Box className="row mb-4">
                                        <Box className="col-4">
                                            <select className="form-select"
                                                    aria-label="Default select example" onChange={(e) => {
                                                console.log(e.target.value);
                                                setAuthority(e.target.value);
                                            }}>
                                                <option value={''} selected>--- Hình thức Cổ đông ---</option>
                                                {listAuthority?.map((item, index) => (
                                                    <option key={index} value={item.value}
                                                            selected={item.value == authority}>
                                                        {item.label}
                                                    </option>))}
                                            </select>
                                        </Box>
                                        <Box className="col-4">
                                            <Box className="d-grid gap-1">
                                                <button type="button"
                                                        onClick={() => getListData()}
                                                        className="btn btn-primary waves-effect waves-ligh ">
                                                    Tìm kiếm
                                                </button>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="row justify-content-sm-end">
                                        <Box className="col-sm-auto">
                                            <button type="button"
                                                    onClick={downloadFileCD}
                                                    className="btn btn-outline-primary waves-effect waves-ligh">
                                                <i className="mdi mdi-plus"></i>
                                                Xuất file excel
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
                                                <th scope="col">Mã CĐ</th>
                                                <th scope="col">Họ tên Cổ đông</th>
                                                <th scope="col">CMND/CCCD</th>
                                                <th scope="col">CP sở hữu</th>
                                                <th scope="col">CP tham dự</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Loại hình tham dự</th>
                                                <th scope="col">Loại hình CĐ</th>
                                                <th scope="col">Trạng thái biểu quyết</th>
                                                <th scope="col">Hành động</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {data.length > 0 ? data?.map((i, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        {i.id}
                                                    </td>
                                                    <td>
                                                        {i.name}
                                                    </td>
                                                    <td>
                                                        {i.code_dksh}
                                                    </td>
                                                    <td>
                                                        {i.total}
                                                    </td>
                                                    <td>
                                                        0
                                                    </td>
                                                    <td>
                                                        {i.email}
                                                    </td>
                                                    <td>
                                                        {i.checkIn ? 'Trực tiếp' : 'Chưa checkin'}
                                                    </td>
                                                    <td>
                                                        {i.is_auth ? 'Ủy quyển' : 'Cổ đông'}
                                                    </td>
                                                    <td>
                                                        {i.voteStatus ? 'Đã biểu quyết' : 'Chưa biểu quyết'}
                                                    </td>
                                                    <td>
                                                        {i.voteStatus ? (<button type="button" className="btn btn-primary"
                                                                                 onClick={() => getCongressContent(i.id, i)}
                                                                                 data-bs-toggle="modal"
                                                                                 data-bs-target="#voteDataModals">Kết quả biểu quyết
                                                        </button>) : ''}

                                                    </td>
                                                </tr>
                                            )) : <tr>
                                                <td colSpan="11" className="text-center"><Typography
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
            <Modals listVotes={dataVotes} user={userShare}/>
            <Footer></Footer>
        </Box>
    )
}

export default QuanLyCoDong;

import React, {Component, useEffect, useState} from 'react';
import {
    Box, TextField, Typography,
} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import {botService} from "../../model/botService";
import Status from "../pages/Status";
import Loading from "../pages/Loading";
import ToastNotifi from "../pages/ToastNotifi";
import Paginate from "../pages/Paginate";
import {userService} from "../../model/userService";
import Helpers from "../pages/Helpers";

function Index() {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ho_ten, setHo_ten] = useState('');
    const [email, setEmail] = useState('');
    const [linkPage, setLinkPage] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageLast, setPageLast] = useState(1);
    const deleteCt = (id) => {
        setLoading(true);
        botService.deleted(id)
            .then(
                data => {
                    setLoading(false);
                    if (data.status == 1) {
                        getListBot();
                        Helpers.showToast('success', data?.messager);
                    } else Helpers.showToast('error', data?.messager);
                }
            );
    }
    const getListBot = (page) => {
        setPageCurrent(page);
        setLoading(true);
        botService.getList({
            name: ho_ten,
        }, page).then(
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
    const onEnterKey = (e) => {
        if (e.key === "Enter") {
            getListBot(pageCurrent);
        }
    }
    //useEffect
    useEffect(() => {
        getListBot(pageCurrent);
    }, []);
    return (<Box className="page-wrapper">
        <Box className="main-content">
            <Box className="row">
                <Box className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <Box className="card chart-card">
                        <ToastNotifi></ToastNotifi>
                        <Loading load={loading}></Loading>
                        <Box className="card-header p-3">
                            <Typography variant="h5">Danh sách Bot</Typography>
                            <Link to="/created-bot"
                                  className="btn btn-info squer-btn mt-2 mr-2"><i className={"fas fa-plus"}></i> Tạo mới
                            </Link>
                            <Box className="row pt-3">
                                <Box className="col-md-3">
                                    <Box className="ad-auth-feilds">
                                        <TextField
                                            fullWidth
                                            name="keyword"
                                            type='text'
                                            onChange={e => {
                                                setHo_ten(e.target.value);
                                            }}
                                            sx={{
                                                'input': {
                                                    '&::placeholder': {
                                                        fontSize: 16,
                                                    }
                                                },
                                            }}
                                            label="Họ tên"
                                            variant="outlined"
                                            value={ho_ten}
                                            onKeyPress={e => onEnterKey(e)}
                                        />
                                    </Box>
                                </Box>
                                <Box className="col-md-2">
                                    <Box className="ad-auth-feilds">
                                        <Link onClick={() => {
                                            getListBot(pageCurrent)
                                        }} to={"#/"}
                                              className="btn btn-primary squer-btn  pd14"><i
                                            className={"fas fa-search"}></i> Tìm kiếm
                                        </Link>
                                    </Box>
                                </Box>
                            </Box>
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
                                            <th>Mã Bot</th>
                                            <th>Thông tin</th>
                                            <th>Mô tả</th>
                                            <th>Người tạo</th>
                                            <th>Ngày tạo</th>
                                            <th>Trạng thái</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {dataList.length > 0 ? dataList.map((i, index) => (
                                            <tr key={index}>
                                                <td className="text-center">
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {i.code}
                                                </td>
                                                <td>
                                                    <Typography variant="inherit" fontSize={13}>
                                                        Họ tên : <b>{i.name}</b>
                                                    </Typography>
                                                    <Typography variant="inherit" fontSize={13}>
                                                        Tuổi : <b>{i.age}</b>
                                                    </Typography>
                                                    <Typography variant="inherit" fontSize={13}>
                                                        Giới tính : <b>{i.gender}</b>
                                                    </Typography>
                                                    <Typography variant="inherit" fontSize={13}>
                                                        Chiều cao : <b>{i.height}</b>
                                                    </Typography>
                                                    <Typography variant="inherit" fontSize={13}>
                                                        Cân nặng : <b>{i.weight}</b>
                                                    </Typography>
                                                    <Typography variant="inherit" fontSize={13}>
                                                        Quốc gia : <b>{i.national}</b>
                                                    </Typography>
                                                </td>
                                                <td>
                                                    <label
                                                        className="mb-0 badge badge-primary">
                                                        <Typography variant="inherit"
                                                                    color="white">
                                                            {i.description}
                                                        </Typography>
                                                    </label>
                                                </td>
                                                <td>
                                                    <Typography variant="inherit" fontSize={13}>
                                                        {i.full_name}
                                                    </Typography>
                                                </td>
                                                <td>
                                                    <Typography variant="subtitle1" fontSize={13}>
                                                        {i.created_at}
                                                    </Typography>
                                                </td>
                                                <td>
                                                    <Status status={i.status}></Status>
                                                </td>
                                                <td className="relative">
                                                    <Typography variant={"body1"} className="action-btn ">
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
                                                    <Box className="action-option ">
                                                        <ul>
                                                            <li>
                                                                <Link to={"/updated-bot?id=" + i.id}><i
                                                                    className="far fa-edit mr-2 "></i>Chi tiết</Link>
                                                            </li>
                                                            <li>
                                                                <Link onClick={() => {
                                                                    deleteCt(i.id)
                                                                }} to={"#/"}><i
                                                                    className="far fa-trash-alt mr-2"></i>Xóa</Link>
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
                            <Paginate linkPage={linkPage} pageCurrent={pageCurrent} pageLast={pageLast}
                                      pageCurentRollBack={e => getListBot(e)}></Paginate>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>)
}

export default Index;

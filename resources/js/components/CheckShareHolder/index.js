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
import Helpers from "../pages/Helpers";

function CheckShareholder() {
    //paginate
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageLast, setPageLast] = useState(1);
    const [linkPage, setLinkPage] = useState([]);
    //props
    const [checkAction, setCheckAction] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [nameSearch, setNameSearch] = useState('');

    const [block, setBlock] = useState('');
    const options = [
        {value: "0", label: "Chưa check in"},
        {value: "1", label: "Đã check in"},
    ];
    const [checkin, setCheckin] = useState('');

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
        userShareholderService.getListCheckin(page, nameSearch, block)
            .then(data => {
                console.log('data', data);
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

    const CheckIn = (id) => {
        setLoading(true);
        userShareholderService.CheckIn(id)
            .then(data => {
                setLoading(false);
                if (data.status == 1) {
                    setCheckin({...checkin, check_in: 1, url_qr: data?.data?.url_qr});
                    getListData(pageCurrent);
                    helpers.showToast('success', data?.mess);
                } else {
                    resetData();
                    helpers.showToast('error', data?.mess);
                }
            });
    }


    const openPdf = (id) => {
        setLoading(true);
        userShareholderService.getTkLogin(id)
            .then(data => {
                setLoading(false);
                // downloadPDF(data);
                var file = new Blob([data], {type: 'application/pdf'});
                var fileURL = URL.createObjectURL(file);
                window.open(fileURL,"_blank");
            });
    }

    const getListById = (id) => {
        setLoading(true);
        userShareholderService.getListById(id)
            .then(data => {
                console.log('data', data);
                setLoading(false);
                if (data.status == 1) {
                    setCheckin(data?.data);
                } else Helpers.showToast('error', data?.mess);
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
                                <h4 className="mb-sm-0">Danh sách cổ đông</h4>
                                <Box className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#">Quản lý cổ đông</a>
                                        </li>
                                        <li className="breadcrumb-item active">Danh sách cổ đông</li>
                                    </ol>
                                </Box>

                            </Box>
                        </Box>
                    </Box>
                    <Box className="row">
                        <Box className="col-xl-12">
                            <Box className="card">
                                <Box className="card-header align-items-center d-flex">
                                    <h3 className="card-title mb-0 flex-grow-1">Danh sách cổ đông</h3>
                                </Box>
                                <Box className="card-body">
                                    <Box className="row">
                                        <Box className="col-4">
                                            <input type="text" className="form-control"
                                                   placeholder={'Họ tên/CMND/CCCD...'}
                                                   value={nameSearch}
                                                   onChange={(e) => setNameSearch(e.target.value)}/>
                                        </Box>
                                        <Box className="col-3">
                                            <select className="form-select mb-3"
                                                    aria-label="Default select example" onChange={(e) => {
                                                console.log(e.target.value);
                                                setBlock(e.target.value);
                                            }}>
                                                <option value="" selected>--- Trạng thái ---</option>
                                                {options?.map((item, index) => (
                                                    <option key={index} value={item.value}
                                                            selected={item.value == block}>
                                                        {item.label}
                                                    </option>))}
                                            </select>
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
                                                <th scope="col">Ngày cấp</th>
                                                <th scope="col">Số điện thoại</th>
                                                <th scope="col">Số lượng CP</th>
                                                <th scope="col">Trạng thái</th>
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
                                                        {i.id}
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
                                                        <span className="badge badge-soft-success p-2">{i.total}</span>
                                                    </td>
                                                    <td>
                                                        {i.checkin == 1 ?
                                                            <span
                                                                className="badge badge-label bg-success">Đã check in</span>
                                                            :
                                                            <span
                                                                className="badge badge-label bg-danger">Chưa check in</span>
                                                        }
                                                    </td>
                                                    <td className="display-flex">
                                                        <button type="button"
                                                                className="btn btn-secondary custom-toggle active"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModalgrid"
                                                                onClick={() => getListById(i.id)}>
                                                            <span className="icon-off"><i
                                                                className="ri-check-fill align-bottom me-1">
                                                            </i> Check in</span>
                                                        </button>
                                                        <Box className="modal fade" id="exampleModalgrid"
                                                             tabIndex="-1" aria-labelledby="exampleModalgridLabel">
                                                            <Box className="modal-dialog">
                                                                <Box className="modal-content">
                                                                    <Box className="modal-header">
                                                                        <h5 className="modal-title"
                                                                            id="exampleModalgridLabel">XÁC NHẬN TƯ CÁCH
                                                                            THAM GIA</h5>
                                                                        <button type="button" className="btn-close"
                                                                                data-bs-dismiss="modal"
                                                                                aria-label="Close"></button>
                                                                    </Box>
                                                                    <Box className="modal-body">
                                                                        <Box className="row g-3">
                                                                            <Box className="col-xxl-6">
                                                                                <Box>
                                                                                    <label htmlFor="firstName"
                                                                                           className="form-label">Cổ
                                                                                        đông/ người đại diện</label>
                                                                                    <input type="text"
                                                                                           className="form-control"
                                                                                           disabled
                                                                                           value={checkin.name}
                                                                                    />
                                                                                </Box>
                                                                            </Box>
                                                                            <Box className="col-xxl-6">
                                                                                <Box>
                                                                                    <label htmlFor="lastName"
                                                                                           className="form-label">CCCD /
                                                                                        DKSH</label>
                                                                                    <input type="text"
                                                                                           className="form-control"
                                                                                           disabled
                                                                                           value={checkin.cccd}
                                                                                    />
                                                                                </Box>
                                                                            </Box>
                                                                            <Box className="col-xxl-6">
                                                                                <label htmlFor="emailInput"
                                                                                       className="form-label">Số
                                                                                    điện thoại</label>
                                                                                <input type="text"
                                                                                       className="form-control"
                                                                                       disabled
                                                                                       value={checkin.phone_number}
                                                                                />
                                                                            </Box>
                                                                            <Box className="col-xxl-6">
                                                                                <label htmlFor="passwordInput"
                                                                                       className="form-label">Ngày
                                                                                    cấp</label>
                                                                                <input type="text"
                                                                                       className="form-control"
                                                                                       disabled
                                                                                       value={checkin.date_range}
                                                                                />
                                                                            </Box>

                                                                            <Box className="col-xxl-6">
                                                                                <label htmlFor="emailInput"
                                                                                       className="form-label">Email</label>
                                                                                <input type="text"
                                                                                       className="form-control"
                                                                                       disabled
                                                                                       value={checkin.email}
                                                                                />
                                                                            </Box>
                                                                            <Box className="col-xxl-6">
                                                                                <label htmlFor="passwordInput"
                                                                                       className="form-label">Nơi
                                                                                    cấp</label>
                                                                                <input type="text"
                                                                                       className="form-control"
                                                                                       disabled
                                                                                       value={checkin.issued_by}
                                                                                />
                                                                            </Box>
                                                                            <Box className="col-xxl-6">
                                                                                <label htmlFor="emailInput"
                                                                                       className="form-label">Cổ
                                                                                    phần sở hữu</label>
                                                                                <input type="text"
                                                                                       className="form-control"
                                                                                       disabled
                                                                                       value={checkin.share_total}
                                                                                />
                                                                            </Box>
                                                                            <Box className="col-xxl-6">
                                                                                <label htmlFor="passwordInput"
                                                                                       className="form-label">Tổng
                                                                                    số cổ phần đại diện</label>
                                                                                <input type="text"
                                                                                       className="form-control"
                                                                                       disabled
                                                                                       value={checkin.total}
                                                                                />
                                                                            </Box>
                                                                            <Box className="modal-body text-center">
                                                                                <img src={checkin.url_qr}
                                                                                     style={{width: 200}} alt=""/>
                                                                                {checkin.check_in == null || checkin.check_in == 0 ?
                                                                                    <Box className="mt-4 pt-4">
                                                                                        <button
                                                                                            className="btn btn-light bg-gradient waves-effect waves-light"
                                                                                            data-bs-dismiss="modal"
                                                                                            style={{marginRight: 22}}>
                                                                                            Hủy bỏ
                                                                                        </button>
                                                                                        <button
                                                                                            className="btn btn-success bg-gradient waves-effect waves-light"
                                                                                            onClick={() => CheckIn(checkin.id)}>
                                                                                            Xác nhận
                                                                                        </button>
                                                                                    </Box>
                                                                                    : <Box className="mt-4 pt-4">
                                                                                        <button
                                                                                            className="btn btn-light bg-gradient waves-effect waves-light"
                                                                                            data-bs-dismiss="modal"
                                                                                            style={{marginRight: 22}}>
                                                                                            In Phiếu Biểu Quyết
                                                                                        </button>
                                                                                        <button
                                                                                            className="btn btn-success bg-gradient waves-effect waves-light"
                                                                                            data-bs-dismiss="modal">
                                                                                            In tài khoản đăng nhập
                                                                                        </button>
                                                                                    </Box>
                                                                                }
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                        <button type="button"
                                                                className="btn btn-success btn-border"
                                                                data-bs-toggle="modal" data-bs-target="#firstmodal">QR
                                                            code
                                                        </button>
                                                        <Box className="modal fade" id="firstmodal" aria-hidden="true"
                                                             tabIndex="-1">
                                                            <Box className="modal-dialog modal-dialog-centered">
                                                                <Box className="modal-content">
                                                                    <Box className="modal-header">
                                                                        <button type="button" className="btn-close"
                                                                                data-bs-dismiss="modal"
                                                                                aria-label="Close"></button>
                                                                    </Box>
                                                                    <Box className="modal-body text-center p-5">
                                                                        <img src={i.url_qr} alt=""/>
                                                                        <Box className="mt-4 pt-4">
                                                                            <h4>QR CODE</h4>
                                                                            <p className="text-muted"> Quét mã QR để
                                                                                thực hiện đăng nhập cho Cổ đông</p>
                                                                            <button
                                                                                className="btn btn-secondary waves-effect waves-light"
                                                                                onClick={() => openPdf(i.id)}>
                                                                                In Tài khoản đăng nhập
                                                                            </button>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
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

export default CheckShareholder;

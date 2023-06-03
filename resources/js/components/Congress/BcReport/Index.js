import React, {Component, useEffect, useState} from 'react';
import {
    Box, Modal, TextField, Typography,
} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import {congressService} from "../../../model/congressService";
import {userShareholderService} from "../../../model/userShareholderService";
import Paginate from "../../pages/Paginate";
import Helpers from "../../pages/Helpers";
import Footer from "../../pages/Footer";

function Index() {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [linkPage, setLinkPage] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageLast, setPageLast] = useState(1);

    const [nameSearch, setNameSearch] = useState('');
    const [block, setBlock] = useState('');
    const options = [
        {value: "0", label: "Tất cả"},
        {value: "1", label: "Bị chặn"},
    ];
    const [dataListUser, setDataListUser] = useState([]);
    const [linkPageUser, setLinkPageUser] = useState([]);
    const [pageCurrentUser, setPageCurrentUser] = useState(1);
    const [pageLastUser, setPageLastUser] = useState(1);
    const [ObjectId, setObjectId] = useState();
    const [title, setTitle] = useState();

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
                    } else {
                        Helpers.showToast('error', data?.mess);
                    }
                }
            );
    }

    const getListUserShare = (id, page = 1,) => {
        setObjectId(id);
        setPageCurrentUser(page);
        setLoading(true);
        userShareholderService.getListByReport(id,page, nameSearch, block)
            .then(
                data => {
                    setLoading(false);
                    if (data.status == 1) {
                        setTitle(data?.data?.title);
                        setDataListUser(data?.data?.data?.data);
                        setLinkPageUser(data?.data?.data.links);
                        setPageLastUser(parseInt(data?.data?.data.last_page));
                    } else {
                        Helpers.showToast('error', data?.mess);
                    }
                }
            );
    }

    function changeStatus(list) {
        setDataListUser(list);
    }

    const UpdateBlock = (id, status) => {
        setLoading(true);
        userShareholderService.UpdateBlock(id, status, ObjectId)
            .then(
                data => {
                    setLoading(false);
                    if (data.status == 1) {
                        let objIndex = dataListUser.findIndex((obj => obj.id == id));
                        dataListUser[objIndex].block = status;
                        setDataListUser([]);
                        changeStatus(dataListUser);
                        Helpers.showToast('success', data?.mess);
                    } else {
                        Helpers.showToast('error', data?.mess);
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
                                                            <Box className="d-flex flex-wrap gap-2 max-content">
                                                                <Link
                                                                    to={"/khai-bao-bc-to-trinh"}
                                                                    className="link-primary text-reset text-decoration-underline"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target=".bs-example-modal-xl">
                                                                    <button
                                                                        className="btn btn-outline-danger waves-effect waves-light"
                                                                        onClick={() => getListUserShare(i.id)}>Chặn
                                                                        CĐ
                                                                        biểu quyết
                                                                    </button>
                                                                </Link>
                                                            </Box>

                                                            <Box className="modal fade bs-example-modal-xl"
                                                                 tabIndex="-1" role="dialog"
                                                                 aria-labelledby="myExtraLargeModalLabel"
                                                                 aria-hidden="true">
                                                                <Box className="modal-dialog modal-xl">
                                                                    <Box className="modal-content">
                                                                        <Box className="modal-header">
                                                                            <h5 className="modal-title"
                                                                                id="myExtraLargeModalLabel">CHẶN CỔ ĐÔNG
                                                                                BIỂU QUYẾT</h5>
                                                                            <button type="button" className="btn-close"
                                                                                    data-bs-dismiss="modal"
                                                                                    aria-label="Close"></button>
                                                                        </Box>
                                                                        <Box className="modal-body">
                                                                            <h6 className="fs-15">Tờ trình: {title}
                                                                            </h6>
                                                                            <h6>Thiết lập danh sách Cổ đông bị chặn biểu
                                                                                quyết</h6>

                                                                            <Box className="d-flex mt-2">
                                                                                <Box className="card-body">
                                                                                    <Box className="row">
                                                                                        <Box className="col-4">
                                                                                            <input type="text"
                                                                                                   className="form-control"
                                                                                                   placeholder={'Chọn cổ đông chặn'}
                                                                                                   value={nameSearch}
                                                                                                   onChange={(e) => setNameSearch(e.target.value)}/>
                                                                                        </Box>
                                                                                        <Box className="col-3">
                                                                                            <select
                                                                                                className="form-select mb-3"
                                                                                                aria-label="Default select example"
                                                                                                onChange={(e) => {
                                                                                                    setBlock(e.target.value);
                                                                                                }}>
                                                                                                {options?.map((item) => (
                                                                                                    <option
                                                                                                        key={item.value}
                                                                                                        value={item.value}
                                                                                                        selected={item.value == block}>
                                                                                                        {item.label}
                                                                                                    </option>))}
                                                                                            </select>
                                                                                        </Box>
                                                                                        <Box className="col-2">
                                                                                            <button type="button"
                                                                                                    onClick={() => getListUserShare(ObjectId)}
                                                                                                    className="btn btn-primary waves-effect waves-ligh">
                                                                                                Tìm kiếm
                                                                                            </button>
                                                                                        </Box>
                                                                                    </Box>
                                                                                </Box>
                                                                            </Box>
                                                                            <h6 className="fs-16 my-3"></h6>
                                                                            <Box className="row">
                                                                                <Box className="col-xl-12">
                                                                                    <Box className="card">
                                                                                        <Box
                                                                                            className="card-header align-items-center d-flex">
                                                                                            <h4 className="card-title mb-0 flex-grow-1">Danh
                                                                                                sách cổ đông</h4>
                                                                                        </Box>
                                                                                        <Box className="card-body">
                                                                                            <Box
                                                                                                className="live-preview">
                                                                                                <Box
                                                                                                    className="table-responsive table-card">
                                                                                                    <table
                                                                                                        className="table align-middle mb-0">
                                                                                                        <thead
                                                                                                            className="table-light">
                                                                                                        <tr>
                                                                                                            <th scope="col">STT</th>
                                                                                                            <th scope="col">Họ
                                                                                                                tên
                                                                                                            </th>
                                                                                                            <th scope="col">CMND/CCCD</th>
                                                                                                            <th scope="col">Số
                                                                                                                điện
                                                                                                                thoại
                                                                                                            </th>
                                                                                                            <th scope="col">Cổ
                                                                                                                phần sở
                                                                                                                hữu
                                                                                                            </th>
                                                                                                            <th scope="col">Xử
                                                                                                                lý
                                                                                                            </th>
                                                                                                            <th scope="col">Trạng
                                                                                                                thái
                                                                                                            </th>
                                                                                                            <th scope="col"></th>
                                                                                                        </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                        {dataListUser.length > 0 ? dataListUser.map((i, index) => (
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
                                                                                                                    {i.phone_number}
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    <b>{i.total}</b>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    <Box
                                                                                                                        className="d-flex flex-wrap gap-2 max-content">
                                                                                                                        <Link
                                                                                                                            to={"/khai-bao-bc-to-trinh"}
                                                                                                                            className="link-primary text-reset text-decoration-underline"
                                                                                                                        >
                                                                                                                            {i.block == 1 ?
                                                                                                                                <button
                                                                                                                                    className="btn rounded-pill btn-secondary waves-effect"
                                                                                                                                    onClick={() => UpdateBlock(i.id, 0)}>Bỏ
                                                                                                                                    chặn
                                                                                                                                </button>
                                                                                                                                :
                                                                                                                                <button
                                                                                                                                    className="btn rounded-pill btn-danger waves-effect waves-light"
                                                                                                                                    onClick={() => UpdateBlock(i.id, 1)}>
                                                                                                                                    Chặn
                                                                                                                                </button>
                                                                                                                            }
                                                                                                                        </Link>
                                                                                                                    </Box>

                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    {i.block == 1 ?
                                                                                                                        <span
                                                                                                                            className="badge text-bg-danger">
                                                                                                                        Đã Chặn
                                                                                                                    </span> :
                                                                                                                        <span
                                                                                                                            className="badge text-bg-secondary"> Chưa Chặn
                                                                                                                        </span>
                                                                                                                    }


                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        )) : <tr>
                                                                                                            <td colSpan="9"
                                                                                                                className="text-center">
                                                                                                                <Typography
                                                                                                                    variant="subtitle1">Không
                                                                                                                    có
                                                                                                                    dữ
                                                                                                                    liệu!</Typography>
                                                                                                            </td>
                                                                                                        </tr>}
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </Box>
                                                                                            </Box>
                                                                                        </Box>
                                                                                    </Box>
                                                                                    <Paginate
                                                                                        linkPage={linkPageUser}
                                                                                        pageCurrent={pageCurrentUser}
                                                                                        pageLast={pageLastUser}
                                                                                        pageCurentRollBack={e => getListUserShare(ObjectId,e)}></Paginate>
                                                                                </Box>
                                                                            </Box>
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

import React, {Component, useEffect, useState} from 'react';
import {
    Box, Modal, Typography,
} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import {congressService} from "../../model/congressService";
import Paginate from "../pages/Paginate";
import Helpers from "../pages/Helpers";
import Footer from "../pages/Footer";

function Authority2() {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [linkPage, setLinkPage] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageLast, setPageLast] = useState(1);

    const deleteCongress = (id) => {
        setLoading(true);

        congressService.deleted(id)
            .then(
                data => {
                    setLoading(false);
                    if (data.status == 1) {
                        getListCongress();
                        Helpers.showToast('success', data?.mess);
                    } else Helpers.showToast('error', data?.mess);
                }
            );
    }
    const getListCongress = (page) => {
        setPageCurrent(page);
        setLoading(true);
        congressService.getList(page)
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
        getListCongress(pageCurrent);
    }, []);
    return (
        <Box className="main-content">

            <Box className="page-content">
                <Box className="container-fluid">
                    <Box className="row">
                        <Box className="col-12">
                            <Box className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">DANH SÁCH ỦY QUYỀN</h4>
                                <Box className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#">DANH SÁCH ỦY QUYỀN</a>
                                        </li>
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
                                </Box>
                                <Box className="card-body">
                                    <Box className="live-preview">
                                        <Box className="table-responsive table-card">
                                            <table
                                                className="table align-middle mb-0">
                                                <thead>
                                                <tr>
                                                    <th rowSpan="2">#</th>
                                                    <th colSpan="2" className="textCenter">Thông tin người ủy
                                                        quyền
                                                    </th>
                                                    <th colSpan="3" className="textCenter">Thông tin người nhận ủy
                                                        quyền
                                                    </th>
                                                    <th rowSpan="2" className="colSpan2">CP ủy quyền</th>
                                                    <th rowSpan="2" className="colSpan2">File đính kèm</th>
                                                    <th rowSpan="2" className="colSpan2">Trạng thái</th>
                                                </tr>
                                                <tr>
                                                    <th className="textCenter">Họ tên</th>
                                                    <th className="textCenter">CMND/CCCD</th>
                                                    <th className="textCenter">Họ tên</th>
                                                    <th className="textCenter">CMND/CCCD</th>
                                                    <th className="textCenter">Số điện thoại</th>
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
                                                            {i.sort}
                                                        </td>
                                                        <td>
                                                            {i.sort}
                                                        </td>
                                                        <td>
                                                            {i.sort}
                                                        </td>
                                                        <td>
                                                            {i.sort}
                                                        </td>
                                                        <td>
                                                            <Box className="hstack gap-3 fs-15">
                                                                <Link to={"/cap-nhat-thu-tuc-khai-mac?id=" + i.id}
                                                                      className="link-primary"><i
                                                                    className="ri-settings-4-line"></i></Link>
                                                                <Link to="/khai-bao-thu-tuc-khai-mac"
                                                                      onClick={() => {
                                                                          deleteCongress(i.id)
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
                                      pageCurentRollBack={e => getListCongress(e)}></Paginate>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Footer></Footer>
        </Box>

    )
}

export default Authority2;

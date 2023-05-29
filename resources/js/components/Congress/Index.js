import React, {Component, useEffect, useState} from 'react';
import {
    Box, Modal, Typography,
} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import {congressService} from "../../model/congressService";
import Paginate from "../pages/Paginate";
import Helpers from "../pages/Helpers";
import Footer from "../pages/Footer";

function Index() {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ho_ten, setHo_ten] = useState('');
    const [email, setEmail] = useState('');
    const [linkPage, setLinkPage] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageLast, setPageLast] = useState(1);
    const [open, setOpen] = React.useState(false);
    const handleOpen = (item) => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const deleteCongress = (id) => {
        setLoading(true);

        congressService.deleted(id)
            .then(
                data => {
                    setLoading(false);
                    if (data.status == 1) {
                        getListCongress();
                        Helpers.showToast('success', data?.messager);
                    } else Helpers.showToast('error', data?.messager);
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
    /*    const onEnterKey = (e) => {
            if (e.key === "Enter") {
                getListBot(pageCurrent);
            }
        }*/
    //useEffect
    useEffect(() => {
        getListCongress(pageCurrent);
    }, []);
    return (
        <Box className="main-content">
     {/*       <Modal class="modal fade show" tabindex="-1" style="display: block;"
                   open={open}
                   onClose={handleClose}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description"
                   aria-modal="true" role="dialog">
                <Box class="modal-dialog">
                    <Box class="modal-content">
                        <Box class="modal-header">
                            aaaa
                        </Box>
                        <Box class="modal-body">
                            bb
                        </Box>
                        <Box class="modal-footer">
                            cc
                        </Box>
                    </Box>
                </Box>
            </Modal>*/}
            <Box className="page-content">
                <Box className="container-fluid">
                    <Box className="row">
                        <Box className="col-12">
                            <Box className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">KHAI BÁO THỦ TỤC KHAI MẠC</h4>
                                <Box className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#">KHAI BÁO THỦ TỤC KHAI MẠC</a>
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
                                    <Link to="/tao-moi-thu-tuc-khai-mac"
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
                                                    <th scope="col">Tên nội dung</th>
                                                    <th scope="col">Tên nội dung (Tiếng Anh)</th>
                                                    <th scope="col">Thứ tự hiển thị</th>
                                                    <th scope="col">Ngày tạo</th>
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
                                                            <Typography variant="subtitle1">
                                                                {i.created_at}
                                                            </Typography>
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
                                                                      // onClick={() => handleOpen()}
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

export default Index;

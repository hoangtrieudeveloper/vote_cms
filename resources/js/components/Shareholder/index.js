import React, {Component, useEffect, useState} from 'react';
import {
    Box, Select, TextField, Typography, MenuItem
} from "@mui/material";
import Footer from "../pages/Footer";
import {userShareholderService} from "../../model/userShareholderService";
import Pagination from "../pages/Pagination";
import ToastNotifi from "../pages/ToastNotifi";
import Loading from "../pages/Loading";

function Shareholder() {
    //paginate
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageLast, setPageLast] = useState(1);
    const [linkPage, setLinkPage] = useState([]);
    //props
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [listType, setListType] = useState([]);
    const [listOrganization, setListOrganization] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    const [type, setType] = useState('');
    const [organization, setOrganization] = useState('');
    const [file, setFile] = useState('');

    useEffect(() => {
        getListData(pageCurrent);
        getListType();
        getListOrganization();
    }, []);

    const getListType = () => {
        userShareholderService.getListType()
            .then(data => {
                if (data.status == 1) {
                    setListType(Object.values(data?.data));
                    // Helpers.showToast('success', data?.mess);
                } else {
                    // Helpers.showToast('error', data?.mess);
                }
            });
    }

    const getListOrganization = () => {
        userShareholderService.getListOrganization()
            .then(data => {
                if (data.status == 1) {
                    setListOrganization(Object.values(data?.data));
                    // Helpers.showToast('success', data?.mess);
                } else {
                    // Helpers.showToast('error', data?.mess);
                }
            });
    }

    const handleImport = (e) => {
        setFile(e.target.files[0]);
        e.target.value = null;
    }

    const uploadFileImport = () => {
        console.log('call api', file);
        if (file !== null && file !== undefined) {
            userShareholderService.importShareHolder(file)
                .then(data => {
                    console.log(data);
                    setFile(null);
                    if (data.status == 1) {
                        // Helpers.showToast('success', data?.mess);
                    } else {
                        // Helpers.showToast('error', data?.mess);
                    }
                });
        } else {
            console.log('Không co file');
        }
    }

    const downloadFileDemo = () => {
        setLoading(true);
        userShareholderService.downloadCoDongDemo().then((res) => {
                console.log(res);
                setLoading(false);
            }
        ).catch((error) => {
            setLoading(false);
        })
    }

    const downloadFilePassCD = () => {
        setLoading(true);
        userShareholderService.exportPWCD().then((res) => {
                console.log(res);
                setLoading(false);
            }
        ).catch((error) => {
            setLoading(false);
        })
    }

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
        userShareholderService.getList(page, nameSearch, type, organization)
            .then(data => {
                console.log('data', data);
                setLoading(false);
                if (data.status == 1) {
                    if (data?.data != null || data?.data != undefined) {
                        setData(data?.data?.data);
                        setLinkPage(data?.data?.links);
                        setPageLast(parseInt(data?.data?.last_page));
                    }
                    // Helpers.showToast('success', data?.mess);
                } else {
                    resetData();
                    // Helpers.showToast('error', data?.mess);
                }
            }).catch((error) => {
            setLoading(false);
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
                                    <Box className="row justify-content-sm-end">
                                        {JSON.parse(localStorage.getItem('scopes')).includes('export-password-co-dong') && (<>
                                                <Box className="col-sm-auto">
                                                    <button type="button"
                                                            onClick={downloadFilePassCD}
                                                            className="btn btn-outline-primary waves-effect waves-ligh">
                                                        <i className="mdi mdi-plus"></i>
                                                        Xuất mật khẩu của Cổ đông
                                                    </button>
                                                </Box>
                                                <Box className="col-sm-auto">
                                                    <button type="button"
                                                            className="btn btn-outline-primary waves-effect waves-ligh">
                                                        <i className="mdi mdi-plus"></i>
                                                        Khóa việc thay đổi Mật khẩu
                                                    </button>
                                                </Box>
                                            </>
                                        )}
                                        {JSON.parse(localStorage.getItem('scopes')).includes('import-co-dong') && (<>
                                            <Box className="col-sm-auto">
                                                <button type="button"
                                                        onClick={downloadFileDemo}
                                                        className="btn btn-outline-primary waves-effect waves-ligh">
                                                    <i className="mdi mdi-download"></i>
                                                    Tải về file mẫu
                                                </button>
                                            </Box>
                                            <Box className="col-sm-auto">
                                                <label onChange={handleImport}
                                                       className="btn btn-outline-primary waves-effect waves-ligh"
                                                       htmlFor="formId">
                                                    <i className="mdi mdi-upload"></i>
                                                    Tải lên danh sách cổ đông
                                                    <input name="file" type="file" id="formId" hidden
                                                           accept="application/xlsx"/>
                                                </label>
                                            </Box>
                                            <Box className="col-sm-auto">
                                                <button type="button"
                                                        onClick={uploadFileImport}
                                                        className="btn btn-outline-primary waves-effect waves-ligh">
                                                    <i className="mdi mdi-plus"></i>
                                                    Tạo danh sách
                                                </button>
                                            </Box></>)}
                                    </Box>
                                    <Box className="row g-4 mb-3">
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
                                                setType(e.target.value);
                                            }}>
                                                <option value="" selected>--- Quan hệ ---</option>
                                                {listType?.map((item, index) => (
                                                    <option key={index} value={item.value}
                                                            selected={item.value == type}>
                                                        {item.label}
                                                    </option>))}
                                            </select>
                                        </Box>
                                        <Box className="col-3">
                                            <select className="form-select mb-3"
                                                    aria-label="Default select example" onChange={(e) => {
                                                console.log(e.target.value);
                                                setOrganization(e.target.value);
                                            }}>
                                                <option value="" selected>--- Tổ chức ---</option>
                                                {listOrganization?.map((item, index) => (
                                                    <option key={index} value={item.value}
                                                            selected={item.value == organization}>
                                                        {item.label}
                                                    </option>))}
                                            </select>
                                        </Box>
                                        <Box className="col-2">
                                            <Box className="d-grid gap-1">
                                                <button type="button"
                                                        onClick={() => getListData()}
                                                        className="btn btn-primary waves-effect waves-ligh ">
                                                    Tìm kiếm
                                                </button>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="table-responsive table-card mb-3">
                                        <table
                                            className="table table-borderless table-hover table-nowrap align-middle mb-0">
                                            <thead className="table-light">
                                            <tr className="text-muted">
                                                <th scope="col">#</th>
                                                <th scope="col">Mã CĐ</th>
                                                <th scope="col">Họ tên Cổ đông</th>
                                                <th scope="col">Ngày cấp</th>
                                                <th scope="col">Nơi cấp</th>
                                                <th scope="col">Số điện thoại</th>
                                                <th scope="col">Số lượng CP</th>
                                                <th scope="col">Mã CK</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Địa chỉ</th>
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
                                                        {i.issued_by}
                                                    </td>
                                                    <td>
                                                        {i.phone_number}
                                                    </td>
                                                    <td>
                                                        <span className="badge badge-soft-success p-2">{i.total}</span>
                                                    </td>
                                                    <td>
                                                        ksb
                                                    </td>
                                                    <td>
                                                        {i.email}
                                                    </td>
                                                    <td>
                                                        {i.address}
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

export default Shareholder;

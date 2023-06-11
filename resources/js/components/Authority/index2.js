import React, {Component, useEffect, useState} from 'react';
import {
    Box, Select, TextField, Typography, MenuItem
} from "@mui/material";
import Footer from "../pages/Footer";
import {AuthorityService} from "../../model/AuthorityService";
import Pagination from "../pages/Pagination";
import ToastNotifi from "../pages/ToastNotifi";
import Loading from "../pages/Loading";
import helpers from "../pages/Helpers";
import {userShareholderService} from "../../model/userShareholderService";

function Authority2() {
    //paginate
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageLast, setPageLast] = useState(1);
    const [linkPage, setLinkPage] = useState([]);
    //props
    const [checkAction, setCheckAction] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    const [file, setFile] = useState('');

    const [block, setBlock] = useState('');
    const options = [
        {value: "0", label: "Chờ duyệt"},
        {value: "1", label: "Đã duyệt"},
        {value: "2", label: "Thất bại"},
    ];

    const [author, setAuthor] = useState('');
    const options2 = [
        {value: "0", label: "Cổ đông ủy quyền"},
        {value: "1", label: "Cổ đông nhận ủy quyền"},
    ];

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
        AuthorityService.getListAuthor(page, nameSearch, block, author)
            .then(data => {
                console.log('data', data);
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

    const downloadFileDemo = () => {
        setLoading(true);
        AuthorityService.downloadUyQuyenDemo().then((res) => {
                setLoading(false);
            }
        ).catch((error) => {
            setLoading(false);
        })
    }

    const handleImport = (e) => {
        setFile(e.target.files[0]);
        e.target.value = null;
        helpers.showToast('success', "Upload file thành công!");
    }

    const uploadFileImport = () => {
        console.log(file);
        if (file) {
            AuthorityService.importAuthorHolder(file)
                .then(data => {
                    setFile(null);
                    if (data.status == 1) {
                        helpers.showToast('success', data?.mess);
                        getListData(pageCurrent);
                    } else {
                        helpers.showToast('error', data?.mess);
                    }
                });
        } else {
            helpers.showToast('error', 'Vui lòng tải lên danh sách cổ đông!');
        }
    }

    const downloadFileExcel = () => {
        setLoading(true);
        AuthorityService.downloadFileExcel().then((res) => {
                setLoading(false);
            }
        ).catch((error) => {
            setLoading(false);
        })
    }

    const changeStatus = (id, status) => {
        setLoading(true);
        AuthorityService.changeStatusAuthor(id, status)
            .then((data) => {
                    setLoading(false);
                    if (data.status == 1) {
                        helpers.showToast('success', data?.mess);
                        var opt = document.getElementById('dis-' + id);
                        opt.setAttribute("disabled", "");
                    } else {
                        helpers.showToast('error', data?.mess);
                    }
                }
            ).catch((error) => {
            setLoading(false);
        })
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
                                    <Box className="col-xl-8">
                                        <h3 className="card-title mb-0 flex-grow-1">Danh sách</h3>
                                    </Box>
                                    <Box className="col-xl-4">
                                        <button type="button"
                                                className="btn btn-outline-success waves-effect waves-light marginR10"
                                                onClick={downloadFileDemo}
                                        >
                                            <i className="mdi mdi-download"></i>
                                            Tải về file mẫu
                                        </button>
                                        <label onChange={handleImport}
                                               className="btn btn-outline-success waves-effect waves-light marginR10"
                                               htmlFor="formId"
                                               id="inputFile"
                                        >
                                            <i className="mdi mdi-upload"></i>
                                            <input name="file" type="file" id="formId" hidden
                                                   accept="application/xlsx"/>
                                            Tải lên danh sách ủy quyền
                                        </label>
                                        <button type="button"
                                                className="btn btn-outline-success waves-effect waves-light"
                                                onClick={uploadFileImport}
                                        >
                                            <i className="mdi mdi-plus"></i>
                                            Tạo danh sách
                                        </button>
                                    </Box>
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

                                        <Box className="col-3">
                                            <select className="form-select mb-3"
                                                    aria-label="Default select example" onChange={(e) => {
                                                console.log(e.target.value);
                                                setAuthor(e.target.value);
                                            }}>
                                                <option value="" selected>--- Tất cả ---</option>
                                                {options2?.map((item, index) => (
                                                    <option key={index} value={item.value}
                                                            selected={item.value == author}>
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
                                <Box className="row justify-content-sm-end">
                                    <Box className="col-sm-auto">
                                        <button type="button"
                                                className="btn btn-outline-success waves-effect waves-light marginR10"
                                                onClick={downloadFileExcel}
                                        >
                                            <i className="mdi mdi-export"></i>
                                            Xuất file excel
                                        </button>
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
                                            <thead>
                                            <tr>
                                                <th rowSpan="2" className="colSpan2">#</th>
                                                <th colSpan="2" className="textCenter">Thông tin người ủy
                                                    quyền
                                                </th>
                                                <th colSpan="3" className="textCenter">Thông tin người nhận ủy
                                                    quyền
                                                </th>
                                                <th rowSpan="2" className="colSpan2">CP ủy quyền</th>
                                                <th rowSpan="2" className="colSpan2">File đính kèm</th>
                                                <th rowSpan="2" className="colSpan2">Ngày tạo</th>
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
                                            {data.length > 0 ? data?.map((i, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        {i.name_1}
                                                    </td>
                                                    <td>
                                                        {i.cccd_1}
                                                    </td>
                                                    <td>
                                                        {i.name_2}
                                                    </td>
                                                    <td>
                                                        {i.cccd_2}
                                                    </td>
                                                    <td>
                                                        {i.phone_number_2}
                                                    </td>
                                                    <td>
                                                        {i.total_authority}
                                                    </td>
                                                    <td>
                                                        <a href="/files/filedinhkem.pdf" target="_blank" download>filedinhkem</a>
                                                    </td>
                                                    <td>
                                                        {new Date(i.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td>
                                                        {
                                                            i.status != 0 ?
                                                                <select className="form-select mb-3"
                                                                        aria-label="Default select example"
                                                                        style={{width:"60%"}}
                                                                        disabled
                                                                >
                                                                    {options?.map((item, index) => (
                                                                        <option key={index} value={i.status}
                                                                                selected={item.value == i.status}>
                                                                            {item.label}
                                                                        </option>))}
                                                                </select>
                                                                :
                                                                <select className="form-select mb-3"
                                                                        aria-label="Default select example"
                                                                        style={{width:"60%"}}
                                                                        onChange={(e) => changeStatus(i.id, e.target.value)}
                                                                        id={"dis-" + i.id}
                                                                >
                                                                    {options?.map((item, index) => (
                                                                        <option key={index} value={item.value}
                                                                                selected={item.value == i.status}>
                                                                            {item.label}
                                                                        </option>))}
                                                                </select>

                                                        }

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

export default Authority2;

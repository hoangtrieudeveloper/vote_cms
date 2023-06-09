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
import Helpers from "../pages/Helpers";
import {Link} from "react-router-dom";
import {congressService} from "../../model/congressService";

function Authority3() {
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
        AuthorityService.getAccountAuthority(page, nameSearch)
            .then(data => {
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
                                <h4 className="mb-sm-0">Thiết lập thông tin ủy quyền</h4>
                                <Box className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#">Danh sách nhận ủy quyền</a>
                                        </li>
                                    </ol>
                                </Box>

                            </Box>
                        </Box>
                    </Box>

                    <Box className="row">
                        <Box className="col-lg-12">
                            <Box>
                                <Box className="d-flex profile-wrapper">
                                    <ul className="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1"
                                        role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link fs-14 active color" data-bs-toggle="tab"
                                               href="#overview-tab" role="tab">
                                                <i className="ri-airplay-fill d-inline-block d-md-none"></i> <span
                                                className="d-none d-md-inline-block">Thiết lập tài khoản nhận ủy quyền</span>
                                            </a>

                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link fs-14 color" data-bs-toggle="tab" href="#activities"
                                               role="tab">
                                                <i className="ri-list-unordered d-inline-block d-md-none"></i> <span
                                                className="d-none d-md-inline-block">Thiết lập nội dung ủy quyền</span>
                                            </a>
                                        </li>
                                    </ul>
                                </Box>

                                <Box className="tab-content pt-4 text-muted">
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
                                            <div className="col-xl-3 col-lg-4 col-sm-6" style={{marginBottom: 10}}>
                                                <Link to="/tao-moi-thu-tuc-khai-mac"
                                                      className="btn btn-info squer-btn mr-2 sm-btn custom-toggle active"
                                                      data-bs-toggle="modal"
                                                      data-bs-target="#exampleModalgrid"
                                                ><i
                                                    className={"fas fa-plus"}
                                                    style={{marginTop: "0px !important"}}></i> Tạo mới
                                                </Link>
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
                                                                    <Box className="col-xxl-12">
                                                                        <Box>
                                                                            <TextField
                                                                                className="form-control"
                                                                                fullWidth
                                                                                name="name"
                                                                                type='text'
                                                                                required
                                                                                onChange={e => onInputChange(e)}
                                                                                sx={{
                                                                                    'input': {
                                                                                        '&::placeholder': {
                                                                                            fontSize: 16,
                                                                                        }
                                                                                    },
                                                                                }}
                                                                                label="Cổ đông/ người đại diện"
                                                                                variant="outlined"
                                                                                value={authority.name}
                                                                            />
                                                                        </Box>
                                                                    </Box>
                                                                    <Box className="col-xxl-12">
                                                                        <Box>
                                                                            <TextField
                                                                                className="form-control"
                                                                                fullWidth
                                                                                name="cccd"
                                                                                type='text'
                                                                                required
                                                                                onChange={e => onInputChange(e)}
                                                                                sx={{
                                                                                    'input': {
                                                                                        '&::placeholder': {
                                                                                            fontSize: 16,
                                                                                        }
                                                                                    },
                                                                                }}
                                                                                label="CCCD / DKSH"
                                                                                variant="outlined"
                                                                                value={authority.cccd}
                                                                            />
                                                                        </Box>
                                                                    </Box>
                                                                    <Box className="col-xxl-12">

                                                                        <TextField
                                                                            className="form-control"
                                                                            fullWidth
                                                                            name="phone_number"
                                                                            type='text'
                                                                            onChange={e => onInputChange(e)}
                                                                            sx={{
                                                                                'input': {
                                                                                    '&::placeholder': {
                                                                                        fontSize: 16,
                                                                                    }
                                                                                },
                                                                            }}
                                                                            label="Số điện thoại"
                                                                            value={authority.phone_number}
                                                                        />
                                                                    </Box>
                                                                    <Box className="col-xxl-12">
                                                                        <TextField
                                                                            className="form-control"
                                                                            fullWidth
                                                                            name="email"
                                                                            type='email'
                                                                            onChange={e => onInputChange(e)}
                                                                            sx={{
                                                                                'input': {
                                                                                    '&::placeholder': {
                                                                                        fontSize: 16,
                                                                                    }
                                                                                },
                                                                            }}
                                                                            label="Email"
                                                                            value={authority.email}
                                                                        />
                                                                    </Box>

                                                                    <Box className="col-xxl-12">
                                                                        <TextField
                                                                            className="form-control"
                                                                            fullWidth
                                                                            name="password"
                                                                            type='password'
                                                                            required
                                                                            onChange={e => onInputChange(e)}
                                                                            sx={{
                                                                                'input': {
                                                                                    '&::placeholder': {
                                                                                        fontSize: 16,
                                                                                    }
                                                                                },
                                                                            }}
                                                                            label="Mật khẩu"
                                                                            variant="outlined"
                                                                            value={authority.password}
                                                                        />
                                                                    </Box>
                                                                    <Box className="col-xxl-12">
                                                                        <TextField
                                                                            className="form-control"
                                                                            fullWidth
                                                                            name="organization"
                                                                            type='text'
                                                                            onChange={e => onInputChange(e)}
                                                                            sx={{
                                                                                'input': {
                                                                                    '&::placeholder': {
                                                                                        fontSize: 16,
                                                                                    }
                                                                                },
                                                                            }}
                                                                            label="Chức vụ"
                                                                            value={authority.organization}
                                                                        />
                                                                    </Box>

                                                                    <Box className="modal-body text-center">_
                                                                        <Box className="mt-4 pt-4">
                                                                            <button
                                                                                className="btn btn-light bg-gradient waves-effect waves-light"
                                                                                data-bs-dismiss="modal"
                                                                                style={{marginRight: 22}}>
                                                                                Hủy bỏ
                                                                            </button>
                                                                            <button
                                                                                className="btn btn-success bg-gradient waves-effect waves-light"
                                                                                onClick={() => createAuthority()}>
                                                                                Thêm
                                                                            </button>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>

                                            </div>

                                            <Box className="col-xl-12">
                                                <Box className="card">
                                                    <Box className="card-body">
                                                        <Box className="table-responsive table-card mb-3">
                                                            <table
                                                                className="table table-borderless table-hover table-nowrap align-middle mb-0">
                                                                <thead className="table-light">
                                                                <tr className="text-muted">
                                                                    <th scope="col">#</th>
                                                                    <th scope="col">Đại diện nhận ủy quyền</th>
                                                                    <th scope="col">CMND/CCCD</th>
                                                                    <th scope="col">Số điện thoại</th>
                                                                    <th scope="col">Email</th>
                                                                    <th scope="col">Chức vụ</th>
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
                                                                            {i.name}
                                                                        </td>
                                                                        <td>
                                                                            {i.cccd}
                                                                        </td>
                                                                        <td>
                                                                            {i.phone_number}
                                                                        </td>
                                                                        <td>
                                                                            {i.email}
                                                                        </td>
                                                                        <td>
                                                                            {i.organization}
                                                                        </td>
                                                                        <td>
                                                                                <span
                                                                                    className="badge badge-label bg-success">Đang hoạt động</span>

                                                                        </td>
                                                                        <td>
                                                                            <Link to="/"
                                                                                  className="btn btn-info squer-btn mr-2 sm-btn custom-toggle active"
                                                                                  data-bs-toggle="modal"
                                                                                  data-bs-target="#exampleModalgrid2"
                                                                                  onClick={(e) => getListById(i.id)}>
                                                                                <i className="ri-settings-4-line"></i></Link>

                                                                            <Box className="modal fade"
                                                                                 id="exampleModalgrid2"
                                                                                 tabIndex="-1"
                                                                                 aria-labelledby="exampleModalgridLabel">
                                                                                <Box className="modal-dialog">
                                                                                    <Box className="modal-content">
                                                                                        <Box className="modal-header">
                                                                                            <h5 className="modal-title"
                                                                                                id="exampleModalgridLabel">XÁC
                                                                                                NHẬN TƯ CÁCH
                                                                                                THAM GIA</h5>
                                                                                            <button type="button"
                                                                                                    className="btn-close"
                                                                                                    data-bs-dismiss="modal"
                                                                                                    aria-label="Close"></button>
                                                                                        </Box>
                                                                                        <Box className="modal-body">
                                                                                            <Box className="row g-3">
                                                                                                <Box
                                                                                                    className="col-xxl-12">
                                                                                                    <Box>
                                                                                                        <TextField
                                                                                                            className="form-control"
                                                                                                            fullWidth
                                                                                                            name="name"
                                                                                                            type='text'
                                                                                                            required
                                                                                                            onChange={e => onInputChange(e)}
                                                                                                            sx={{
                                                                                                                'input': {
                                                                                                                    '&::placeholder': {
                                                                                                                        fontSize: 16,
                                                                                                                    }
                                                                                                                },
                                                                                                            }}
                                                                                                            placeholder="Cổ đông/ người đại diện"
                                                                                                            variant="outlined"
                                                                                                            value={authority.name}
                                                                                                        />
                                                                                                    </Box>
                                                                                                </Box>
                                                                                                <Box
                                                                                                    className="col-xxl-12">
                                                                                                    <Box>
                                                                                                        <TextField
                                                                                                            className="form-control"
                                                                                                            fullWidth
                                                                                                            name="cccd"
                                                                                                            type='text'
                                                                                                            required
                                                                                                            onChange={e => onInputChange(e)}
                                                                                                            sx={{
                                                                                                                'input': {
                                                                                                                    '&::placeholder': {
                                                                                                                        fontSize: 16,
                                                                                                                    }
                                                                                                                },
                                                                                                            }}
                                                                                                            placeholder="CCCD / DKSH"
                                                                                                            variant="outlined"
                                                                                                            value={authority.cccd}
                                                                                                        />
                                                                                                    </Box>
                                                                                                </Box>
                                                                                                <Box
                                                                                                    className="col-xxl-12">

                                                                                                    <TextField
                                                                                                        className="form-control"
                                                                                                        fullWidth
                                                                                                        name="phone_number"
                                                                                                        type='text'
                                                                                                        onChange={e => onInputChange(e)}
                                                                                                        sx={{
                                                                                                            'input': {
                                                                                                                '&::placeholder': {
                                                                                                                    fontSize: 16,
                                                                                                                }
                                                                                                            },
                                                                                                        }}
                                                                                                        placeholder="Số điện thoại"
                                                                                                        value={authority.phone_number}
                                                                                                    />
                                                                                                </Box>
                                                                                                <Box
                                                                                                    className="col-xxl-12">
                                                                                                    <TextField
                                                                                                        className="form-control"
                                                                                                        fullWidth
                                                                                                        name="email"
                                                                                                        type='email'
                                                                                                        onChange={e => onInputChange(e)}
                                                                                                        sx={{
                                                                                                            'input': {
                                                                                                                '&::placeholder': {
                                                                                                                    fontSize: 16,
                                                                                                                }
                                                                                                            },
                                                                                                        }}
                                                                                                        placeholder="Email"
                                                                                                        value={authority.email}
                                                                                                    />
                                                                                                </Box>

                                                                                                <Box
                                                                                                    className="col-xxl-12">
                                                                                                    <TextField
                                                                                                        className="form-control"
                                                                                                        fullWidth
                                                                                                        name="password"
                                                                                                        type='password'
                                                                                                        required
                                                                                                        onChange={e => onInputChange(e)}
                                                                                                        sx={{
                                                                                                            'input': {
                                                                                                                '&::placeholder': {
                                                                                                                    fontSize: 16,
                                                                                                                }
                                                                                                            },
                                                                                                        }}
                                                                                                        placeholder="Mật khẩu"
                                                                                                        variant="outlined"
                                                                                                        value={authority.password}
                                                                                                    />
                                                                                                </Box>
                                                                                                <Box
                                                                                                    className="col-xxl-12">
                                                                                                    <TextField
                                                                                                        className="form-control"
                                                                                                        fullWidth
                                                                                                        name="organization"
                                                                                                        type='text'
                                                                                                        onChange={e => onInputChange(e)}
                                                                                                        sx={{
                                                                                                            'input': {
                                                                                                                '&::placeholder': {
                                                                                                                    fontSize: 16,
                                                                                                                }
                                                                                                            },
                                                                                                        }}
                                                                                                        placeholder="Chức vụ"
                                                                                                        value={authority.organization}
                                                                                                    />
                                                                                                </Box>

                                                                                                <Box
                                                                                                    className="modal-body text-center">_
                                                                                                    <Box
                                                                                                        className="mt-4 pt-4">
                                                                                                        <button
                                                                                                            className="btn btn-light bg-gradient waves-effect waves-light"
                                                                                                            data-bs-dismiss="modal"
                                                                                                            style={{marginRight: 22}}>
                                                                                                            Hủy bỏ
                                                                                                        </button>
                                                                                                        <button
                                                                                                            className="btn btn-success bg-gradient waves-effect waves-light"
                                                                                                            onClick={() => editAuthority()}>
                                                                                                            Cập nhật
                                                                                                        </button>
                                                                                                    </Box>
                                                                                                </Box>
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
                                                        <Pagination linkPage={linkPage} pageCurrent={pageCurrent}
                                                                    pageLast={pageLast}
                                                                    getListData={getListData}/>
                                                    </Box>
                                                </Box>
                                            </Box>

                                        </Box>
                                    </Box>
                                    <Box className="tab-pane fade" id="activities" role="tabpanel">
                                        <Box className="card">
                                            <Box className="card-body">
                                                <h5 className="card-title mb-3">Thiết lập nội dung ủy quyền pending</h5>

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

export default Authority3;

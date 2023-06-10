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
    const params = new URLSearchParams(window.location.search);
    const [id, setId] = useState(params.get('id') || "");
    //paginate
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageLast, setPageLast] = useState(1);
    const [linkPage, setLinkPage] = useState([]);
    //props
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [authority, setAuthor] = useState({});

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
        AuthorityService.getUserAuthorByShareHolder(page)
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

    const getListById = (idObject) => {
        setLoading(true);
        AuthorityService.getListById(idObject)
            .then(data => {
                console.log('data', data);
                setLoading(false);
                if (data.status == 1) {
                    setAuthor(data?.data);
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
    useEffect(() => {
        getListById(params.get('id') || "");
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
                                <h4 className="mb-sm-0">Thêm người được ủy quyền</h4>
                                <Box className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#">Thêm người được ủy quyền</a>
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
                                                        <h3 className="card-title mb-0 flex-grow-1">Thông tin cổ đông</h3>
                                                    </Box>
                                                    <Box className="card-body">
                                                            <Box className="row">
                                                                <Box className="col-xl-4">
                                                                    <Box className="mb-3">
                                                                        <label htmlFor="cleave-date" className="form-label">Họ tên</label>
                                                                        <TextField
                                                                            className="form-control input"
                                                                            fullWidth
                                                                            type='text'
                                                                            name="name"
                                                                            disabled
                                                                            variant="outlined"
                                                                            sx={{
                                                                                'input': {
                                                                                    '&::placeholder': {
                                                                                        fontSize: 16,
                                                                                    },
                                                                                },
                                                                            }}
                                                                            value={authority.name}
                                                                        />
                                                                    </Box>
                                                                </Box>
                                                                <Box className="col-xl-4">
                                                                    <Box className="mb-3">
                                                                        <label htmlFor="cleave-date-format" className="form-label">Số điện thoại</label>
                                                                        <TextField
                                                                            className="form-control input"
                                                                            fullWidth
                                                                            type='text'
                                                                            disabled
                                                                            sx={{
                                                                                'input': {
                                                                                    '&::placeholder': {
                                                                                        fontSize: 16,
                                                                                    }
                                                                                },
                                                                            }}
                                                                            value={authority.phone_number}
                                                                        />
                                                                    </Box>
                                                                </Box>
                                                                <Box className="col-xl-4">
                                                                    <Box className="mb-3">
                                                                        <label htmlFor="cleave-date-format" className="form-label">CCCD/DKSH</label>
                                                                        <TextField
                                                                            className="form-control input"
                                                                            fullWidth
                                                                            type='text'
                                                                            disabled
                                                                            sx={{
                                                                                'input': {
                                                                                    '&::placeholder': {
                                                                                        fontSize: 16,
                                                                                    }
                                                                                },
                                                                            }}
                                                                            value={authority.cccd}
                                                                        />
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        <Box className="row">
                                                            <Box className="col-xl-4">
                                                                <Box className="mb-3">
                                                                    <label htmlFor="cleave-date" className="form-label">Ngày cấp</label>
                                                                    <TextField
                                                                        className="form-control input"
                                                                        fullWidth
                                                                        type='text'
                                                                        disabled
                                                                        sx={{
                                                                            'input': {
                                                                                '&::placeholder': {
                                                                                    fontSize: 16,
                                                                                }
                                                                            },
                                                                        }}
                                                                        value={authority.date_range}
                                                                    />
                                                                </Box>
                                                            </Box>
                                                            <Box className="col-xl-4">
                                                                <Box className="mb-3">
                                                                    <label htmlFor="cleave-date-format" className="form-label">Nơi cấp</label>
                                                                    <TextField
                                                                        className="form-control input"
                                                                        fullWidth
                                                                        type='text'
                                                                        disabled
                                                                        sx={{
                                                                            'input': {
                                                                                '&::placeholder': {
                                                                                    fontSize: 16,
                                                                                }
                                                                            },
                                                                        }}
                                                                        value={authority.issued_by}
                                                                    />
                                                                </Box>
                                                            </Box>
                                                            <Box className="col-xl-4">
                                                                <Box className="mb-3">
                                                                    <label htmlFor="cleave-date-format" className="form-label">Cổ phần</label>
                                                                    <TextField
                                                                        className="form-control input"
                                                                        fullWidth
                                                                        type='text'
                                                                        disabled
                                                                        sx={{
                                                                            'input': {
                                                                                '&::placeholder': {
                                                                                    fontSize: 16,
                                                                                }
                                                                            },
                                                                        }}
                                                                        value={authority.totalALL}
                                                                    />
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>

                                            <Box className="col-xl-12">
                                                <Box className="card">
                                                    <Box className="card-header align-items-center d-flex">
                                                        <h4 className="card-title mb-0 flex-grow-1">Danh sách người được ủy quyền</h4>

                                                        <Link to={"/them-moi-uy-quyen?id=" + id}
                                                              className="btn btn-info squer-btn mt-2 mr-2 sm-btn"
                                                              data-bs-toggle="modal"
                                                              data-bs-target="#exampleModalgrid"
                                                        ><i
                                                            className={"fas fa-plus"}
                                                            style={{marginTop: "0px !important"}}></i> Thêm được người ủy quyền
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
                                                                            <Box className="row">
                                                                            <Box className="col-xxl-6">
                                                                                <Box>
                                                                                    <label htmlFor="cleave-date-format" className="form-label">CMND/CCCD (Tài khoản)</label>
                                                                                    <TextField
                                                                                        className="form-control"
                                                                                        fullWidth
                                                                                        name="name"
                                                                                        type='text'
                                                                                        required
                                                                                        disable
                                                                                        onChange={e => onInputChange(e)}
                                                                                        sx={{
                                                                                            'input': {
                                                                                                '&::placeholder': {
                                                                                                    fontSize: 16,
                                                                                                }
                                                                                            },
                                                                                        }}
                                                                                        variant="outlined"
                                                                                        value=""
                                                                                    />
                                                                                </Box>
                                                                            </Box>
                                                                            <Box className="col-xxl-6">
                                                                                <Box>
                                                                                    <label htmlFor="cleave-date-format" className="form-label">Họ tên người được ủy quyền</label>
                                                                                    <TextField
                                                                                        className="form-control"
                                                                                        fullWidth
                                                                                        name="cccd"
                                                                                        type='text'
                                                                                        required
                                                                                        disable
                                                                                        onChange={e => onInputChange(e)}
                                                                                        sx={{
                                                                                            'input': {
                                                                                                '&::placeholder': {
                                                                                                    fontSize: 16,
                                                                                                }
                                                                                            },
                                                                                        }}
                                                                                        variant="outlined"
                                                                                        value=''
                                                                                    />
                                                                                </Box>
                                                                            </Box>
                                                                            </Box>
                                                                            <Box className="row">
                                                                            <Box className="col-xxl-6">
                                                                                <label htmlFor="cleave-date-format" className="form-label">Số điện thoại</label>
                                                                                <TextField
                                                                                    className="form-control"
                                                                                    fullWidth
                                                                                    name="phone_number"
                                                                                    type='text'
                                                                                    disable
                                                                                    onChange={e => onInputChange(e)}
                                                                                    sx={{
                                                                                        'input': {
                                                                                            '&::placeholder': {
                                                                                                fontSize: 16,
                                                                                            }
                                                                                        },
                                                                                    }}
                                                                                    value=''
                                                                                />
                                                                            </Box>
                                                                            <Box className="col-xxl-6">
                                                                                <label htmlFor="cleave-date-format" className="form-label">Email</label>
                                                                                <TextField
                                                                                    className="form-control"
                                                                                    fullWidth
                                                                                    name="email"
                                                                                    type='email'
                                                                                    disable
                                                                                    onChange={e => onInputChange(e)}
                                                                                    sx={{
                                                                                        'input': {
                                                                                            '&::placeholder': {
                                                                                                fontSize: 16,
                                                                                            }
                                                                                        },
                                                                                    }}
                                                                                    value=''
                                                                                />
                                                                            </Box>
                                                                            </Box>
                                                                            <Box className="row">
                                                                            <Box className="col-xxl-6">
                                                                                <label htmlFor="cleave-date-format" className="form-label">Số cổ phần còn lại</label>
                                                                                <TextField
                                                                                    className="form-control"
                                                                                    fullWidth
                                                                                    name="password"
                                                                                    type='password'
                                                                                    required
                                                                                    disable
                                                                                    onChange={e => onInputChange(e)}
                                                                                    sx={{
                                                                                        'input': {
                                                                                            '&::placeholder': {
                                                                                                fontSize: 16,
                                                                                            }
                                                                                        },
                                                                                    }}
                                                                                    variant="outlined"
                                                                                    value=""
                                                                                />
                                                                            </Box>
                                                                            <Box className="col-xxl-6">
                                                                                <label htmlFor="cleave-date-format" className="form-label">Mật khẩu</label>
                                                                                <TextField
                                                                                    className="form-control"
                                                                                    fullWidth
                                                                                    name="password"
                                                                                    type='password'
                                                                                    disable
                                                                                    onChange={e => onInputChange(e)}
                                                                                    sx={{
                                                                                        'input': {
                                                                                            '&::placeholder': {
                                                                                                fontSize: 16,
                                                                                            }
                                                                                        },
                                                                                    }}
                                                                                    value=""
                                                                                />
                                                                            </Box>
                                                                            </Box>
                                                                            <Box className="modal-body text-center">
                                                                                <Box className="mt-4 pt-4">
                                                                                    <button
                                                                                        className="btn btn-light bg-gradient waves-effect waves-light"
                                                                                        data-bs-dismiss="modal"
                                                                                        style={{marginRight: 22}}>
                                                                                        Hủy bỏ
                                                                                    </button>
                                                                                    <button
                                                                                        className="btn btn-success bg-gradient waves-effect waves-light"
                                                                                    >
                                                                                        Thêm
                                                                                    </button>
                                                                                </Box>
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>

                                                    </Box>
                                                    <Box className="card-body">
                                                        <Box className="table-responsive table-card mb-3">
                                                            <table
                                                                className="table table-borderless table-hover table-nowrap align-middle mb-0">
                                                                <thead className="table-light">
                                                                <tr className="text-muted">
                                                                    <th scope="col">Stt</th>
                                                                    <th scope="col">Tên cổ đông</th>
                                                                    <th scope="col">CMND/CCCD</th>
                                                                    <th scope="col">Số điện thoại</th>
                                                                    <th scope="col">Cổ phần ủy quyền</th>
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
                                                                             <span
                                                                                 className="badge badge-soft-secondary p-2">
                                                                            {helpers.formatNumber(i.total_authority)}
                                                                             </span>
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

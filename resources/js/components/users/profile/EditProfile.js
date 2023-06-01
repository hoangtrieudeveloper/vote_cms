import React, {Component, useEffect, useState} from 'react';
import {
    Box,
    Typography,
    TextField
} from "@mui/material";
import {userService} from "../../../model/userService";
import Loading from "../../pages/Loading";
import ToastNotifi from "../../pages/ToastNotifi";
import Helpers from "../../pages/Helpers";
import LoadingButton from "@mui/lab/LoadingButton";

function EditProfile() {
    const [data, setData] = useState(JSON.parse(localStorage.getItem('user')) || '');
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState({
        old_pass: "",
        new_pass: "",
        new_pass_1: "",
    });
    const [user, setUser] = useState({
        name: data.name,
        phone: data.phone_number,
        address: data.address,
    });


    const {
        name,
        phone,
        address,
    } = report;
    const onInputChangeProfile = e => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const {
        old_pass,
        new_pass,
        new_pass_1,
    } = report;
    const onInputChange = e => {
        setReport({...report, [e.target.name]: e.target.value});
    };

    async function UpdateProfile() {
        if (user.name === '') {
            Helpers.showToast('error', 'Vui lòng nhập tên1');
        } else if (user.phone === '') {
            Helpers.showToast('error', 'Vui lòng nhập số điện thoại!');
        } else if (user.address === '') {
            Helpers.showToast('error', 'Vui lòng nhập địa chỉ!');
        } else {
            setLoading(true);
            userService.UpdateProfile(user)
                .then(
                    data => {
                        setLoading(false);
                        if (data?.status == 1) {
                            Helpers.showToast('success', data?.mess);
                        } else {
                            Helpers.showToast('error', data?.mess);
                        }
                    }
                );
        }
    }

    async function ChangePassword() {
        if (report.old_pass === '') {
            Helpers.showToast('error', 'Vui lòng nhập mật khẩu cũ!');
        } else if (report.new_pass === '') {
            Helpers.showToast('error', 'Vui lòng nhập mật khẩu mới!');
        } else if (report.new_pass_1 === '') {
            Helpers.showToast('error', 'Vui lòng nhập xác nhận mật khẩu mới!');
        } else {
            setLoading(true);
            userService.changePassword(report)
                .then(
                    data => {
                        setLoading(false);
                        if (data?.status == 1) {
                            Helpers.showToast('success', data?.mess);
                            setReport({
                                old_pass: "",
                                new_pass: "",
                                new_pass_1: "",
                            })
                        } else {
                            Helpers.showToast('error', data?.mess);
                        }
                    }
                );
        }
    }

    //useEffect
    useEffect(() => {
    }, []);

    return (<Box>
            <Box className="main-content">
                <ToastNotifi></ToastNotifi>
                <Loading load={loading}></Loading>
                <Box className="page-content">
                    <Box className="container-fluid">
                        <Box className="row">
                            <Box className="col-12">
                                <Box className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <Box className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="#">CẬP NHẬT THÔNG TIN CÁ NHÂN</a>
                                            </li>
                                        </ol>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="row">
                            <Box className="col-lg-12">
                                <Box className="card">
                                    <Box className="card-header">
                                        <h4 className="card-title mb-0 text-center">CẬP NHẬT THÔNG TIN CÁ NHÂN</h4>
                                    </Box>
                                    <Box className="row">
                                        <Box className="col-xxl-3">
                                            <Box className="card card-bg-fill">
                                                <Box className="card-body p-4">
                                                    <Box className="text-center">
                                                        <Box
                                                            className="profile-user position-relative d-inline-block mx-auto  mb-4">
                                                            <img src="assets/images/users/avatar-1.jpg"
                                                                 className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                                                 alt="user-profile-image"/>
                                                            <Box
                                                                className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                                                <TextField id="profile-img-file-input" type="file"
                                                                           className="profile-img-file-input"/>
                                                                <label htmlFor="profile-img-file-input"
                                                                       className="profile-photo-edit avatar-xs">
                                                    <span className="avatar-title rounded-circle bg-light text-body">
                                                        <i className="ri-camera-fill"></i>
                                                    </span>
                                                                </label>
                                                            </Box>
                                                        </Box>
                                                        <h5 className="fs-16 mb-1">{data.name}</h5>
                                                        <p className="text-muted mb-0">{data.email}</p>
                                                    </Box>
                                                </Box>
                                            </Box>

                                            {data.company_name != '' &&
                                                <Box className="card">
                                                    <Box className="card-body">
                                                        <Box className="d-flex align-items-center mb-4">
                                                            <Box className="flex-grow-1">
                                                                <h5 className="card-title mb-0">Thông tin</h5>
                                                            </Box>
                                                        </Box>
                                                        <Box className="mb-3 d-flex">
                                                            <Box className="avatar-xs d-block flex-shrink-0 me-3">
                                            <span className="avatar-title rounded-circle fs-16 bg-dark text-light">
                                            <i className="ri-github-fill"></i>
                                            </span>
                                                            </Box>
                                                            <TextField
                                                                className="form-control"
                                                                fullWidth
                                                                name="name"
                                                                type='text'
                                                                required
                                                                onChange={e => onInputChangeProfile(e)}
                                                                sx={{
                                                                    'input': {
                                                                        '&::placeholder': {
                                                                            fontSize: 16,
                                                                        }
                                                                    },
                                                                }}
                                                                variant="outlined"
                                                                disabled
                                                                value={data.company_name}
                                                            />
                                                        </Box>
                                                        <Box className="mb-3 d-flex">
                                                            <Box className="avatar-xs d-block flex-shrink-0 me-3">
                                            <span className="avatar-title rounded-circle fs-16 bg-primary">
                                                <i className="ri-global-fill"></i>
                                            </span>
                                                            </Box>
                                                            <TextField
                                                                className="form-control"
                                                                type='text'
                                                                sx={{
                                                                    'input': {
                                                                        '&::placeholder': {
                                                                            fontSize: 16,
                                                                        }
                                                                    },
                                                                }}
                                                                disabled
                                                                value={data.company_phone}
                                                            />
                                                        </Box>
                                                        <Box className="mb-3 d-flex">
                                                            <Box className="avatar-xs d-block flex-shrink-0 me-3">
                                            <span className="avatar-title rounded-circle fs-16 bg-success">
                                                <i className="ri-dribbble-fill"></i>
                                            </span>
                                                            </Box>
                                                            <TextField
                                                                className="form-control"
                                                                type='text'
                                                                sx={{
                                                                    'input': {
                                                                        '&::placeholder': {
                                                                            fontSize: 16,
                                                                        }
                                                                    },
                                                                }}
                                                                disabled
                                                                value={data.company_header}
                                                            />
                                                        </Box>
                                                        <Box className="d-flex">
                                                            <Box className="avatar-xs d-block flex-shrink-0 me-3">
                                            <span className="avatar-title rounded-circle fs-16 bg-danger">
                                                <i className="ri-pinterest-fill"></i>
                                            </span>
                                                            </Box>
                                                            <TextField
                                                                className="form-control"
                                                                type='text'
                                                                sx={{
                                                                    'input': {
                                                                        '&::placeholder': {
                                                                            fontSize: 16,
                                                                        }
                                                                    },
                                                                }}
                                                                disabled
                                                                value={data.company_fax}
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            }
                                        </Box>
                                        <Box className="col-xxl-9">
                                            <Box className="card">
                                                <Box className="card-header">
                                                    <ul className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0"
                                                        role="tablist">
                                                        <li className="nav-item">
                                                            <a className="nav-link active" data-bs-toggle="tab"
                                                               href="#personalDetails" role="tab">
                                                                <i className="fas fa-home"></i> Thông tin cá nhân
                                                            </a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" data-bs-toggle="tab"
                                                               href="#changePassword"
                                                               role="tab">
                                                                <i className="far fa-user"></i> Đổi mật khẩu
                                                            </a>
                                                        </li>

                                                    </ul>
                                                </Box>

                                                <Box className="card-body p-4">
                                                    <Box className="tab-content">
                                                        <Box className="tab-pane active" id="personalDetails"
                                                             role="tabpanel">
                                                            <form action="javascript:void(0);">
                                                                <Box className="row">
                                                                    <Box className="col-lg-6">
                                                                        <Box className="mb-3">
                                                                            <label htmlFor="firstnameInput"
                                                                                   className="form-label">Tên*</label>
                                                                            <TextField
                                                                                className="form-control"
                                                                                fullWidth
                                                                                name="name"
                                                                                type='text'
                                                                                required
                                                                                onChange={e => onInputChangeProfile(e)}
                                                                                sx={{
                                                                                    'input': {
                                                                                        '&::placeholder': {
                                                                                            fontSize: 16,
                                                                                        }
                                                                                    },
                                                                                }}
                                                                                label="Nhập Tên"
                                                                                variant="outlined"
                                                                                value={user.name}
                                                                            />
                                                                        </Box>
                                                                    </Box>
                                                                    <Box className="col-lg-6">
                                                                        <Box className="mb-3">
                                                                            <label htmlFor="lastnameInput"
                                                                                   className="form-label">Số điện
                                                                                thoại*</label>
                                                                            <TextField
                                                                                className="form-control"
                                                                                fullWidth
                                                                                name="phone"
                                                                                type='number'
                                                                                required
                                                                                onChange={e => onInputChangeProfile(e)}
                                                                                sx={{
                                                                                    'input': {
                                                                                        '&::placeholder': {
                                                                                            fontSize: 16,
                                                                                        }
                                                                                    },
                                                                                }}
                                                                                label="Nhập số điện thoại"
                                                                                variant="outlined"
                                                                                value={user.phone}
                                                                            />
                                                                        </Box>
                                                                    </Box>
                                                                    <Box className="col-lg-6">
                                                                        <Box className="mb-3">
                                                                            <label htmlFor="phonenumberInput"
                                                                                   className="form-label">Địa
                                                                                chỉ*</label>
                                                                            <TextField
                                                                                className="form-control"
                                                                                fullWidth
                                                                                name="address"
                                                                                type='text'
                                                                                required
                                                                                onChange={e => onInputChangeProfile(e)}
                                                                                sx={{
                                                                                    'input': {
                                                                                        '&::placeholder': {
                                                                                            fontSize: 16,
                                                                                        }
                                                                                    },
                                                                                }}
                                                                                label="Nhập địa chỉ"
                                                                                variant="outlined"
                                                                                value={user.address}
                                                                            />
                                                                        </Box>
                                                                    </Box>
                                                                    <Box className="col-lg-12">
                                                                        <Box className="text-center">
                                                                            <LoadingButton
                                                                                onClick={UpdateProfile}
                                                                                className="ad-btn ad-login-member bg-success mt-3"
                                                                                variant="outlined"
                                                                                startIcon={<i
                                                                                    className="mdi mdi-plus"></i>}
                                                                                loading={loading}
                                                                                disabled={loading}
                                                                                sx={{
                                                                                    color: 'white',
                                                                                    fontSize: 13,
                                                                                    fontWeight: 400,
                                                                                }}
                                                                            >
                                                                                {!loading ? 'Cập nhật' : ''}
                                                                            </LoadingButton>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </form>
                                                        </Box>
                                                        <Box className="tab-pane" id="changePassword" role="tabpanel">
                                                            <form action="javascript:void(0);">
                                                                <Box className="row g-2">
                                                                    <Box className="col-lg-6">
                                                                        <Box>
                                                                            <label
                                                                                className="form-label">Mật khẩu
                                                                                cũ*</label>
                                                                            <TextField
                                                                                className="form-control"
                                                                                fullWidth
                                                                                name="old_pass"
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
                                                                                label="Nhập mật khẩu cũ"
                                                                                variant="outlined"
                                                                                value={report.old_pass}
                                                                            />
                                                                        </Box>
                                                                    </Box>
                                                                    <Box className="col-lg-6">
                                                                        <Box>
                                                                            <label
                                                                                className="form-label">Mật khẩu
                                                                                mới*</label>
                                                                            <TextField
                                                                                className="form-control"
                                                                                fullWidth
                                                                                name="new_pass"
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
                                                                                label="Nhập mật khẩu mới"
                                                                                variant="outlined"
                                                                                value={report.new_pass}
                                                                            />
                                                                        </Box>
                                                                    </Box>
                                                                    <Box className="col-lg-6">
                                                                        <Box>
                                                                            <label
                                                                                className="form-label">Xác nhận mật khẩu
                                                                                mới*</label>
                                                                            <TextField
                                                                                className="form-control"
                                                                                fullWidth
                                                                                name="new_pass_1"
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
                                                                                label="Xác nhận mật khẩu mới"
                                                                                variant="outlined"
                                                                                value={report.new_pass_1}
                                                                            />
                                                                        </Box>
                                                                    </Box>
                                                                    <Box className="col-lg-12">
                                                                        <Box className="text-center">
                                                                            <LoadingButton
                                                                                onClick={ChangePassword}
                                                                                className="ad-btn ad-login-member bg-success mt-3"
                                                                                variant="outlined"
                                                                                startIcon={<i
                                                                                    className="mdi mdi-plus"></i>}
                                                                                loading={loading}
                                                                                disabled={loading}
                                                                                sx={{
                                                                                    color: 'white',
                                                                                    fontSize: 13,
                                                                                    fontWeight: 400,
                                                                                }}
                                                                            >
                                                                                {!loading ? 'Cập nhật' : ''}
                                                                            </LoadingButton>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </form>
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
                </Box>
            </Box>
        </Box>
    )
}

export default EditProfile;

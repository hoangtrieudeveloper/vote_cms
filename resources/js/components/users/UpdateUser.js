import React, {Component, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
} from "@mui/material";
import {Link, useHistory} from 'react-router-dom';
import LoadingButton from "@mui/lab/LoadingButton";
import {userService} from "../../model/userService";
import MenuItem from "@mui/material/MenuItem";
import Loading from "../pages/Loading";
import ToastNotifi from "../pages/ToastNotifi";
import {toast} from "react-toastify";
import Helpers from "../pages/Helpers";

function UpdateUser() {
    const params = new URLSearchParams(window.location.search);
    const [idObject, setIdObject] = useState({
        id: params.get('id') || "",
    });
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [objectCustomer, setObjectCustomer] = useState('');
    const [errors, setErrors] = useState('');
    const [user, setUser] = useState({
        id: idObject?.id,
        name: "",
        email: "",
        password: '',
        phone: "",
        role: ""
    });

    const {id, name, email, password, phone, role} = user;
    const onInputChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    async function UpdateCustomer() {
        const regexp = /^\d{10,11}$/;
        const checkingResult = regexp.exec(user.phone);
        if (user.password !== '' && user.password.length < 6) {
            Helpers.showToast('error', 'Mật khẩu không được nhỏ hơn 6 ký tự!');
        } else if (user.name.length < 6) {
            Helpers.showToast('error', 'Họ tên không được nhỏ hơn 6 ký tự!');
        } else if (user.email === '') {
            Helpers.showToast('error', 'Vui lòng nhập Email!');
        } else if (user.email.length < 5) {
            Helpers.showToast('error', 'Email không được nhỏ hơn 5 ký tự!');
        } else if (user.email.split("").filter((x) => x === "@").length !== 1) {
            Helpers.showToast('error', 'Nhập đúng định dạng Email!');
        } else if (user.email.indexOf(".") === -1) {
            Helpers.showToast('error', 'Nhập đúng định dạng Email!');
        } else if (checkingResult === null) {
            Helpers.showToast('error', 'Số điện thoại phải từ 10-11 số!');
        } else {
            setLoading(true);
            userService.updateUser(user)
                .then(
                    data => {
                        setLoading(false);
                        if (data?.status == 1) {
                            Helpers.showToast('success', data?.messager);
                            setUser({name: "", email: "", password: "", phone: "", role: ""});
                            getInfoCustomer(idObject);
                        } else {
                            Helpers.showToast('error', data?.messager);
                        }
                    }
                );
        }
    }

    const onEnterKey = (e) => {
        if (e.key === "Enter") {
            UpdateCustomer();
        }
    }
    const getInfoCustomer = (id) => {
        userService.getByIdUser(id)
            .then(
                data => {
                    if (data.status == 1) {
                        setObjectCustomer(data.data);
                        setDataList(data.group);
                        setUser({
                            id: idObject?.id,
                            name: data?.data?.name,
                            email: data?.data?.email,
                            password: '',
                            phone: data?.data?.phone_number,
                            role: data?.data?.group_scope,
                        })
                    }
                }
            );
    }
    //useEffect
    useEffect(() => {
        setIdObject({id: params.get('id')})
        getInfoCustomer(idObject);
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
                                <Link to="/listuser"
                                      className="btn btn-info squer-btn mt-2 mr-2 sm-btn"><i
                                    className={"fas fa-arrow-left"}></i> Quay lại
                                </Link>
                                <Box className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#">Nhân viên</a></li>
                                        <li className="breadcrumb-item active">Cập nhật</li>
                                    </ol>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="row">
                        <Box className="col-lg-12">
                            <Box className="card">
                                <Box className="card-header">
                                    <h4 className="card-title mb-0">Cập nhật nhân viên</h4>
                                </Box>
                                <Box className="card-body">
                                    <Box>
                                        <Box className="row">
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <label htmlFor="cleave-date" className="form-label">Nhập họ
                                                        tên <Typography variant="span"
                                                                        color="red">*</Typography></label>
                                                    <TextField
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
                                                        label="Họ tên"
                                                        variant="outlined"
                                                        value={user.name}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <label htmlFor="cleave-date-format" className="form-label">Nhập
                                                        Email <Typography variant="span"
                                                                          color="red">*</Typography></label>
                                                    <TextField
                                                        fullWidth
                                                        name="email"
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
                                                        label="Nhập Email"
                                                        variant="outlined"
                                                        value={user.email}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="row">
                                        <Box className="col-xl-6">
                                            <Box className="mb-3">
                                                <label htmlFor="cleave-time" className="form-label">Nhập mật
                                                    khẩu <Typography variant="span"
                                                                     color="red">*</Typography></label>
                                                <TextField
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
                                                    value={user.password}
                                                />
                                            </Box>
                                        </Box>
                                        <Box className="col-xl-6">
                                            <Box className="mb-3">
                                                <label htmlFor="cleave-time-format" className="form-label">Nhập số
                                                    điện thoại <Typography variant="span"
                                                                           color="red">*</Typography></label>
                                                <TextField
                                                    fullWidth
                                                    name="phone"
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
                                                    label="Số điện thoại"
                                                    variant="outlined"
                                                    value={user.phone}
                                                    onKeyPress={e => onEnterKey(e)}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="row">
                                        <Box className="col-xl-6">
                                            <Box className="mb-3">
                                                <label htmlFor="cleave-ccard" className="form-label">Nhóm
                                                    quyền</label>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-select-currency"
                                                    select
                                                    label="Select"
                                                    name="role"
                                                    // value={currency}
                                                    onChange={e => onInputChange(e)}
                                                    value={user.role}
                                                    // helperText="Vui lòng lựa chọn Bucket"
                                                >
                                                    {dataList.map((option) => (
                                                        <MenuItem key={option.id} value={option.id}>
                                                            {option.group_name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Box>
                                        </Box>
                                        <Box className="row">
                                            <Box className="col-xl-6">
                                                <Box className="mb-3 mb-xl-0">
                                                    <Box>
                                                        <LoadingButton
                                                            onClick={UpdateCustomer}
                                                            className="ad-btn ad-login-member"
                                                            variant="outlined"
                                                            loading={loading}
                                                            disabled={loading}
                                                            sx={{
                                                                backgroundColor: '#11a1fd',
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
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>)
}

export default UpdateUser;

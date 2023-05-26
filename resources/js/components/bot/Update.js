import React, {Component, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
} from "@mui/material";
import {Link, useHistory} from 'react-router-dom';
import LoadingButton from "@mui/lab/LoadingButton";
import {botService} from "../../model/botService";
import Loading from "../pages/Loading";
import ToastNotifi from "../pages/ToastNotifi";
import {toast} from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Helpers from "../pages/Helpers";
import GlobalSetting from "../pages/GlobalSetting";
import {userService} from "../../model/userService";

const listGender = [
    {
        value: 'Female', label: 'Nữ',
    },
    {
        value: 'Male', label: 'Nam',
    }
];
const listStatus = [
    {
        value: 1, label: 'Hoạt động',
    },
    {
        value: 0, label: 'Không hoạt động',
    }
];

function Update() {
    const params = new URLSearchParams(window.location.search);
    const [idObject, setIdObject] = useState({
        id: params.get('id') || "",
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(1);
    const [gender, setGender] = useState('Female');
    const [description, setDescription] = useState('');
    const [user, setUser] = useState({
        id: "",
        name: "",
        age: "",
        national: "",
        height: "",
        weight: "",
        gender: "",
        status: "",
        description: ""
    });

    const {id, name, age, national, height, weight} = user;
    const onInputChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    };
    const [listFile, setListFile] = useState([]);
    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        userService.uploadFileAction(file)
            .then(data => {
                setListFile([...listFile, data]);
            });
    }
    const removeFile = (index) => {
        let b = listFile.filter((item, idx) => idx !== index);
        setListFile(b);
    }

    const [fileAvatar, setFileAvatar] = useState('');
    const handleUploadImageAvatar = (e) => {
        const file = e.target.files[0];
        userService.uploadFileAction(file)
            .then(data => {
                setFileAvatar(data);
            });
    }
    const removeFileAVatar = () => {
        setFileAvatar('');
    }
    async function UpdateCustomer() {
        if (user.name.length < 6) {
            Helpers.showToast('error', 'Họ tên không được nhỏ hơn 6 ký tự!');
        } else {
            setLoading(true);
            user.gender = gender;
            user.status = status;
            user.description = description;
            user.image = JSON.stringify(listFile);
            user.avatar = fileAvatar;
            botService.update(user)
                .then(
                    data => {
                        setLoading(false);
                        if (data?.status == 1) {
                            toast.success(data?.messager, {
                                theme: "colored",
                                position: "bottom-right",
                                autoClose: 5000,
                            });
                        } else {
                            toast.error(data?.messager, {
                                theme: "colored",
                                position: "bottom-right",
                                autoClose: 5000,
                            });
                        }
                    }
                );
        }
    }

    const getInfoBot = (id) => {
        botService.getById(id)
            .then(
                data => {
                    if (data.status == 1) {
                        setListFile(data?.data?.image ? JSON.parse(data?.data?.image) : []);
                        setFileAvatar(data?.data?.avatar || '');
                        setUser({
                            id: idObject?.id,
                            name: data?.data?.name,
                            age: data?.data?.age,
                            national: data?.data?.national,
                            height: data?.data?.height,
                            weight: data?.data?.weight
                        });
                        setStatus(data?.data?.status);
                        setGender(data?.data?.gender);
                        setDescription(data?.data?.description);
                    }
                }
            );
    }
    //useEffect
    useEffect(() => {
        setIdObject({id: params.get('id')})
        getInfoBot(idObject);
    }, []);

    return (<Box>
        <Box className="page-wrapper">
            <Box className="main-content">
                <ToastNotifi></ToastNotifi>
                <Loading load={loading}></Loading>
                <Box className="row">
                    <Box className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <Box className="page-title-wrapper mb-0">
                            <Box className="page-title-box">
                                <Link to={"/index-bot"}
                                      className="btn btn-info squer-btn mt-2 mr-2 sm-btn"><i
                                    className={"fas fa-arrow-left"}></i> Quay lại
                                </Link>
                                <Typography color='#1F2738' variant='h5' sx={{
                                    lineHeight: 2.0,
                                    fontWeight: 700,
                                    pr: 2
                                }} className="page-title bold"> Cập nhật Bot</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="col-xl-12">
                        <Box className="card">
                            <Box className="card-content">
                                <Box className="card-body p-1">
                                    <Box className="ad-auth-form">
                                        <Box className="row">
                                            <Box className="ad-auth-feilds  col-md-6">
                                                <label htmlFor="member-email" className="col-form-label">Họ
                                                    tên <Typography variant="span" color="red">*</Typography></label>
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
                                            <Box className="ad-auth-feilds  col-md-6">
                                                <label htmlFor="member-email" className="col-form-label">
                                                    tuổi</label>
                                                <TextField
                                                    fullWidth
                                                    name="age"
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
                                                    label="Tuổi"
                                                    variant="outlined"
                                                    value={user.age}
                                                />
                                            </Box>
                                            <Box className="ad-auth-feilds  col-md-6">
                                                <label htmlFor="member-email" className="col-form-label">quốc
                                                    gia</label>
                                                <TextField
                                                    fullWidth
                                                    name="national"
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
                                                    label="Quốc gia"
                                                    variant="outlined"
                                                    value={user.national}
                                                />
                                            </Box>
                                            <Box className="ad-auth-feilds col-md-6">
                                                <label htmlFor="member-email" className="col-form-label">Giới
                                                    tính</label>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-select-currency"
                                                    select
                                                    required
                                                    label="Lựa chọn"
                                                    onChange={e => setGender(e.target.value)}
                                                    value={gender}
                                                >
                                                    {listGender.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Box>
                                            <Box className="ad-auth-feilds col-md-6">
                                                <label htmlFor="member-email" className="col-form-label">cân
                                                    nặng</label>
                                                <TextField
                                                    fullWidth
                                                    name="weight"
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
                                                    label="Cân nặng"
                                                    variant="outlined"
                                                    value={user.weight}
                                                />
                                            </Box>
                                            <Box className="ad-auth-feilds col-md-6">
                                                <label htmlFor="member-email" className="col-form-label">Trạng
                                                    thái</label>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-select-currency"
                                                    select
                                                    required
                                                    label="Lựa chọn"
                                                    onChange={e => setStatus(e.target.value)}
                                                    value={status}
                                                >
                                                    {listStatus.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Box>
                                            <Box className="ad-auth-feilds col-md-6">
                                                <label htmlFor="member-email" className="col-form-label">chiều
                                                    cao</label>
                                                <TextField
                                                    fullWidth
                                                    name="height"
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
                                                    label="Chiều cao"
                                                    variant="outlined"
                                                    value={user.height}
                                                />
                                            </Box>
                                            <Box className="ad-auth-feilds col-md-6">
                                                <label htmlFor="member-email" className="col-form-label">mô
                                                    tả</label>
                                                <TextareaAutosize
                                                    aria-label="empty textarea"
                                                    style={{width: '100%'}}
                                                    minRows={2}
                                                    onChange={e => setDescription(e.target.value)}
                                                    value={description}
                                                />
                                            </Box>
                                            <Box className="ad-auth-feilds col-md-6">
                                                <label htmlFor="member-email" className="col-form-label"></label>
                                                <Box>
                                                    <label onChange={handleUploadImage} htmlFor="formId"
                                                           className={"btn btn-primary mb-3"}>
                                                        <input name="" type="file" id="formId" hidden/>
                                                        <i className={"fas fa-plus"}></i> Thêm ảnh
                                                    </label>
                                                </Box>
                                                <Box className={"d-flex"}>
                                                    {listFile.length > 0 ? listFile.map((i, index) => (
                                                        <Box key={index}
                                                             className={"block-image d-flex"}>
                                                            <img src={GlobalSetting.url + i} alt=""
                                                                 style={{width: 100, height: 100}}/>
                                                            <Typography variant="subtitle1"
                                                                        onClick={() => removeFile(index)}
                                                                        sx={{cursor: 'pointer'}}>
                                                                <i className={"fa fa-trash text-danger"}></i>
                                                            </Typography>
                                                        </Box>
                                                    )) : ''}
                                                </Box>
                                            </Box>
                                            <Box className="ad-auth-feilds col-md-6">
                                                <label htmlFor="member-email" className="col-form-label"></label>
                                                <Box>
                                                    <label onChange={handleUploadImageAvatar} htmlFor="formIdavatar"
                                                           className={"btn btn-primary mb-3"}>
                                                        <input name="" type="file" id="formIdavatar" hidden/>
                                                        <i className={"fas fa-plus"}></i> Thêm ảnh avatar
                                                    </label>
                                                </Box>
                                                <Box className={"d-flex"}>
                                                    {fileAvatar !== '' && <Box className={"block-image d-flex"}>
                                                        <img src={GlobalSetting.url + fileAvatar} alt=""
                                                             style={{width: 100, height: 100}}/>
                                                        <Typography variant="subtitle1"
                                                                    onClick={() => removeFileAVatar()}
                                                                    sx={{cursor: 'pointer'}}>
                                                            <i className={"fa fa-trash text-danger"}></i>
                                                        </Typography>
                                                    </Box>
                                                    }
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={"juscontent-right"}>
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
    </Box>)
}

export default Update;

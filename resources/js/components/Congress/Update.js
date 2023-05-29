import React, {Component, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Typography,
    TextField
} from "@mui/material";
import {Link, useHistory} from 'react-router-dom';
import LoadingButton from "@mui/lab/LoadingButton";
import {congressService} from "../../model/congressService";
import Loading from "../pages/Loading";
import ToastNotifi from "../pages/ToastNotifi";
import Helpers from "../pages/Helpers";

function Update() {
    const params = new URLSearchParams(window.location.search);
    const [loading, setLoading] = useState(false);
    const [idObject, setIdObject] = useState({
        id: params.get('id') || "",
    });
    const [congress, setCongress] = useState({
        id: idObject?.id,
        name_vn: "",
        name_en: "",
        file_content_vn: "",
        file_content_en: "",
    });

    const {id,name_vn, name_en, file_content_vn, file_content_en, type, sort} = congress;
    const onInputChange = e => {
        setCongress({...congress, [e.target.name]: e.target.value});
    };

    async function UpdateCongress() {
        if (congress.name_vn === '') {
            Helpers.showToast('error', 'Vui lòng nhập tên nội dung!');
        } else if (congress.name_en === '') {
            Helpers.showToast('error', 'Vui lòng nhập tên nội dung (Tiếng Anh)!');
        } else {
            setLoading(true);
            congressService.update(congress)
                .then(
                    data => {
                        setLoading(false);
                        if (data?.status == 1) {
                            Helpers.showToast('success', data?.messager);
                            setCongress({name_vn: "", name_en: "", file_content_vn: "", file_content_en: ""});
                            getCongressById(idObject);
                        } else {
                            Helpers.showToast('error', data?.messager);
                        }
                    }
                );
        }
    }

    async function getCongressById(id) {
        congressService.getByIdCongress(id)
            .then(
                data => {
                    if (data.status == 1) {
                        setCongress({
                            id: idObject?.id,
                            name_vn: data?.data?.name_vn,
                            name_en: data?.data?.name_en,
                            file_content_vn: data?.data?.file_content_vn,
                            file_content_en: data?.data?.file_content_en,
                            sort: data?.data?.sort,
                        })
                    }
                }
            );
    }


    //useEffect
    useEffect(() => {
        setIdObject({id: params.get('id')})
        getCongressById(idObject);
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
                                <Link to="/khai-bao-thu-tuc-khai-mac"
                                      className="btn btn-info squer-btn mt-2 mr-2 sm-btn"><i
                                    className={"fas fa-arrow-left"}></i> Quay lại
                                </Link>
                                <Box className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#">KHAI BÁO THỦ TỤC KHAI MẠC</a></li>
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
                                    <h4 className="card-title mb-0">Cập nhật thủ tục khai mạc</h4>
                                </Box>
                                <Box className="card-body">
                                    <Box>
                                        <Box className="row">
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <label htmlFor="cleave-date" className="form-label">Tên nội
                                                        dung <Typography variant="span"
                                                                         color="red">*</Typography></label>
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="name_vn"
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
                                                        label="Tên nội dung"
                                                        variant="outlined"
                                                        value={congress.name_vn}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <label htmlFor="cleave-date-format" className="form-label">Tên nội
                                                        dung(Tiếng Anh)<Typography variant="span"
                                                                                   color="red">*</Typography></label>
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="name_en"
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
                                                        label="Nhập nội dung (Tiếng Anh)"
                                                        variant="outlined"
                                                        value={congress.name_en}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="row">
                                        <Box className="col-xl-6">
                                        </Box>
                                        <Box className="col-xl-6">
                                        </Box>
                                    </Box>
                                    <Box className="row">
                                        <Box className="col-xl-6">
                                        </Box>
                                        <Box className="row">
                                            <Box className="col-xl-6">
                                                <Box className="mb-3 mb-xl-0">
                                                    <Box className={"juscontent-right"}>
                                                        <LoadingButton
                                                            onClick={UpdateCongress}
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
        </Box>
    </Box>)
}

export default Update;

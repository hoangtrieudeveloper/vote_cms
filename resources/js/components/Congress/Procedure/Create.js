import React, {Component, useEffect, useState} from 'react';
import {
    Box,
    Typography,
    TextField
} from "@mui/material";
import {Link} from 'react-router-dom';
import LoadingButton from "@mui/lab/LoadingButton";
import {congressService} from "../../../model/congressService";
import Loading from "../../pages/Loading";
import ToastNotifi from "../../pages/ToastNotifi";
import Helpers from "../../pages/Helpers";
import helpers from "../../pages/Helpers";

function Create() {
    const params = new URLSearchParams(window.location.search);
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState({
        name_vn: "",
        name_en: "",
        file_content_vn: "",
        file_content_en: "",
    });

    const {name_vn, name_en, file_content_vn, file_content_en, type, sort} = report;
    const onInputChange = e => {
        setReport({...report, [e.target.name]: e.target.value});
    };
    async function CreateProcedure() {
        if (report.name_vn === '') {
            Helpers.showToast('error', 'Vui lòng nhập tên nội dung!');
        } else if (report.name_en === '') {
            Helpers.showToast('error', 'Vui lòng nhập tên nội dung (Tiếng Anh)!');
        } else {
            setLoading(true);
            report.file_content_vn = listFile;
            report.file_content_en = listFileEng;
            congressService.registerProcedure(report)
                .then(
                    data => {
                        setLoading(false);
                        if (data?.status == 1) {
                            Helpers.showToast('success', data?.mess);
                            setReport({name_vn: "", name_en: "", file_content_vn: "", file_content_en: ""});
                        } else {
                            Helpers.showToast('error', data?.mess);
                        }
                    }
                );
        }
    }

    //upload file TV
    const [listFile, setListFile] = useState('');
    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        congressService.uploadFileAction(file)
            .then(data => {
                setListFile(data);
            });
    }
    const removeFile = () => {
        setListFile('');
    }

    //upload File ENG
    const [listFileEng, setListFileEng] = useState('');
    const handleUploadImageEng = (e) => {
        const file = e.target.files[0];
        congressService.uploadFileAction(file)
            .then(dataEng => {
                setListFileEng(dataEng);
            });
    }
    const removeFileEng = () => {
        setListFileEng('');
    }
    //end upload file


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
                                <Link to="/khai-bao-thu-tuc-be-mac"
                                      className="btn btn-info squer-btn mt-2 mr-2 sm-btn"><i
                                    className="mdi mdi-arrow-left"></i> Quay lại
                                </Link>
                                <Box className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#">KHAI BÁO BIÊN BẢN - NGHỊ QUYẾT ĐẠI HỘI</a></li>
                                        <li className="breadcrumb-item active">Thêm Mới</li>
                                    </ol>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="row">
                        <Box className="col-lg-12">
                            <Box className="card">
                                <Box className="card-header">
                                    <h4 className="card-title mb-0">Thêm mới biên bản - nghị quyệt đai hội</h4>
                                </Box>
                                <Box className="card-body">
                                    <Box className="row">
                                        <Box className="col-lg-6">
                                            <Box className="card">
                                                <Box className="card-body">
                                                    <Box>
                                                        <label onChange={handleUploadImage} htmlFor="formId"
                                                               className={"btn btn-default mb-3 w-100"}>
                                                            <Box className="mb-3">
                                                                <i className="display-4 text-muted ri-upload-cloud-2-fill"></i>
                                                            </Box>
                                                            <input name="fileTv" type="file" id="formId" hidden
                                                                   accept="application/pdf"/>
                                                            <h6>Upload File Nội dung</h6>
                                                        </label>
                                                    </Box>
                                                    {listFile != '' &&
                                                        <ul className="list-unstyled mb-0" id="dropzone-preview">
                                                            <li className="mt-2">
                                                                <Box className="border rounded">
                                                                    <Box className="d-flex p-2">
                                                                        <Box className="flex-shrink-0 me-3">
                                                                            <Box className="avatar-sm bg-light rounded">
                                                                                <img
                                                                                    className="img-fluid rounded d-block"
                                                                                    src="assets/images/pdf.png"
                                                                                    alt="Dropzone-Image"/>
                                                                            </Box>
                                                                        </Box>
                                                                        <Box className="flex-grow-1">
                                                                            <Box className="pt-1">
                                                                                <h5 className="fs-14 mb-1">{listFile}</h5>
                                                                                <p className="fs-13 text-muted mb-0"></p>
                                                                                <strong
                                                                                    className="error text-danger"></strong>
                                                                            </Box>
                                                                        </Box>
                                                                        <Box className="flex-shrink-0 ms-3">
                                                                            <button onClick={() => removeFile()}
                                                                                    className="btn btn-sm btn-danger">Xóa
                                                                            </button>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </li>
                                                        </ul>}
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box className="col-lg-6">
                                            <Box className="card">
                                                <Box className="card-body">
                                                    <Box>
                                                        <label onChange={handleUploadImageEng} htmlFor="formIdEng"
                                                               className={"btn btn-default mb-3 w-100"}>
                                                            <Box className="mb-3">
                                                                <i className="display-4 text-muted ri-upload-cloud-2-fill"></i>
                                                            </Box>
                                                            <input name="fileEng" type="file" id="formIdEng" hidden
                                                                   accept="application/pdf"/>
                                                            <h6>Upload File Nội dung (Tiếng anh)</h6>
                                                        </label>
                                                    </Box>
                                                    {listFileEng != '' &&
                                                        <ul className="list-unstyled mb-0" id="dropzone-preview">
                                                            <li className="mt-2">
                                                                <Box className="border rounded">
                                                                    <Box className="d-flex p-2">
                                                                        <Box className="flex-shrink-0 me-3">
                                                                            <Box className="avatar-sm bg-light rounded">
                                                                                <img
                                                                                    className="img-fluid rounded d-block"
                                                                                    src="assets/images/pdf.png"
                                                                                    alt="Dropzone-Image"/>
                                                                            </Box>
                                                                        </Box>
                                                                        <Box className="flex-grow-1">
                                                                            <Box className="pt-1">
                                                                                <h5 className="fs-14 mb-1">{listFileEng}</h5>
                                                                                <p className="fs-13 text-muted mb-0"></p>
                                                                                <strong
                                                                                    className="error text-danger"></strong>
                                                                            </Box>
                                                                        </Box>
                                                                        <Box className="flex-shrink-0 ms-3">
                                                                            <button onClick={() => removeFileEng()}
                                                                                    className="btn btn-sm btn-danger">Xóa
                                                                            </button>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </li>
                                                        </ul>}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
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
                                                        value={report.name_vn}
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
                                                        value={report.name_en}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="text-center">
                                        <LoadingButton
                                            onClick={CreateProcedure}
                                            className="ad-btn ad-login-member bg-success mt-3"
                                            variant="outlined"
                                            startIcon={<i className="mdi mdi-plus"></i>}
                                            loading={loading}
                                            disabled={loading}
                                            sx={{
                                                color: 'white',
                                                fontSize: 13,
                                                fontWeight: 400,
                                            }}
                                        >
                                            {!loading ? 'Thêm Mới' : ''}
                                        </LoadingButton>
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

export default Create;

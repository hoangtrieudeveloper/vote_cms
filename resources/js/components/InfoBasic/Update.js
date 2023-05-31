import React, {Component, useEffect, useState} from 'react';
import {
    Box,
    Typography,
    TextField
} from "@mui/material";
import {Link} from 'react-router-dom';
import LoadingButton from "@mui/lab/LoadingButton";
import {infoBasicService} from "../../model/infoBasicService";
import Loading from "../pages/Loading";
import ToastNotifi from "../pages/ToastNotifi";
import Helpers from "../pages/Helpers";
import helpers from "../pages/Helpers";
import GlobalSetting from "../pages/GlobalSetting";

function Update() {
    const [loading, setLoading] = useState(false);
    const [idObject, setIdObject] = useState();
    const [report, setReport] = useState({
        logo: "",
        banner: "",
        name_vn: "",
        name_en: "",
        phone_number: "",
        number_fax: "",
        stock_code: "",
        code_business: "",
        total_shareholder: "",
        total_share: "",
        header_company: "",
        header_company_en: "",
        meeting_venue: "",
        meeting_venue_en: "",
        meeting_time: "",
        meeting_time_en: "",
        meeting_name: "",
        meeting_name_en: "",
        meeting_chairman: "",
        meeting_chairman_en: "",
        secretary_chairman: "",
        secretary_chairman_en: "",
        link_livestream: "",
        link_livestream_en: "",
        Link_hdsd: "",
        Link_hdsd_en: "",
        link_stated: "",
        closing_date: "",
        hotline: "",
    });

    const {
        id,
        logo,
        banner,
        name_vn,
        name_en,
        phone_number,
        number_fax,
        stock_code,
        code_business,
        total_shareholder,
        total_share,
        header_company,
        header_company_en,
        meeting_venue,
        meeting_venue_en,
        meeting_time,
        meeting_time_en,
        meeting_name,
        meeting_name_en,
        meeting_chairman,
        meeting_chairman_en,
        secretary_chairman,
        secretary_chairman_en,
        link_livestream,
        link_livestream_en,
        Link_hdsd,
        Link_hdsd_en,
        link_stated,
        closing_date,
        hotline,
    } = report;
    const onInputChange = e => {
        setReport({...report, [e.target.name]: e.target.value});
    };

    async function UpdateInFoBasic() {
        if (report.name_vn === '') {
            Helpers.showToast('error', 'Vui lòng nhập tên công ty!');
        } else if (report.name_en === '') {
            Helpers.showToast('error', 'Vui lòng nhập tên công ty (Tiếng Anh)!');
        } else {
            setLoading(true);
            report.id = idObject;
            report.logo = listFile;
            report.banner = listFileEng;
            infoBasicService.update(report)
                .then(
                    data => {
                        setLoading(false);
                        if (data?.status == 1) {
                            Helpers.showToast('success', data?.messager);
                            setReport({
                                id: idObject,
                                logo: "",
                                banner: "",
                                name_vn: "",
                                name_en: "",
                                phone_number: "",
                                number_fax: "",
                                stock_code: "",
                                code_business: "",
                                total_shareholder: "",
                                total_share: "",
                                header_company: "",
                                header_company_en: "",
                                meeting_venue: "",
                                meeting_venue_en: "",
                                meeting_time: "",
                                meeting_time_en: "",
                                meeting_name: "",
                                meeting_name_en: "",
                                meeting_chairman: "",
                                meeting_chairman_en: "",
                                secretary_chairman: "",
                                secretary_chairman_en: "",
                                link_livestream: "",
                                link_livestream_en: "",
                                Link_hdsd: "",
                                Link_hdsd_en: "",
                                link_stated: "",
                                closing_date: "",
                                hotline: "",
                            });
                            getInfoById(idObject);
                        } else {
                            Helpers.showToast('error', data?.messager);
                        }
                    }
                );
        }
    }

    async function getInfoById() {
        infoBasicService.getById()
            .then(
                data => {
                    if (data.status == 1) {
                        setReport({
                            id: data?.data?.id,
                            logo: data?.data?.logo,
                            banner: data?.data?.banner,
                            name_vn: data?.data?.name_vn,
                            name_en: data?.data?.name_en,
                            phone_number: data?.data?.phone_number,
                            number_fax: data?.data?.number_fax,
                            stock_code: data?.data?.stock_code,
                            code_business: data?.data?.code_business,
                            total_shareholder: data?.data?.total_shareholder,
                            total_share: data?.data?.total_share,
                            header_company: data?.data?.header_company,
                            header_company_en: data?.data?.header_company_en,
                            meeting_venue: data?.data?.meeting_venue,
                            meeting_venue_en: data?.data?.meeting_venue_en,
                            meeting_time: data?.data?.meeting_time,
                            meeting_time_en: data?.data?.meeting_time_en,
                            meeting_name: data?.data?.meeting_name,
                            meeting_name_en: data?.data?.meeting_name_en,
                            meeting_chairman: data?.data?.meeting_chairman,
                            meeting_chairman_en: data?.data?.meeting_chairman_en,
                            secretary_chairman: data?.data?.secretary_chairman,
                            secretary_chairman_en: data?.data?.secretary_chairman_en,
                            link_livestream: data?.data?.link_livestream,
                            link_livestream_en: data?.data?.link_livestream_en,
                            Link_hdsd: data?.data?.Link_hdsd,
                            Link_hdsd_en: data?.data?.Link_hdsd_en,
                            link_stated: data?.data?.link_stated,
                            closing_date: data?.data?.closing_date,
                            hotline: data?.data?.hotline,
                        });
                        setIdObject(data?.data?.id);
                        setListFile(data?.data?.logo || '');
                        setListFileEng(data?.data?.banner || '');
                    } else {
                        helpers.showToast('error', data?.mess)
                    }
                }
            );
    }

    //upload file TV
    const [listFile, setListFile] = useState('');
    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        infoBasicService.uploadFileAction(file)
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
        infoBasicService.uploadFileAction(file)
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
        getInfoById();
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
                                        <li className="breadcrumb-item"><a href="#">KHAI BÁO THÔNG TIN CƠ BẢN
                                            HỘI</a></li>
                                    </ol>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="row">
                        <Box className="col-lg-12">
                            <Box className="card">
                                <Box className="card-header">
                                    <h4 className="card-title mb-0 text-center">KHAI BÁO THÔNG TIN CƠ BẢN</h4>
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
                                                                {listFile !== '' &&
                                                                    <img
                                                                        src={listFile}
                                                                        alt="Dropzone-Image" style={{width: 150, height: 150}}/>
                                                                }
                                                                {listFile === '' &&
                                                                    <i className="display-4 text-muted ri-upload-cloud-2-fill"></i>
                                                                }
                                                            </Box>
                                                            <input name="fileTv" type="file" id="formId" hidden
                                                                   accept="image/png, image/gif, image/jpeg"/>
                                                            <h6>Logo Công Ty</h6>
                                                        </label>
                                                    </Box>
                                                    {listFile != '' &&
                                                        <ul className="list-unstyled mb-0" id="dropzone-preview">
                                                            <li className="mt-2">
                                                                <Box className="border rounded">
                                                                    <Box className="d-flex p-2">
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
                                                                {listFileEng !== '' &&
                                                                    <img
                                                                        src={listFileEng}
                                                                        alt="Dropzone-Image" style={{width: 150, height: 150}}/>
                                                                }
                                                                {listFileEng === '' &&
                                                                    <i className="display-4 text-muted ri-upload-cloud-2-fill"></i>
                                                                }
                                                            </Box>
                                                            <input name="fileEng" type="file" id="formIdEng" hidden
                                                                   accept="image/png, image/gif, image/jpeg"/>
                                                            <h6>Banner Công Ty</h6>
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
                                                                                    src={listFileEng}
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
                                                        label="Tên công ty"
                                                        variant="outlined"
                                                        value={report.name_vn}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
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
                                                        label="Nhập công ty(Tiếng Anh)"
                                                        variant="outlined"
                                                        value={report.name_en}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box>
                                        <Box className="row">
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="phone_number"
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
                                                        value={report.phone_number}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="number_fax"
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
                                                        label="Số Fax"
                                                        variant="outlined"
                                                        value={report.number_fax}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box>
                                        <Box className="row">
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="stock_code"
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
                                                        label="Mã chứng khoán"
                                                        variant="outlined"
                                                        value={report.stock_code}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="code_business"
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
                                                        label="Mã doanh nghiệp"
                                                        variant="outlined"
                                                        value={report.code_business}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box className="row">
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        disabled
                                                        className="form-control"
                                                        fullWidth
                                                        name="total_shareholder"
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
                                                        label="Tổng số cổ đông"
                                                        variant="outlined"
                                                        value={report.total_shareholder}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        disabled
                                                        className="form-control"
                                                        fullWidth
                                                        name="total_share"
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
                                                        label="Tổng số cổ phần"
                                                        variant="outlined"
                                                        value={report.total_share}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box className="row">
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="header_company"
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
                                                        label="Trụ sở công ty"
                                                        variant="outlined"
                                                        value={report.header_company}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="header_company_en"
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
                                                        label="Trụ sở công ty(Tiếng Anh)"
                                                        variant="outlined"
                                                        value={report.header_company_en}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box className="row">
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="meeting_venue"
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
                                                        label="Địa điểm điều hành Đại hội"
                                                        variant="outlined"
                                                        value={report.meeting_venue}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="meeting_venue_en"
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
                                                        label="Địa điểm điều hành Đại hội(Tiếng Anh)"
                                                        variant="outlined"
                                                        value={report.meeting_venue_en}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box className="row">
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="meeting_time"
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
                                                        label="Thời gian họp"
                                                        variant="outlined"
                                                        value={report.meeting_time}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="meeting_time_en"
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
                                                        label="Thời gian họp(Tiếng Anh)"
                                                        variant="outlined"
                                                        value={report.meeting_time_en}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box className="row">
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="meeting_name"
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
                                                        label="Tên cuộc họp"
                                                        variant="outlined"
                                                        value={report.meeting_name}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="meeting_name_en"
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
                                                        label="Tên cuộc họp(Tiếng Anh)"
                                                        variant="outlined"
                                                        value={report.meeting_name_en}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box className="row">
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="meeting_chairman"
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
                                                        label="Chủ tọa Đại hội"
                                                        variant="outlined"
                                                        value={report.meeting_chairman}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="meeting_chairman_en"
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
                                                        label="Chủ tọa Đại hội(Tiếng Anh)"
                                                        variant="outlined"
                                                        value={report.meeting_chairman_en}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box className="row">
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="secretary_chairman"
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
                                                        label="Thư ký Đại hội"
                                                        variant="outlined"
                                                        value={report.secretary_chairman}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="secretary_chairman_en"
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
                                                        label="Thư ký Đại hội(Tiếng Anh)"
                                                        variant="outlined"
                                                        value={report.secretary_chairman_en}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box className="row">
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="link_livestream"
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
                                                        label="Link livestream"
                                                        variant="outlined"
                                                        value={report.link_livestream}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="link_livestream_en"
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
                                                        label="Link livestream(Tiếng Anh)"
                                                        variant="outlined"
                                                        value={report.link_livestream_en}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box className="row">
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="Link_hdsd"
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
                                                        label="Link video HDSD"
                                                        variant="outlined"
                                                        value={report.Link_hdsd}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="Link_hdsd_en"
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
                                                        label="Link video HDSD(Tiếng Anh)"
                                                        variant="outlined"
                                                        value={report.Link_hdsd_en}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box className="row">
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="link_stated"
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
                                                        label="Link phát biểu"
                                                        variant="outlined"
                                                        value={report.link_stated}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="closing_date"
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
                                                        label="Ngày chốt quyền"
                                                        variant="outlined"
                                                        value={report.closing_date}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box className="row">
                                            <Box className="col-xl-6">
                                                <Box className="mb-3">
                                                    <TextField
                                                        className="form-control"
                                                        fullWidth
                                                        name="hotline"
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
                                                        label="Hotline"
                                                        variant="outlined"
                                                        value={report.hotline}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="text-center">
                                        <LoadingButton
                                            onClick={UpdateInFoBasic}
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
    </Box>)
}

export default Update;

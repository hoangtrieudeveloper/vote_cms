import React, {Component, useState, useEffect} from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {
    Box,
    Button,
    Typography,
    TextField,
} from "@mui/material";
import {
    Link, useHistory
} from "react-router-dom";
import {userService} from "../../model/userService";
import Notification from "../pages/Notification";
import Footer from "../pages/Footer";
import ToastNotifi from "../pages/ToastNotifi";
import Helpers from "../pages/Helpers";

const Login = () => {
    let history = useHistory();
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const onInputChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    };
    const signIn = () => {
        if (user.email === '') {
            Helpers.showToast('error', 'Vui lòng nhập Email!');
        } else if (user.email.length < 5) {
            Helpers.showToast('error', 'Email không được nhỏ hơn 5 ký tự!');
        } else if (user.email.split("").filter((x) => x === "@").length !== 1) {
            Helpers.showToast('error', 'Nhập đúng định dạng Email!');
        } else if (user.email.indexOf(".") === -1) {
            Helpers.showToast('error', 'Nhập đúng định dạng Email!');
        } else if (user.password === '') {
            Helpers.showToast('error', 'Vui lòng nhập mật khẩu!');
        } else {
            setLoading(true);
            userService.login(user)
                .then(
                    data => {
                        setLoading(false);
                        if (data.status == 1) {
                            localStorage.setItem("user", JSON.stringify(data.data));
                            localStorage.setItem("scopes", JSON.stringify(data.data.scopes));
                            history.go();
                        } else {
                            setErrors(data);
                        }
                    }
                );
        }
    }
    const onEnterKey = (e) => {
        if (e.key === "Enter") {
            signIn();
        }
    }
    useEffect(() => {
        let Auth = localStorage.getItem('user');
        if (typeof (Auth) !== 'undefined' && Auth !== null) history.push('/');
    }, []);
    return (
        <Box
            className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
            <Box className="bg-overlay"></Box>
            <Box className="auth-page-content overflow-hidden pt-lg-5">
                <Box className="container">
                    <Box className="row">
                        <Box className="col-lg-12">
                            <Box className="card overflow-hidden card-bg-fill border-0 card-border-effect-none">
                                <Box className="row g-0">
                                    <Box className="col-lg-6">
                                        <Box className="p-lg-5 p-4 auth-one-bg h-100">
                                            <Box className="bg-overlay"></Box>
                                            <Box className="position-relative h-100 d-flex flex-column">
                                                <Box className="mb-4">
                                                    <a href="#" className="d-block">
                                                        <img src="assets/images/logo-light.png" alt="" height="18"/>
                                                    </a>
                                                </Box>
                                                <Box className="mt-auto">
                                                    <Box className="mb-3">
                                                        <i className="ri-double-quotes-l display-4 text-success"></i>
                                                    </Box>
                                                    <Box id="qoutescarouselIndicators" className="carousel slide"
                                                         data-bs-ride="carousel">
                                                        <Box className="carousel-indicators">
                                                            <button type="button"
                                                                    data-bs-target="#qoutescarouselIndicators"
                                                                    data-bs-slide-to="0" className="active"
                                                                    aria-current="true" aria-label="Slide 1"></button>
                                                            <button type="button"
                                                                    data-bs-target="#qoutescarouselIndicators"
                                                                    data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                            <button type="button"
                                                                    data-bs-target="#qoutescarouselIndicators"
                                                                    data-bs-slide-to="2" aria-label="Slide 3"></button>
                                                        </Box>
                                                        <Box className="carousel-inner text-center text-white pb-5">
                                                            <Box className="carousel-item active">
                                                                <p className="fs-15 fst-italic">GIẢI PHÁP TỔ CHỨC
                                                                    ĐẠI HỘI CỔ ĐÔNG</p>
                                                            </Box>
                                                            <Box className="carousel-item">
                                                                <p className="fs-15 fst-italic">VOTE là giải pháp trọn
                                                                    gói hàng đầu cho kỳ đại hội cổ đông sắp tới của
                                                                    doanh nghiệp.</p>
                                                            </Box>
                                                            <Box className="carousel-item">
                                                                <p className="fs-15 fst-italic">Với dịch vụ hỗ trợ công
                                                                    bố thông tin và biểu quyết online ứng dụng công nghệ
                                                                    Blockchain, Bvote bảo đảm tính minh bạch của kết quả
                                                                    biểu quyết cho các Cổ đông.</p>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="col-lg-6">
                                        <ToastNotifi></ToastNotifi>
                                        <Box className="p-lg-5 p-4">
                                            <Box>
                                                <h5 className="text-primary">Đăng nhập</h5>
                                                <p className="text-muted">Dành cho tổ chức phát hành</p>
                                            </Box>
                                            <Box className="mt-4">
                                                <form>
                                                    <Box className="mb-3">
                                                        <label htmlFor="username"
                                                               className="form-label">Tài khoản</label>
                                                        <TextField
                                                            fullWidth
                                                            name="email"
                                                            type='text'
                                                            required
                                                            sx={{
                                                                'input': {
                                                                    '&::placeholder': {
                                                                        fontSize: 16,
                                                                    }
                                                                },
                                                            }}
                                                            label="Nhập tài khoản"
                                                            variant="outlined"
                                                            onChange={e => onInputChange(e)}
                                                        />
                                                    </Box>
                                                    <Box className="mb-3">
                                                        <label className="form-label"
                                                               htmlFor="password-input">Mật khẩu</label>
                                                        <TextField
                                                            fullWidth
                                                            name="password"
                                                            type='password'
                                                            required
                                                            sx={{
                                                                'input': {
                                                                    '&::placeholder': {
                                                                        fontSize: 16,
                                                                    }
                                                                },
                                                            }}
                                                            label="Mật khẩu"
                                                            variant="outlined"
                                                            onChange={e => onInputChange(e)}
                                                            onKeyPress={e => onEnterKey(e)}
                                                        />
                                                    </Box>
                                                    <Box className="mt-4">
                                                        <LoadingButton
                                                            onClick={signIn}
                                                            className="btn btn-primary w-100"
                                                            loading={loading}
                                                            disabled={loading}
                                                            variant="outlined"
                                                            sx={{
                                                                backgroundColor: '#11a1fd',
                                                                color: 'white',
                                                                paddingX: 2,
                                                                py: 0.5,
                                                                fontSize: 14,
                                                                fontWeight: 400,
                                                            }}
                                                        >
                                                            {!loading ? 'Đăng nhập' : ''}
                                                        </LoadingButton>
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
            <Footer></Footer>
        </Box>
    )
}
export default Login;

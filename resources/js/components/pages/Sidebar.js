import React, {Component, useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {Link} from 'react-router-dom';

export default function Sidebar({...props}) {
    const route = window.location.pathname.replace('/', '');
    //useEffect
    useEffect(() => {
    }, []);
    return (
        <Box className="app-menu navbar-menu border-end">
            <Box className="navbar-brand-box">
                <a href="#" className="logo logo-dark">
                    <span className="logo-sm">
                          <Typography className={"label-sidebar"}>VOTE</Typography>
                         <img src="assets/images/favicon.ico" alt="" height="17"/>
                    </span>
                    <span className="logo-lg">
                          <Typography className={"label-sidebar"}>VOTE</Typography>
                        <img src="assets/images/favicon.ico" alt="" height="17"/>
                    </span>
                </a>
                <a href="#" className="logo logo-light">
                    <span className="logo-sm">
                          <Typography className={"label-sidebar"}>VOTE</Typography>
                        <img src="assets/images/favicon.ico" alt="" height="22"/>
                    </span>
                    <span className="logo-lg">
                        <Typography className={"label-sidebar"}>VOTE</Typography>
                        <img src="assets/images/favicon.ico" alt="" height="40"/>
                    </span>
                </a>
                <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
                        id="vertical-hover">
                    <i className="ri-record-circle-line"></i>
                </button>
            </Box>
            <Box id="scrollbar">
                <Box className="container-fluid">
                    <Box id="two-column-menu">
                    </Box>
                    <ul className="navbar-nav" id="navbar-nav">
                        <li className="menu-title"><span data-key="t-menu">Menu</span></li>
                        <li className="nav-item">
                            <a className="nav-link menu-link" href="/">
                                <i className="ri-dashboard-2-line"></i> <span data-key="t-dashboards">Trang chủ</span>
                            </a>
                        </li>
                        {JSON.parse(localStorage.getItem('scopes')).includes('thong-tin-co-ban') &&
                            <li className="nav-item">
                                <a className={route.includes('thong-tin-co-ban') ? "nav-link menu-link active" : "nav-link menu-link"} href="/thong-tin-co-ban">
                                    <i className="ri-layout-3-line"></i> <span
                                    data-key="t-layouts">Thông tin cơ bản</span>
                                </a>
                            </li>}
                        {localStorage.getItem('scopes').includes('listuser') && <li className="nav-item">
                            <a className={route.includes('listuser') ? "nav-link menu-link active" : "nav-link menu-link"}
                               href="#manager_user" data-bs-toggle="collapse"
                               role="button" aria-expanded="false" aria-controls="sidebarApps">
                                <i className="ri-account-circle-line"></i> <span data-key="t-apps"> Quản lý nhân viên</span>
                            </a>
                            <Box
                                className={route.includes('listuser') ? "collapse menu-dropdown show" : "collapse menu-dropdown"}
                                id="manager_user">
                                <ul className="nav nav-sm flex-column">
                                    {JSON.parse(localStorage.getItem('scopes')).includes('listuser') &&
                                        <li className="nav-item">
                                            <a href="/listuser"
                                               className={route.includes('listuser') ? "nav-link active" : "nav-link"}
                                               data-key="t-calendar"> Danh sách </a>
                                        </li>}
                                </ul>
                            </Box>
                        </li>}
                        {localStorage.getItem('scopes').includes('quan-ly-co-dong') && <li className="nav-item">
                            <a className={route.includes('quan-ly-co-dong') ? "nav-link menu-link active" : "nav-link menu-link"}
                               href="#shareholder" data-bs-toggle="collapse"
                               role="button" aria-expanded="false" aria-controls="sidebarApps">
                                <i className="ri-account-circle-line"></i> <span data-key="t-apps">Quản lý cổ đông</span>
                            </a>
                            <Box
                                className={route.includes('quan-ly-co-dong') || route.includes('danh-sach-co-dong') ? "collapse menu-dropdown show" : "collapse menu-dropdown"}
                                id="shareholder">
                                <ul className="nav nav-sm flex-column">
                                    {JSON.parse(localStorage.getItem('scopes')).includes('danh-sach-co-dong') &&
                                        <li className="nav-item">
                                            <a href="/danh-sach-co-dong"
                                               className={route.includes('danh-sach-co-dong') ? "nav-link active" : "nav-link"}
                                               data-key="t-calendar"> Danh sách Cổ đông</a>
                                        </li>}

                                    {JSON.parse(localStorage.getItem('scopes')).includes('quan-ly-co-dong') &&
                                        <li className="nav-item">
                                            <a href="/quan-ly-co-dong"
                                               className={route.includes('quan-ly-co-dong') ? "nav-link active" : "nav-link"}
                                               data-key="t-calendar">Quản lý Cổ đông</a>
                                        </li>}
                                </ul>
                            </Box>
                        </li>}
                        {localStorage.getItem('scopes').includes('quan-ly-uy-quyen') && <li className="nav-item">
                            <a className={route.includes('quan-ly-uy-quyen') ? "nav-link menu-link active" : "nav-link menu-link"}
                               href="#shareholderuy" data-bs-toggle="collapse"
                               role="button" aria-expanded="false" aria-controls="sidebarApps">
                                <i className="ri-pages-line"></i> <span data-key="t-apps">Quản lý ủy quyền</span>
                            </a>
                            <Box
                                className={route.includes('quan-ly-uy-quyen') ? "collapse menu-dropdown show" : "collapse menu-dropdown"}
                                id="shareholderuy">
                                <ul className="nav nav-sm flex-column">
                                    {JSON.parse(localStorage.getItem('scopes')).includes('xu-ly-uy-quyen') &&
                                        <li className="nav-item">
                                            <a href="/xu-ly-uy-quyen"
                                               className={route.includes('xu-ly-uy-quyen') ? "nav-link active" : "nav-link"}
                                               data-key="t-calendar"> Xử lý ủy quyền</a>
                                        </li>}

                                    {JSON.parse(localStorage.getItem('scopes')).includes('danh-sach-uy-quyen') &&
                                        <li className="nav-item">
                                            <a href="/danh-sach-uy-quyen"
                                               className={route.includes('danh-sach-uy-quyen') ? "nav-link active" : "nav-link"}
                                               data-key="t-calendar">Danh sách ủy quyền</a>
                                        </li>}

                                    {JSON.parse(localStorage.getItem('scopes')).includes('thiet-lap-thong-tin-uy-quyen') &&
                                        <li className="nav-item">
                                            <a href="/thiet-lap-thong-tin-uy-quyen"
                                               className={route.includes('thiet-lap-thong-tin-uy-quyen') ? "nav-link active" : "nav-link"}
                                               data-key="t-calendar">Thiết lập thông tin ủy quyền</a>
                                        </li>}
                                </ul>
                            </Box>
                        </li>}
                        {localStorage.getItem('scopes').includes('khai-bao-thu-tuc-khai-mac') &&
                            <li className="nav-item">
                                <a className={route.includes('khai-bao-thu-tuc-khai-mac') || route.includes('khai-bao-bc-to-trinh') || route.includes('khai-bao-thu-tuc-be-mac') || route.includes('khai-bao-tai-lieu-dai-hoi') ? "nav-link menu-link active" : "nav-link menu-link"} href="#manager_congress" data-bs-toggle="collapse"
                                   role="button" aria-expanded="false" aria-controls="sidebarApps">
                                    <i className="ri-pencil-ruler-2-line"></i> <span
                                    data-key="t-apps"> Nội dung Đại Hội</span>
                                </a>
                                <Box
                                    className={route.includes('khai-bao-thu-tuc-khai-mac') || route.includes('khai-bao-bc-to-trinh') || route.includes('khai-bao-thu-tuc-be-mac') || route.includes('khai-bao-tai-lieu-dai-hoi') ? "collapse menu-dropdown show" : "collapse menu-dropdown"}
                                    id="manager_congress">
                                    <ul className="nav nav-sm flex-column">
                                        {JSON.parse(localStorage.getItem('scopes')).includes('khai-bao-thu-tuc-khai-mac') &&
                                            <li className="nav-item">
                                                <a href="/khai-bao-thu-tuc-khai-mac"
                                                   className={route.includes('khai-bao-thu-tuc-khai-mac') ? "nav-link active" : "nav-link"}
                                                   data-key="t-calendar"> Khai báo thủ tục khai mạc</a>
                                            </li>}
                                    </ul>
                                    <ul className="nav nav-sm flex-column">
                                        {JSON.parse(localStorage.getItem('scopes')).includes('khai-bao-bc-to-trinh') &&
                                            <li className="nav-item">
                                                <a href="/khai-bao-bc-to-trinh"
                                                   className={route.includes('khai-bao-bc-to-trinh') ? "nav-link active" : "nav-link"}
                                                   data-key="t-calendar"> Khai báo BC - Tờ trình </a>
                                            </li>}
                                    </ul>
                                    <ul className="nav nav-sm flex-column">
                                        {JSON.parse(localStorage.getItem('scopes')).includes('khai-bao-thu-tuc-be-mac') &&
                                            <li className="nav-item">
                                                <a href="/khai-bao-thu-tuc-be-mac"
                                                   className={route.includes('khai-bao-thu-tuc-be-mac') ? "nav-link active" : "nav-link"}
                                                   data-key="t-calendar"> Khai báo thủ tục bế mạc </a>
                                            </li>}
                                    </ul>
                                    <ul className="nav nav-sm flex-column">
                                        {JSON.parse(localStorage.getItem('scopes')).includes('khai-bao-tai-lieu-dai-hoi') &&
                                            <li className="nav-item">
                                                <a href="/khai-bao-tai-lieu-dai-hoi"
                                                   className={route.includes('khai-bao-tai-lieu-dai-hoi') ? "nav-link active" : "nav-link"}
                                                   data-key="t-calendar"> Khai báo tài liệu đại hội </a>
                                            </li>}
                                    </ul>
                                </Box>
                            </li>}

                        {localStorage.getItem('scopes').includes('bien-ban-nghi-quyet') && <li className="nav-item">
                            <a className={route.includes('bien-ban-nghi-quyet') ? "nav-link menu-link active" : "nav-link menu-link"}
                               href="#manager_report" data-bs-toggle="collapse"
                               role="button" aria-expanded="false" aria-controls="sidebarApps">
                                <i className="ri-honour-line"></i> <span data-key="t-apps"> Quản lý kết quả biểu quyết</span>
                            </a>
                            <Box
                                className={route.includes('bien-ban-nghi-quyet') ? "collapse menu-dropdown show" : "collapse menu-dropdown"}
                                id="manager_report">
                                <ul className="nav nav-sm flex-column">
                                    {JSON.parse(localStorage.getItem('scopes')).includes('bien-ban-nghi-quyet') &&
                                        <li className="nav-item">
                                            <a href="/bien-ban-nghi-quyet"
                                               className={route.includes('bien-ban-nghi-quyet') ? "nav-link active" : "nav-link"}
                                               data-key="t-calendar"> Biên bản - Nghị quyết ĐH </a>
                                        </li>}
                                </ul>
                            </Box>
                        </li>}

                        {localStorage.getItem('scopes').includes('checkin-thu-cong') && <li className="nav-item">
                            <a className={route.includes('checkin-thu-cong') ? "nav-link menu-link active" : "nav-link menu-link"}
                               href="#manager_report1" data-bs-toggle="collapse"
                               role="button" aria-expanded="false" aria-controls="sidebarApps">
                                <i className="ri-file-list-3-line"></i> <span data-key="t-apps"> Kiểm tra tư cách CĐ</span>
                            </a>
                            <Box
                                className={route.includes('checkin-thu-cong') ? "collapse menu-dropdown show" : "collapse menu-dropdown"}
                                id="manager_report1">
                                <ul className="nav nav-sm flex-column">
                                    {JSON.parse(localStorage.getItem('scopes')).includes('checkin-thu-cong') &&
                                        <li className="nav-item">
                                            <a href="/checkin-thu-cong"
                                               className={route.includes('checkin-thu-cong') ? "nav-link active" : "nav-link"}
                                               data-key="t-calendar"> Checkin thủ công </a>
                                        </li>}
                                </ul>
                                <ul className="nav nav-sm flex-column">
                                    {JSON.parse(localStorage.getItem('scopes')).includes('export-report-co-dong') &&
                                        <li className="nav-item">
                                            <a href="/export-report-co-dong"
                                               className={route.includes('checkin-thu-cong') ? "nav-link active" : "nav-link"}
                                               data-key="t-calendar"> Xuất biên bản KTTC CĐ </a>
                                        </li>}
                                </ul>
                            </Box>
                        </li>}
                        {JSON.parse(localStorage.getItem('scopes')).includes('list-group-role') &&
                            <li className="nav-item">
                                <a className={route.includes('list-group-role') ? "nav-link menu-link active" : "nav-link menu-link"} href="/list-group-role">
                                    <i className="ri-layout-3-line"></i> <span
                                    data-key="t-layouts">Quản lý phân quyền</span>
                                </a>
                            </li>}
                    </ul>
                </Box>
            </Box>
            <Box className="sidebar-background"></Box>
        </Box>
    )
}


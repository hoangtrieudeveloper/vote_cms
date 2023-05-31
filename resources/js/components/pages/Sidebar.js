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
                                <i className="ri-apps-2-line"></i> <span data-key="t-apps"> Quản lý nhân viên</span>
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


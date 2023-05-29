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
                        {localStorage.getItem('scopes').includes('listuser') && <li className="nav-item">
                            <a className="nav-link menu-link" href="#sidebarApps" data-bs-toggle="collapse"
                               role="button" aria-expanded="false" aria-controls="sidebarApps">
                                <i className="ri-apps-2-line"></i> <span data-key="t-apps"> Quản lý nhân viên</span>
                            </a>
                            <Box className="collapse menu-dropdown" id="sidebarApps">
                                <ul className="nav nav-sm flex-column">
                                    {JSON.parse(localStorage.getItem('scopes')).includes('listuser') &&
                                        <li className="nav-item">
                                            <a href="/listuser" className="nav-link"
                                               data-key="t-calendar"> Danh sách </a>
                                        </li>}
                                </ul>
                            </Box>
                        </li>}
                        {localStorage.getItem('scopes').includes('khai-bao-thu-tuc-khai-mac') && <li className="nav-item">
                            <a className="nav-link menu-link" href="#sidebarApps" data-bs-toggle="collapse"
                               role="button" aria-expanded="false" aria-controls="sidebarApps">
                                <i className="ri-apps-2-line"></i> <span data-key="t-apps"> Khai báo nội dung Đại Hội</span>
                            </a>
                            <Box className="collapse menu-dropdown" id="sidebarApps">
                                <ul className="nav nav-sm flex-column">
                                    {JSON.parse(localStorage.getItem('scopes')).includes('khai-bao-thu-tuc-khai-mac') &&
                                        <li className="nav-item">
                                            <a href="/khai-bao-thu-tuc-khai-mac" className="nav-link"
                                               data-key="t-calendar"> Khai báo thủ tục khai mạc </a>
                                        </li>}
                                </ul>
                            </Box>
                        </li>}
                        {JSON.parse(localStorage.getItem('scopes')).includes('list-group-role') &&
                            <li className="nav-item">
                                <a className="nav-link menu-link" href="/list-group-role">
                                    <i className="ri-layout-3-line"></i> <span data-key="t-layouts">Quản lý phân quyền</span>
                                </a>
                            </li>}
                    </ul>
                </Box>
            </Box>
            <Box className="sidebar-background"></Box>
        </Box>
    )
}


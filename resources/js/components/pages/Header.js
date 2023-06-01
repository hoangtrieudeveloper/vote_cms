import React, {useEffect, useState} from "react";
import {Box, Typography, TextField} from "@mui/material";
import {Link} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {userService} from "../../model/userService";

export default function Header() {
    const [data, setData] = useState(JSON.parse(localStorage.getItem('user')) || '');
    const logout = () => {
        userService.logout()
            .then(
                data => {
                    if (data.status == 1) {
                        localStorage.removeItem('user');
                        localStorage.removeItem('scopes');
                        setTimeout(() => {
                            history.push('/login');
                        }, 1000);
                    }
                }
            );
    }
    //useEffect
    useEffect(() => {
    }, []);

    return (
        <header id="page-topbar">
            <Box className="layout-width">
                <Box className="navbar-header">
                    <Box className="d-flex">
                        <Box className="navbar-brand-box horizontal-logo">
                            <a href="#" className="logo logo-dark">
                        <span className="logo-sm">
                            <img src="assets/images/logo-sm.png" alt="" height="22"/>
                        </span>
                                <span className="logo-lg">
                            <img src="assets/images/logo-dark.png" alt="" height="17"/>
                        </span>
                            </a>

                            <a href="index.html" className="logo logo-light">
                        <span className="logo-sm">
                            <img src="assets/images/logo-sm.png" alt="" height="22"/>
                        </span>
                                <span className="logo-lg">
                            <img src="assets/images/logo-light.png" alt="" height="17"/>
                        </span>
                            </a>
                        </Box>
                        <button type="button"
                                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                                id="topnav-hamburger-icon">
                    <span className="hamburger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                        </button>
                    </Box>
                    <Box className="d-flex align-items-center">
                        <Box className="ms-1 header-item d-none d-sm-flex">
                            <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                                    data-toggle="fullscreen">
                                <i className='bx bx-fullscreen fs-22'></i>
                            </button>
                        </Box>
                        {/*<Box className="ms-1 header-item d-none d-sm-flex">*/}
                        {/*    <button type="button"*/}
                        {/*            className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode">*/}
                        {/*        <i className='bx bx-moon fs-22'></i>*/}
                        {/*    </button>*/}
                        {/*</Box>*/}
                        <Box className="dropdown topbar-head-dropdown ms-1 header-item" id="notificationDropdown">
                            <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                                    id="page-header-notifications-dropdown" data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                                <i className='bx bx-bell fs-22'></i>
                                <span
                                    className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">3<span
                                    className="visually-hidden">unread messages</span></span>
                            </button>
                            <Box className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                                 aria-labelledby="page-header-notifications-dropdown">

                                <Box className="dropdown-head bg-primary bg-pattern rounded-top">
                                    <Box className="p-3">
                                        <Box className="row align-items-center">
                                            <Box className="col">
                                                <h6 className="m-0 fs-16 fw-semibold text-white"> Notifications </h6>
                                            </Box>
                                            <Box className="col-auto dropdown-tabs">
                                                <span className="badge badge-soft-light fs-13"> 4 New</span>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="px-2 pt-2">
                                        <ul className="nav nav-tabs dropdown-tabs nav-tabs-custom"
                                            data-dropdown-tabs="true" id="notificationItemsTab" role="tablist">
                                            <li className="nav-item waves-effect waves-light">
                                                <a className="nav-link active" data-bs-toggle="tab" href="#all-noti-tab"
                                                   role="tab" aria-selected="true">
                                                    All (4)
                                                </a>
                                            </li>
                                            <li className="nav-item waves-effect waves-light">
                                                <a className="nav-link" data-bs-toggle="tab" href="#messages-tab"
                                                   role="tab" aria-selected="false">
                                                    Messages
                                                </a>
                                            </li>
                                            <li className="nav-item waves-effect waves-light">
                                                <a className="nav-link" data-bs-toggle="tab" href="#alerts-tab"
                                                   role="tab" aria-selected="false">
                                                    Alerts
                                                </a>
                                            </li>
                                        </ul>
                                    </Box>
                                </Box>
                                <Box className="tab-content position-relative" id="notificationItemsTabContent">
                                    <Box className="tab-pane fade show active py-2 ps-2" id="all-noti-tab"
                                         role="tabpanel">
                                        <Box data-simplebar sx={{maxHeight:300}} className="pe-2">
                                            <Box
                                                className="text-reset notification-item d-block dropdown-item position-relative">
                                                <Box className="d-flex">
                                                    <Box className="avatar-xs me-3">
                                                <span
                                                    className="avatar-title bg-soft-info text-info rounded-circle fs-16">
                                                    <i className="bx bx-badge-check"></i>
                                                </span>
                                                    </Box>
                                                    <Box className="flex-1">
                                                        <a href="#!" className="stretched-link">
                                                            <h6 className="mt-0 mb-2 lh-base">Your <b>Elite</b> author
                                                                Graphic
                                                                Optimization <span
                                                                    className="text-secondary">reward</span> is
                                                                ready!
                                                            </h6>
                                                        </a>
                                                        <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                            <span><i className="mdi mdi-clock-outline"></i> Just 30 sec ago</span>
                                                        </p>
                                                    </Box>
                                                    <Box className="px-2 fs-15">
                                                        <Box className="form-check notification-check">
                                                            <input className="form-check-input" type="checkbox" value=""
                                                                   id="all-notification-check01"/>
                                                                <label className="form-check-label"
                                                                       htmlFor="all-notification-check01"></label>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box
                                                className="text-reset notification-item d-block dropdown-item position-relative">
                                                <Box className="d-flex">
                                                    <img src="assets/images/users/avatar-2.jpg"
                                                         className="me-3 rounded-circle avatar-xs" alt="user-pic"/>
                                                        <Box className="flex-1">
                                                            <a href="#!" className="stretched-link">
                                                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela
                                                                    Bernier</h6>
                                                            </a>
                                                            <Box className="fs-13 text-muted">
                                                                <p className="mb-1">Answered to your comment on the cash
                                                                    flow forecast's
                                                                    graph 🔔.</p>
                                                            </Box>
                                                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                <span><i className="mdi mdi-clock-outline"></i> 48 min ago</span>
                                                            </p>
                                                        </Box>
                                                        <Box className="px-2 fs-15">
                                                            <Box className="form-check notification-check">
                                                                <input className="form-check-input" type="checkbox"
                                                                       value="" id="all-notification-check02"/>
                                                                    <label className="form-check-label"
                                                                           htmlFor="all-notification-check02"></label>
                                                            </Box>
                                                        </Box>
                                                </Box>
                                            </Box>
                                            <Box
                                                className="text-reset notification-item d-block dropdown-item position-relative">
                                                <Box className="d-flex">
                                                    <Box className="avatar-xs me-3">
                                                <span
                                                    className="avatar-title bg-soft-danger text-danger rounded-circle fs-16">
                                                    <i className='bx bx-message-square-dots'></i>
                                                </span>
                                                    </Box>
                                                    <Box className="flex-1">
                                                        <a href="#!" className="stretched-link">
                                                            <h6 className="mt-0 mb-2 fs-13 lh-base">You have received <b
                                                                className="text-success">20</b> new messages in the
                                                                conversation
                                                            </h6>
                                                        </a>
                                                        <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                            <span><i
                                                                className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                                                        </p>
                                                    </Box>
                                                    <Box className="px-2 fs-15">
                                                        <Box className="form-check notification-check">
                                                            <input className="form-check-input" type="checkbox" value=""
                                                                   id="all-notification-check03"/>
                                                                <label className="form-check-label"
                                                                       htmlFor="all-notification-check03"></label>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box
                                                className="text-reset notification-item d-block dropdown-item position-relative">
                                                <Box className="d-flex">
                                                    <img src="assets/images/users/avatar-8.jpg"
                                                         className="me-3 rounded-circle avatar-xs" alt="user-pic"/>
                                                        <Box className="flex-1">
                                                            <a href="#!" className="stretched-link">
                                                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen
                                                                    Gibson</h6>
                                                            </a>
                                                            <Box className="fs-13 text-muted">
                                                                <p className="mb-1">We talked about a project on
                                                                    linkedin.</p>
                                                            </Box>
                                                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                <span><i className="mdi mdi-clock-outline"></i> 4 hrs ago</span>
                                                            </p>
                                                        </Box>
                                                        <Box className="px-2 fs-15">
                                                            <Box className="form-check notification-check">
                                                                <input className="form-check-input" type="checkbox"
                                                                       value="" id="all-notification-check04"/>
                                                                    <label className="form-check-label"
                                                                           htmlFor="all-notification-check04"></label>
                                                            </Box>
                                                        </Box>
                                                </Box>
                                            </Box>
                                            <Box className="my-3 text-center view-all">
                                                <button type="button"
                                                        className="btn btn-soft-success waves-effect waves-light">View
                                                    All Notifications <i
                                                        className="ri-arrow-right-line align-middle"></i></button>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="tab-pane fade py-2 ps-2" id="messages-tab" role="tabpanel"
                                         aria-labelledby="messages-tab">
                                        <Box data-simplebar sx={{maxHeight:300}} className="pe-2">
                                            <Box className="text-reset notification-item d-block dropdown-item">
                                                <Box className="d-flex">
                                                    <img src="assets/images/users/avatar-3.jpg"
                                                         className="me-3 rounded-circle avatar-xs" alt="user-pic"/>
                                                        <Box className="flex-1">
                                                            <a href="#!" className="stretched-link">
                                                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">James
                                                                    Lemire</h6>
                                                            </a>
                                                            <Box className="fs-13 text-muted">
                                                                <p className="mb-1">We talked about a project on
                                                                    linkedin.</p>
                                                            </Box>
                                                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                <span><i className="mdi mdi-clock-outline"></i> 30 min ago</span>
                                                            </p>
                                                        </Box>
                                                        <Box className="px-2 fs-15">
                                                            <Box className="form-check notification-check">
                                                                <input className="form-check-input" type="checkbox"
                                                                       value="" id="messages-notification-check01"/>
                                                                    <label className="form-check-label"
                                                                           htmlFor="messages-notification-check01"></label>
                                                            </Box>
                                                        </Box>
                                                </Box>
                                            </Box>
                                            <Box className="text-reset notification-item d-block dropdown-item">
                                                <Box className="d-flex">
                                                    <img src="assets/images/users/avatar-2.jpg"
                                                         className="me-3 rounded-circle avatar-xs" alt="user-pic"/>
                                                        <Box className="flex-1">
                                                            <a href="#!" className="stretched-link">
                                                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela
                                                                    Bernier</h6>
                                                            </a>
                                                            <Box className="fs-13 text-muted">
                                                                <p className="mb-1">Answered to your comment on the cash
                                                                    flow forecast's
                                                                    graph 🔔.</p>
                                                            </Box>
                                                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                <span><i className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                                                            </p>
                                                        </Box>
                                                        <Box className="px-2 fs-15">
                                                            <Box className="form-check notification-check">
                                                                <input className="form-check-input" type="checkbox"
                                                                       value="" id="messages-notification-check02"/>
                                                                    <label className="form-check-label"
                                                                           htmlFor="messages-notification-check02"></label>
                                                            </Box>
                                                        </Box>
                                                </Box>
                                            </Box>
                                            <Box className="text-reset notification-item d-block dropdown-item">
                                                <Box className="d-flex">
                                                    <img src="assets/images/users/avatar-6.jpg"
                                                         className="me-3 rounded-circle avatar-xs" alt="user-pic"/>
                                                        <Box className="flex-1">
                                                            <a href="#!" className="stretched-link">
                                                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">Kenneth
                                                                    Brown</h6>
                                                            </a>
                                                            <Box className="fs-13 text-muted">
                                                                <p className="mb-1">Mentionned you in his comment on 📃
                                                                    invoice #12501.
                                                                </p>
                                                            </Box>
                                                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                <span><i className="mdi mdi-clock-outline"></i> 10 hrs ago</span>
                                                            </p>
                                                        </Box>
                                                        <Box className="px-2 fs-15">
                                                            <Box className="form-check notification-check">
                                                                <input className="form-check-input" type="checkbox"
                                                                       value="" id="messages-notification-check03"/>
                                                                    <label className="form-check-label"
                                                                           htmlFor="messages-notification-check03"></label>
                                                            </Box>
                                                        </Box>
                                                </Box>
                                            </Box>
                                            <Box className="text-reset notification-item d-block dropdown-item">
                                                <Box className="d-flex">
                                                    <img src="assets/images/users/avatar-8.jpg"
                                                         className="me-3 rounded-circle avatar-xs" alt="user-pic"/>
                                                        <Box className="flex-1">
                                                            <a href="#!" className="stretched-link">
                                                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen
                                                                    Gibson</h6>
                                                            </a>
                                                            <Box className="fs-13 text-muted">
                                                                <p className="mb-1">We talked about a project on
                                                                    linkedin.</p>
                                                            </Box>
                                                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                <span><i className="mdi mdi-clock-outline"></i> 3 days ago</span>
                                                            </p>
                                                        </Box>
                                                        <Box className="px-2 fs-15">
                                                            <Box className="form-check notification-check">
                                                                <input className="form-check-input" type="checkbox"
                                                                       value="" id="messages-notification-check04"/>
                                                                    <label className="form-check-label"
                                                                           htmlFor="messages-notification-check04"></label>
                                                            </Box>
                                                        </Box>
                                                </Box>
                                            </Box>
                                            <Box className="my-3 text-center view-all">
                                                <button type="button"
                                                        className="btn btn-soft-success waves-effect waves-light">View
                                                    All Messages <i className="ri-arrow-right-line align-middle"></i>
                                                </button>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="tab-pane fade p-4" id="alerts-tab" role="tabpanel"
                                         aria-labelledby="alerts-tab"></Box>
                                    <Box className="notification-actions" id="notification-actions">
                                        <Box className="d-flex text-muted justify-content-center">
                                            Select <Box id="select-content"
                                                        className="text-body fw-semibold px-1">0</Box> Result <button
                                            type="button" className="btn btn-link link-danger p-0 ms-3"
                                            data-bs-toggle="modal"
                                            data-bs-target="#removeNotificationModal">Remove</button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="dropdown ms-sm-3 header-item topbar-user">
                            <button type="button" className="btn" id="page-header-user-dropdown"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="d-flex align-items-center">
                            <img className="rounded-circle header-profile-user"
                                 src="assets/images/userDefault.png" alt="Header Avatar"/>
                            <span className="text-start ms-xl-2">
                                <span
                                    className="d-none d-xl-inline-block ms-1 fw-semibold user-name-text">{data.name}</span>
                                <span
                                    className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{data.email}</span>
                            </span>
                        </span>
                            </button>
                            <Box className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="/edit-profile"><i
                                    className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> <span
                                    className="align-middle">Cập nhật thông tin</span></a>
                                <Link className="dropdown-item" to={"#"} onClick={logout}><i
                                    className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                                    className="align-middle" data-key="t-logout">logout</span></Link>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </header>
    )
}

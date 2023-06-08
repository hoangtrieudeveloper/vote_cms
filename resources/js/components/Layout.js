import React, {useContext, createContext, useState, useEffect} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import Login from "./auth/Login";
import Home from "./dashboard/Home";
import Header from "./pages/Header";
import Sidebar from "./pages/Sidebar";
import ErrorScope from "./pages/ErrorScope";
import {authService} from "../model/authService";
import UpdateGroupRole from "./users/group/UpdateGroupRole";
import CreateGroupRole from "./users/group/CreateGroupRole";
import ListGroupRole from "./users/group/ListGroupRole";
//user
import ListUser from "./users/ListUser";
import CreateUser from "./users/CreateUser";
import UpdateUser from "./users/UpdateUser";
//thủ tục đại hội
import ListCongress from "./Congress/Index";
import CreateCongress from "./Congress/Create";
import UpdateCongress from "./Congress/Update";
//báo cáo tờ trình
import ListBcReport from "./Congress/BcReport/Index";
import CreateBcReport from "./Congress/BcReport/Create";
import UpdateBcReport from "./Congress/BcReport/Update";
//thủ tục bế mạc
import ListProcedure from "./Congress/Procedure/Index";
import CreateProcedure from "./Congress/Procedure/Create";
import UpdateProcedure from "./Congress/Procedure/Update";
//tài liệu đại hội
import ListDocuments from "./Congress/Documents/Index";
import CreateDocuments from "./Congress/Documents/Create";
import UpdateDocuments from "./Congress/Documents/Update";

//khai báo thông tin cơ bản
import UpdateInfoBasic from "./Company/InfoBasic/Update";
//cổ đông
import Shareholder from "./Shareholder";
import QuanLyCoDong from "./Shareholder/quanLyCoDong";

//profile
import EditProfile from "./users/profile/EditProfile";
import VoteResult from "./VoteResults/Report/Index";

//kiểm tra tư cách cổ đông
import CheckShareholder from "./CheckShareholder";
import ExportShareHolder from "./CheckShareHolder/exportShareholder";

//Quản lý ủy quyền
import Authority3 from "./Authority/index3";


export default function Layout() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/errorscope">
                        <ErrorScope/>
                    </Route>

                    <PrivateRoute path="/thiet-lap-thong-tin-uy-quyen">
                        <Header/>
                        <Sidebar/>
                        <Authority3/>
                    </PrivateRoute>


                    <PrivateRoute path="/checkin-thu-cong">
                        <Header/>
                        <Sidebar/>
                        <CheckShareholder/>
                    </PrivateRoute>
                    <PrivateRoute path="/export-report-co-dong">
                        <Header/>
                        <Sidebar/>
                        <ExportShareHolder/>
                    </PrivateRoute>

                    <PrivateRoute path="/bien-ban-nghi-quyet">
                        <Header/>
                        <Sidebar/>
                        <VoteResult/>
                    </PrivateRoute>
                    <PrivateRoute path="/khai-bao-thu-tuc-khai-mac">
                        <Header/>
                        <Sidebar/>
                        <ListCongress/>
                    </PrivateRoute>
                    <PrivateRoute path="/tao-moi-thu-tuc-khai-mac">
                        <Header/>
                        <Sidebar/>
                        <CreateCongress/>
                    </PrivateRoute>
                    <PrivateRoute path="/cap-nhat-thu-tuc-khai-mac">
                        <Header/>
                        <Sidebar/>
                        <UpdateCongress/>
                    </PrivateRoute>

                    <PrivateRoute path="/khai-bao-bc-to-trinh">
                        <Header/>
                        <Sidebar/>
                        <ListBcReport/>
                    </PrivateRoute>
                    <PrivateRoute path="/tao-moi-bc-to-trinh">
                        <Header/>
                        <Sidebar/>
                        <CreateBcReport/>
                    </PrivateRoute>
                    <PrivateRoute path="/cap-nhat-bc-to-trinh">
                        <Header/>
                        <Sidebar/>
                        <UpdateBcReport/>
                    </PrivateRoute>

                    <PrivateRoute path="/khai-bao-thu-tuc-be-mac">
                        <Header/>
                        <Sidebar/>
                        <ListProcedure/>
                    </PrivateRoute>
                    <PrivateRoute path="/tao-moi-thu-tuc-be-mac">
                        <Header/>
                        <Sidebar/>
                        <CreateProcedure/>
                    </PrivateRoute>
                    <PrivateRoute path="/cap-nhat-thu-tuc-be-mac">
                        <Header/>
                        <Sidebar/>
                        <UpdateProcedure/>
                    </PrivateRoute>

                    <PrivateRoute path="/khai-bao-tai-lieu-dai-hoi">
                        <Header/>
                        <Sidebar/>
                        <ListDocuments/>
                    </PrivateRoute>
                    <PrivateRoute path="/tao-moi-tai-lieu-dai-hoi">
                        <Header/>
                        <Sidebar/>
                        <CreateDocuments/>
                    </PrivateRoute>
                    <PrivateRoute path="/cap-nhat-tai-lieu-dai-hoi">
                        <Header/>
                        <Sidebar/>
                        <UpdateDocuments/>
                    </PrivateRoute>

                    <PrivateRoute path="/thong-tin-co-ban">
                        <Header/>
                        <Sidebar/>
                        <UpdateInfoBasic/>
                    </PrivateRoute>

                    <PrivateRoute path="/edit-profile">
                        <Header/>
                        <Sidebar/>
                        <EditProfile/>
                    </PrivateRoute>
                    <PrivateRoute path="/listuser">
                        <Header/>
                        <Sidebar/>
                        <ListUser/>
                    </PrivateRoute>
                    <PrivateRoute path="/createuser">
                        <Header/>
                        <Sidebar/>
                        <CreateUser/>
                    </PrivateRoute>
                    <PrivateRoute path="/updateuser">
                        <Header/>
                        <Sidebar/>
                        <UpdateUser/>
                    </PrivateRoute>
                    <PrivateRoute path="/list-group-role">
                        <Header/>
                        <Sidebar/>
                        <ListGroupRole/>
                    </PrivateRoute>
                    <PrivateRoute path="/create-group-role">
                        <Header/>
                        <Sidebar/>
                        <CreateGroupRole/>
                    </PrivateRoute>
                    <PrivateRoute path="/update-group-role">
                        <Header/>
                        <Sidebar/>
                        <UpdateGroupRole/>
                    </PrivateRoute>
                    {/*co dong */}
                    <PrivateRoute path="/danh-sach-co-dong">
                        <Header/>
                        <Sidebar/>
                        <Shareholder/>
                    </PrivateRoute>
                    <PrivateRoute path="/quan-ly-co-dong">
                        <Header/>
                        <Sidebar/>
                        <QuanLyCoDong/>
                    </PrivateRoute>
                    <PrivateRoute path="/">
                        <Header/>
                        <Sidebar/>
                        <Home/>
                    </PrivateRoute>
                </Switch>
            </div>
        </Router>
    );
}

function PrivateRoute({children, ...rest}) {
    let auth = localStorage.getItem('user');
    getUserInfoAndCheckScopes(rest.path);
    return (
        <Route
            {...rest}
            render={({location}) =>
                auth && auth != null && auth !== 'undefined' ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

const getUserInfoAndCheckScopes = (path) => {
    if (path === '/' || path === undefined) path = '/index';
    let route = path.replace('/', '');
    let history = useHistory();
    let auth = localStorage.getItem('user');
    if (auth && auth != null && auth !== 'undefined') {
        authService.getInfoReloadPage()
            .then(
                data => {
                    if (data.status === 1) {
                        if ((route !== 'index') && !data?.data?.scopes.includes(route)) history.push('/errorscope');
                        localStorage.setItem("scopes", JSON.stringify(data.data.scopes));
                        let objectUser = JSON.parse(localStorage.getItem('user'));
                        localStorage.setItem("user", JSON.stringify({
                            ...objectUser,
                            name: data.data.name,
                            email: data.data.email,
                            phone_number: data.data.phone_number,
                            company_name: data.data.company.name_vn,
                            company_phone: data.data.company.phone_number,
                            company_header: data.data.company.header_company,
                            company_fax: data.data.company.number_fax,
                        }));
                    } else {
                        localStorage.removeItem('user');
                        localStorage.removeItem('scopes');
                        history.push('/login');
                    }
                }
            );
    }
}

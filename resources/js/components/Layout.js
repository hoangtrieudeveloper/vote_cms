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
import ListUser from "./users/ListUser";
import CreateUser from "./users/CreateUser";
import UpdateUser from "./users/UpdateUser";
//thủ tục đại hội
import ListCongress from "./Congress/Index";
import CreateCongress from "./Congress/Create";
import UpdateCongress from "./Congress/Update";
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

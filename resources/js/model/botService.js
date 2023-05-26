import GlobalSetting from "../components/pages/GlobalSetting";
import {userService} from "./userService";

export const botService = {
    register,
    getList,
    getDetailChat,
    getListChat,
    getById,
    update,
    deleted
};
let user = JSON.parse(localStorage.getItem('user'));
function deleted(id) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/deleteBot?id=` + id, requestOptions).then(handleResponse);
}
function register(object) {
    object.id_user_created = user.id;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(object)
    };

    return fetch(`${GlobalSetting.url}api/registerBot`, requestOptions).then(handleResponse);
}
function update(user) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(user)
    };

    return fetch(`${GlobalSetting.url}api/updateBot`, requestOptions).then(handleResponse);
}
function getList(object,page) {
    object.id = user.id;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(object)
    };

    return fetch(`${GlobalSetting.url}api/getListBot?page=`+page, requestOptions).then(handleResponse);
}
function getDetailChat(object) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(object)
    };

    return fetch(`${GlobalSetting.url}api/getDetailChat`, requestOptions).then(handleResponse);
}

function getListChat(object) {
    object.id = user.id;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(object)
    };

    return fetch(`${GlobalSetting.url}api/getListChat`, requestOptions).then(handleResponse);
}
function getById(id) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(id)
    };

    return fetch(`${GlobalSetting.url}api/getByIdBot`, requestOptions).then(handleResponse);
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = response.ok ? JSON.parse(text) : text;
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                localStorage.removeItem('user');
                localStorage.removeItem('scopes');
                localStorage.removeItem('region');
                location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function authHeader() {
    if (user && user.remember_token) {
        return {'Content-Type': 'application/json','Authorization': 'Bearer ' + user.remember_token};
    } else {
        return {};
    }
}

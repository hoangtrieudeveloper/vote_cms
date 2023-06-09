import GlobalSetting from "../components/pages/GlobalSetting";
import {userService} from "./userService";

export const AuthorityService = {
    uploadFileAction,
    getAccountAuthority,
    register,
    getListById,
    edit,
    getAllUserShareHolder
};
let user = JSON.parse(localStorage.getItem('user'));
let api = "authority";


function getAllUserShareHolder(page,nameSearch) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/getAllUserShareHolder?page=${page}&nameSearch=${nameSearch}`, requestOptions).then(handleResponse);
}
function edit(object) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(object)
    };
    return fetch(`${GlobalSetting.url}api/${api}/edit`, requestOptions).then(handleResponse);
}
function getListById(id) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
    };
    return fetch(`${GlobalSetting.url}api/${api}/getListById?id=${id}`, requestOptions).then(handleResponse);
}
function register(object) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(object)
    };
    return fetch(`${GlobalSetting.url}api/${api}/created`, requestOptions).then(handleResponse);
}
function getAccountAuthority(page,nameSearch) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/getList?page=${page}&nameSearch=${nameSearch}`, requestOptions).then(handleResponse);
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
                location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function uploadFileAction(file) {
    let formData = new FormData();
    formData.append('file', file);
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': 'Bearer ' + user.remember_token},
        body: formData
    };
    return fetch(`${GlobalSetting.url}api/info-basic/uploadFile`, requestOptions).then(handleResponse);
}

function authHeader() {
    if (user && user.remember_token) {
        return {'Content-Type': 'application/json','Authorization': 'Bearer ' + user.remember_token};
    } else {
        return {};
    }
}

import GlobalSetting from "../components/pages/GlobalSetting";
import {userService} from "./userService";

export const congressService = {
    register,
    getList,
    getByIdCongress,
    update,
    deleted,
    uploadFileAction,
};
let user = JSON.parse(localStorage.getItem('user'));
function deleted(id) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/congress/delete?id=` + id, requestOptions).then(handleResponse);
}
function register(object) {
    object.user_id = user.id;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(object)
    };
    return fetch(`${GlobalSetting.url}api/congress/created`, requestOptions).then(handleResponse);
}
function update(user) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(user)
    };

    return fetch(`${GlobalSetting.url}api/congress/update`, requestOptions).then(handleResponse);
}
function getList(page) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/congress/getList?page=`+page, requestOptions).then(handleResponse);
}
function getByIdCongress(id) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(id)
    };

    return fetch(`${GlobalSetting.url}api/congress/getById`, requestOptions).then(handleResponse);
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
    return fetch(`${GlobalSetting.url}api/congress/uploadFile`, requestOptions).then(handleResponse);
}

function authHeader() {
    if (user && user.remember_token) {
        return {'Content-Type': 'application/json','Authorization': 'Bearer ' + user.remember_token};
    } else {
        return {};
    }
}

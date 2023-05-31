import GlobalSetting from "../components/pages/GlobalSetting";
import {userService} from "./userService";

export const infoBasicService = {
    getById,
    update,
    uploadFileAction,
};
let user = JSON.parse(localStorage.getItem('user'));
function update(user) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(user)
    };

    return fetch(`${GlobalSetting.url}api/info-basic/update`, requestOptions).then(handleResponse);
}
function getById() {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
    };

    return fetch(`${GlobalSetting.url}api/info-basic/getById`, requestOptions).then(handleResponse);
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

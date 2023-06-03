import GlobalSetting from "../components/pages/GlobalSetting";
import {userService} from "./userService";

export const userShareholderService = {
    getListCheckin,
    getListById,
    getList,
    getListType,
    getListOrganization,
    importShareHolder,
    getListByReport,
    UpdateBlock
};
let user = JSON.parse(localStorage.getItem('user'));
let api = "shareholder";

function getListById(id) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/getListById?id=${id}`, requestOptions).then(handleResponse);
}

function UpdateBlock(user_share_id,status,congress_id) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
    };

    return fetch(`${GlobalSetting.url}api/${api}/updateBlock?user_share_id=${user_share_id}&status=${status}&congress_id=${congress_id}`, requestOptions).then(handleResponse);
}
function getListByReport(id,page,name, block) {
    console.log('block',block);
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/getListReport?page=${page}&id=${id}&name=${name}&block=${block}`, requestOptions).then(handleResponse);
}
function getListCheckin(page, name, checkin) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/getListCheckin?page=${page}&name=${name}&checkin=${checkin}`, requestOptions).then(handleResponse);
}

function getList(page, name, type, organization) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/getList?page=${page}&name=${name}&type=${type}&organization=${organization}`, requestOptions).then(handleResponse);
}

function getListType() {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/getListType`, requestOptions).then(handleResponse);
}

function getListOrganization() {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/getListOrganization`, requestOptions).then(handleResponse);
}


function importShareHolder(file) {
    let formData = new FormData();
    formData.append('file', file);
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': 'Bearer ' + user.remember_token},
        body: formData
    };
    return fetch(`${GlobalSetting.url}api/${api}/importShareHolder`, requestOptions).then(handleResponse);
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
        if (data?.data == null || data?.data == undefined) {
            return {
                data: '',
                status: 2,
                message: 'Không tìm thấy dữ liệu'
            }
        }
        return data;
    });
}

function authHeader() {
    if (user && user.remember_token) {
        return {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.remember_token};
    } else {
        return {};
    }
}

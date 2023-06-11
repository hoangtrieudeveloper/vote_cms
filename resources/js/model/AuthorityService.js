import GlobalSetting from "../components/pages/GlobalSetting";
import {userService} from "./userService";

export const AuthorityService = {
    uploadFileAction,
    getAccountAuthority,
    register,
    getListById,
    edit,
    getAllUserShareHolder,
    getUserAuthorByShareHolder,
    getAuthor,
    getByIdAuthor,
    addShare,
    getListAuthor,
    downloadUyQuyenDemo,
    importAuthorHolder,
    downloadFileExcel,
    changeStatusAuthor
};
let user = JSON.parse(localStorage.getItem('user'));
let api = "authority";

function changeStatusAuthor(id, status) {
    const requestOptions = {
        method: 'POST',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/changeStatusAuthor?id=${id}&status=${status}`, requestOptions).then(handleResponse);
}

function downloadFileExcel() {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'blob',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/downloadFileExcel`, requestOptions).then(response => {
        let blob = response.blob();
        if (response.ok && blob != null && blob != undefined) {
            return blob;
        }
        return Promise.reject(response);
    }).then(blob => {
        if (blob != null && blob != undefined) {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "DS_Uy_Quyen.xlsx";
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove();  //afterwards we remove the element again
            return true;
        }
        return Promise.reject(blob);
    }).catch(response => {
        console.log(response);
    });
}
function importAuthorHolder(file) {
    let formData = new FormData();
    formData.append('file', file);
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': 'Bearer ' + user.remember_token},
        body: formData
    };
    return fetch(`${GlobalSetting.url}api/${api}/importAuthorHolder`, requestOptions).then(handleResponse);
}
function downloadUyQuyenDemo() {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'blob',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/downloadUyQuyenDemo`, requestOptions).then(response => {
        let blob = response.blob();
        if (response.ok && blob != null && blob != undefined) {
            return blob;
        }
        return Promise.reject(response);
    }).then(blob => {
        if (blob != null && blob != undefined) {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "DanhsachUyquyen.xlsx";
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove();  //afterwards we remove the element again
            return true;
        }
        return Promise.reject(blob);
    }).catch(response => {
        console.log(response);
    });
}


function getListAuthor(page, name, status,author) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/getListAuthor?page=${page}&name=${name}&status=${status}&author=${author}`, requestOptions).then(handleResponse);
}

function addShare(object) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(object)
    };
    return fetch(`${GlobalSetting.url}api/${api}/addShare`, requestOptions).then(handleResponse);
}
function getByIdAuthor(id) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
    };
    return fetch(`${GlobalSetting.url}api/${api}/getByIdAuthor?id=${id}`, requestOptions).then(handleResponse);
}
function getAuthor() {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/getAuthor`, requestOptions).then(handleResponse);
}
function getUserAuthorByShareHolder(page,id) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/getUserAuthorByShareHolder?page=${page}&id=${id}`, requestOptions).then(handleResponse);
}
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

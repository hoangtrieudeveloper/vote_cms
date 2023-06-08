import GlobalSetting from "../components/pages/GlobalSetting";
import {userService} from "./userService";

export const userShareholderService = {
    getTkLogin,
    CheckIn,
    getListCheckin,
    getListById,
    getList,
    getListType,
    getListOrganization,
    importShareHolder,
    exportPWCD,
    getListByReport,
    UpdateBlock,
    downloadCoDongDemo,
    getListStatus,
    getListVoteStatus,
    getListAuthority,
    getListJointTypes,
    exportCoDong
};
let user = JSON.parse(localStorage.getItem('user'));
let api = "shareholder";

function getTkLogin(id) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/pdf',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/getTkLogin?id=${id}`, requestOptions).then(response => {
        let blob = response.blob();
        if (response.ok && blob != null && blob != undefined) {
            return blob;
        }
        return Promise.reject(response);
    }).then(blob => {
        if (blob != null && blob != undefined) {
            var fileURL = window.URL.createObjectURL(blob);
            window.open(fileURL,"_blank");
            return true;
        }
        return Promise.reject(blob);
    }).catch(response => {
        console.log(response);
    });
}

function CheckIn(id) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/checkIn?id=${id}`, requestOptions).then(handleResponse);
}
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

function getListVoteStatus() {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/getListVoteStatus`, requestOptions).then(handleResponse);
}

function getListStatus() {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/getListStatus`, requestOptions).then(handleResponse);
}

function getListJointTypes() {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/getListJointTypes`, requestOptions).then(handleResponse);
}

function getListAuthority() {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/getListAuthority`, requestOptions).then(handleResponse);
}

function downloadCoDongDemo() {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'blob',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/downloadDemoCoDong`, requestOptions).then(response => {
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
            a.download = "DanhsachcodongDemo.xlsx";
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

function exportPWCD() {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'blob',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/exportPWCD`, requestOptions).then(response => {
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
            a.download = "Danh_Sach_Mat_Khau_Co_Dong.xlsx";
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

function exportCoDong() {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'blob',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/exportDSCD`, requestOptions).then(response => {
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
            a.download = "Danh_sach_co_dong.xlsx";
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

function lockChangePassword() {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/${api}/lockChangePassword`, requestOptions).then(handleResponse);
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

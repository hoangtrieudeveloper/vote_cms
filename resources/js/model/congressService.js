import GlobalSetting from "../components/pages/GlobalSetting";
import {userService} from "./userService";

export const congressService = {
    register,
    getList,
    getByIdCongress,
    update,
    deleted,

    registerBcReport,
    getListBcReport,
    getByIdBcReport,
    updateBcReport,
    deletedBcReport,

    registerProcedure,
    getListProcedure,
    getByIdProcedure,
    updateProcedure,
    deletedProcedure,

    registerDocuments,
    getListDocuments,
    getByIdDocuments,
    updateDocuments,
    deletedDocuments,

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

//bc-Report
function deletedBcReport(id) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/bc-report/delete?id=` + id, requestOptions).then(handleResponse);
}
function registerBcReport(object) {
    object.user_id = user.id;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(object)
    };
    return fetch(`${GlobalSetting.url}api/bc-report/created`, requestOptions).then(handleResponse);
}
function updateBcReport(user) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(user)
    };

    return fetch(`${GlobalSetting.url}api/bc-report/update`, requestOptions).then(handleResponse);
}
function getListBcReport(page) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/bc-report/getList?page=`+page, requestOptions).then(handleResponse);
}
function getByIdBcReport(id) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(id)
    };

    return fetch(`${GlobalSetting.url}api/bc-report/getById`, requestOptions).then(handleResponse);
}
//End bd-Report


//Procedure
function deletedProcedure(id) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/procedure/delete?id=` + id, requestOptions).then(handleResponse);
}
function registerProcedure(object) {
    object.user_id = user.id;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(object)
    };
    return fetch(`${GlobalSetting.url}api/procedure/created`, requestOptions).then(handleResponse);
}
function updateProcedure(user) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(user)
    };

    return fetch(`${GlobalSetting.url}api/procedure/update`, requestOptions).then(handleResponse);
}
function getListProcedure(page) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/procedure/getList?page=`+page, requestOptions).then(handleResponse);
}
function getByIdProcedure(id) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(id)
    };

    return fetch(`${GlobalSetting.url}api/procedure/getById`, requestOptions).then(handleResponse);
}
// End Procedure

//Documents
function deletedDocuments(id) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/congress-document/delete?id=` + id, requestOptions).then(handleResponse);
}
function registerDocuments(object) {
    object.user_id = user.id;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(object)
    };
    return fetch(`${GlobalSetting.url}api/congress-document/created`, requestOptions).then(handleResponse);
}
function updateDocuments(user) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(user)
    };

    return fetch(`${GlobalSetting.url}api/congress-document/update`, requestOptions).then(handleResponse);
}
function getListDocuments(page) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/congress-document/getList?page=`+page, requestOptions).then(handleResponse);
}
function getByIdDocuments(id) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(id)
    };

    return fetch(`${GlobalSetting.url}api/congress-document/getById`, requestOptions).then(handleResponse);
}
//End Documents







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

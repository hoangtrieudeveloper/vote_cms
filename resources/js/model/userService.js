import GlobalSetting from "../components/pages/GlobalSetting";

export const userService = {
    login,
    logout,
    deleteUser,
    getListUser,
    getListGroupRole,
    registerUser,
    getByIdUser,
    updateUser,
    getListGroupUser,
    deleteGroupUser,
    getListTreeGroupRole,
    createGroupUser,
    getByidGroupRole,
    updateGroupRole,
    uploadFileAction
};
let user = JSON.parse(localStorage.getItem('user'));
function uploadFileAction(file) {
    let formData = new FormData();
    formData.append('file', file);
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': 'Bearer ' + user.remember_token},
        body: formData
    };
    return fetch(`${GlobalSetting.url}api/uploadFile`, requestOptions).then(handleResponse);
}
function updateGroupRole(object) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(object)
    };

    return fetch(`${GlobalSetting.url}api/updateGroupUser`, requestOptions).then(handleResponse);
}
function getByidGroupRole(id) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(id)
    };

    return fetch(`${GlobalSetting.url}api/getByIdGroupUser`, requestOptions).then(handleResponse);
}
function createGroupUser(object) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(object)
    };

    return fetch(`${GlobalSetting.url}api/createGroupUser`, requestOptions).then(handleResponse);
}
function getListTreeGroupRole() {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/getListGroupCreated`, requestOptions).then(handleResponse);
}

function deleteGroupUser(id) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/deleteGroupUser?id=` + id, requestOptions).then(handleResponse);
}
function getListGroupUser() {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/getListGroup`, requestOptions).then(handleResponse);
}
function updateUser(user) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(user)
    };

    return fetch(`${GlobalSetting.url}api/updateUser`, requestOptions).then(handleResponse);
}
function getByIdUser(id) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(id)
    };

    return fetch(`${GlobalSetting.url}api/getByIdUser`, requestOptions).then(handleResponse);
}
function registerUser(object) {
    object.id_user_created = user.id;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(object)
    };

    return fetch(`${GlobalSetting.url}api/registerUser`, requestOptions).then(handleResponse);
}
function getListUser(page) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/getListUser?page=` + page, requestOptions).then(handleResponse);
}

function getListGroupRole() {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/getListGroupRole`, requestOptions).then(handleResponse);
}

function deleteUser(id) {
    const requestOptions = {
        method: 'GET',
        'Content-Type': 'application/json',
        headers: authHeader()
    };

    return fetch(`${GlobalSetting.url}api/deleteUser?id=` + id, requestOptions).then(handleResponse);
}

function login(data) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    return fetch(`${GlobalSetting.url}api/login-api`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

function logout() {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
    };

    return fetch(`${GlobalSetting.url}api/logout`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = response.ok ? JSON.parse(text) : text;
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
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

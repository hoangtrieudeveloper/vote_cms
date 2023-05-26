import GlobalSetting from "../components/pages/GlobalSetting";
import {userService} from "./userService";
export const authService = {
    getInfoReloadPage
};
let user = JSON.parse(localStorage.getItem('user'));
function getInfoReloadPage() {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
    };
    return fetch(`${GlobalSetting.url}api/getInfo?id=` + user.id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = response.ok ? JSON.parse(text) : text;
        if (!response.ok) {
            if (response.status === 401 || response.status === 500) {
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

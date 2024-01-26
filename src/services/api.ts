import {BACKEND_BASE_URL} from "../constants";

const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then(error => Promise.reject(error));
}
export const request = (endpoint: string, options?: any) => {
    return fetch(BACKEND_BASE_URL + endpoint, options).then(checkResponse)
}
export const refreshToken = async () => {
    try {
        const res = await request('auth/token', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', "Accept": 'application/json'},
            body: JSON.stringify({
                "token": localStorage.getItem('refreshToken')
            })
        })
        localStorage.setItem("accessToken", JSON.stringify(res.accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(res.refreshToken));
        return res;
    }
    catch(err) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return Promise.reject(err)
    }
}
import Cookies from 'js-cookie';

type key = 'accessToken' | 'refreshToken'

export const setToken = (token: string, name: key) => {
    Cookies.set(name, token);
}

export const getToken = (name: key = 'accessToken') => {
    return Cookies.get(name);
}

export const deleteToken = (name : key) => {
    return Cookies.remove(name);
}
import axios from 'axios';
import env from 'src/config/env';
import {getToken} from "src/utils/token";

const API = axios.create({
    baseURL: env.baseURL,

});


API.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`

// API.interceptors.request.use(function (config) {
//     try {
//         config?.headers && (config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`);
//     } catch (e) {
//
//     }
//     return config;
//
// })

export default API;

import API from 'src/config/network';
import {FormLoginType, FormRegisterType} from 'src/features/auth/types';

export const fetchLogin = (data: FormLoginType) => {
    return API.post('/v1/login', data);
};

export const fetchRegister = (data: FormRegisterType) => {
    return API.post('/v1/register', data);
};

export const fetchMe = () => {
    return API.get('/v1/me');
}
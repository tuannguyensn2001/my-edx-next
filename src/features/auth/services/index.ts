import API from 'src/config/network';
import { FormLoginType, FormRegisterType } from 'src/features/auth/types';

export const fetchLogin = (data: FormLoginType) => {
  return API.post('/v1/login', data);
};

export const fetchRegister = (data: FormRegisterType) => {
  return API.post('http://localhost:5000/api/v1/register', data);
};
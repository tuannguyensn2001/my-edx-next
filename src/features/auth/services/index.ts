import API from 'src/config/network';
import { FormLoginType } from 'src/features/auth/types';

export const fetchLogin = (data: FormLoginType) => {
  return API.post('/v1/login', data);
};

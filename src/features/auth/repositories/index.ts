import { AxiosResponse } from 'axios';
import { fetchLogin, fetchRegister } from 'src/features/auth/services';
import { FormLoginType, FormRegisterType } from 'src/features/auth/types';
import { ResponseLogin } from 'src/features/auth/types/login';
import { ResponseRegister } from 'src/features/auth/types/register'
import { Response } from 'src/types/response';

export const getLogin = async (
  data: FormLoginType
): Promise<Response<ResponseLogin>> => {
  const response: AxiosResponse<Response<ResponseLogin>> = await fetchLogin(
    data
  );
  return response.data;
};

export const getRegister = async (data: FormRegisterType): Promise<Response<ResponseRegister>> => {
  const response: AxiosResponse<Response<ResponseRegister>> = await fetchRegister(data)
  return response.data
}

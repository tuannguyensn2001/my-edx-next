import { AxiosResponse } from 'axios';
import { fetchLogin } from 'src/features/auth/services';
import { FormLoginType } from 'src/features/auth/types';
import { ResponseLogin } from 'src/features/auth/types/login';
import { Response } from 'src/types/response';

export const getLogin = async (
  data: FormLoginType
): Promise<Response<ResponseLogin>> => {
  const response: AxiosResponse<Response<ResponseLogin>> = await fetchLogin(
    data
  );
  return response.data;
};

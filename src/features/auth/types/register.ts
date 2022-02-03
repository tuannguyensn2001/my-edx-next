import { IUser } from 'src/models/IUser';

export interface ResponseRegister {
  access_token: string;
  refresh_token: string;
  user: IUser;
}

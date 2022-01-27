import { IUser } from 'src/models/IUser';

export interface ResponseLogin {
  access_token: string;
  refresh_token: string;
  user: IUser;
}

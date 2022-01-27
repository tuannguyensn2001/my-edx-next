export interface FormLoginType {
  email: string;
  password: string;
}

export interface FormSignUpType {
  name: string;
  email: string;
  password: string;
  confirm: string;
  role: string;
}

export interface FormErrorType {
  message: string | undefined;
}
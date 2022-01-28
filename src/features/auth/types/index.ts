import { AlertColor } from "@mui/material";

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

export interface FormLoadingType {
  loading: boolean;
}

export interface ToastMessage {
  message: string;
  severity: AlertColor | undefined;
}
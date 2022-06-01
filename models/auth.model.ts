import { UserData } from "./user.model";

export interface SignIn {
  [x: string]: any;
  status: string;
  result: string;
  token: string;
  error?: string;
  fullname: string;
  user: UserData;
  data: any;
}

export interface SignUp {
  [x: string]: any;
  result: string;
  error?: string;
}

export interface GetSession {
  data: any;
  result: string;
  error?: string;
  user?: UserData;
}

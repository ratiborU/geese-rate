import { createContext } from 'react';

export interface IAuthContext {
  isAuth: boolean;
  role: 'admin' | 'teacher' | '';
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  role: ''
});
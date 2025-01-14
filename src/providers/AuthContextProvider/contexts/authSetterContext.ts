import { createContext } from 'react';

export interface IAuthSetterContext {
  setIsAuth: (value: boolean) => void;
  setRole: (value: 'admin' | 'teacher' | '') => void;
}

export const AuthSetterContext = createContext<IAuthSetterContext>({
  setIsAuth: () => { },
  setRole: () => { },
});
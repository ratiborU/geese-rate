import { createContext } from 'react';
import { IUserResponse } from '../../../services/userService';

export interface IUserSetterContext {
  setUser: (value: IUserResponse) => void;
}

export const UserSetterContext = createContext<IUserSetterContext>({
  setUser: () => { },
});
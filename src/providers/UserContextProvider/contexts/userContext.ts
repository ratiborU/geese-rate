import { createContext } from 'react';
import { IUserResponse } from '../../../services/userService';

export interface IUserContext {
  user: IUserResponse | null;
}

export const UserContext = createContext<IUserContext>({
  user: null,
});
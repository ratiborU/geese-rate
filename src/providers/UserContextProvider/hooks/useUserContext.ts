import { useContext } from 'react';
import { UserContext, IUserContext } from '../contexts/userContext.ts';

export const useUserContext = () => useContext<IUserContext>(UserContext);
import { useContext } from 'react';
import { AuthContext, IAuthContext } from '../contexts/authContext.ts';

export const useAuthContext = () => useContext<IAuthContext>(AuthContext);
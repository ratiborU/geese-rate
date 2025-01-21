import { useContext } from 'react';
import { AuthSetterContext, IAuthSetterContext } from '../contexts/authSetterContext.ts';

export const useAuthSetterContext = () => useContext<IAuthSetterContext>(AuthSetterContext);
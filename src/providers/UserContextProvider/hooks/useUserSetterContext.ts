import { useContext } from 'react';
import { UserSetterContext, IUserSetterContext } from '../contexts/userSetterContext.ts';

export const useUserSetterContext = () => useContext<IUserSetterContext>(UserSetterContext);
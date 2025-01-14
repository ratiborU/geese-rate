import { FC, ReactNode, useMemo, useState } from 'react';
import { AuthContext } from './contexts/authContext';
import { AuthSetterContext } from './contexts/authSetterContext';
import { UserSecretStorageService } from '../../lib/helpers/userSecretStorageService';
import { LocalStorageService } from '../../lib/helpers/localStorageService';
import { IUserResponse } from '../../services/userService';


interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = (props) => {
  const { children } = props;
  const user: IUserResponse | null = LocalStorageService.get('user');
  const [isAuth, setIsAuth] = useState(!!UserSecretStorageService.get());
  const [role, setRole] = useState<'admin' | 'teacher' | ''>(user?.role as "admin" | "teacher" | "");

  const value = useMemo(() => ({ isAuth, role }), [isAuth, role]);
  const setterValue = { setIsAuth, setRole };

  return (
    <AuthContext.Provider value={value}>
      <AuthSetterContext.Provider value={setterValue}>
        {children}
      </AuthSetterContext.Provider>
    </AuthContext.Provider>
  );
};
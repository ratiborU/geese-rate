import { FC, ReactNode, useMemo, useState } from 'react';
import { UserContext } from './contexts/userContext';
import { UserSetterContext } from './contexts/userSetterContext';
// import { UserSecretStorageService } from '../../lib/helpers/userSecretStorageService';
import { LocalStorageService } from '../../lib/helpers/localStorageService';
import { IUserResponse } from '../../services/userService';


interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: FC<UserContextProviderProps> = (props) => {
  const { children } = props;
  const [user, setUser] = useState<IUserResponse | null>(LocalStorageService.get('user'));
  // const [isAuth, setIsAuth] = useState(!!UserSecretStorageService.get());
  // const [role, setRole] = useState<'admin' | 'teacher' | ''>(user?.role as "admin" | "teacher" | "");

  const value = useMemo(() => ({ user }), [user]);
  const setterValue = { setUser };

  return (
    <UserContext.Provider value={value}>
      <UserSetterContext.Provider value={setterValue}>
        {children}
      </UserSetterContext.Provider>
    </UserContext.Provider>
  );
};
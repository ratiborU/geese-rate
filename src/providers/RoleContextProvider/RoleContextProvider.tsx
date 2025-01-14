// import { FC, ReactNode, useMemo, useState } from 'react';
// import { RoleContext } from './contexts/employeesContext';
// import { RoleSetterContext } from './contexts/employeesSetterContext';

// interface RoleContextProviderProps {
//   children: ReactNode;
// }

// export const RoleContextProvider: FC<RoleContextProviderProps> = (props) => {
//   const { children } = props;
//   const [role, setRole] = useState<'admin' | 'teacher' | ''>('');
//   // const [search, setSearch] = useState('');
//   // const [isBooked, setIsBooked] = useState<boolean | null>(null);

//   const value = useMemo(() => ({ role }), [role]);
//   const setterValue = { setRole };

//   return (
//     <RoleContext.Provider value={value}>
//       <RoleSetterContext.Provider value={setterValue}>
//         {children}
//       </RoleSetterContext.Provider>
//     </RoleContext.Provider>
//   );
// };
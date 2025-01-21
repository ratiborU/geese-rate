import { ReactNode, useEffect } from 'react';
import { useAuthContext } from '../../providers/AuthContextProvider/hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = {
  role?: string,
  element: ReactNode,
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { role = '', element } = props
  const auth = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!auth.role && auth.role != role && role != '') {
      navigate("/", { replace: true });
    }
  }, [auth.role, navigate, role]);

  return element;
};

export default ProtectedRoute;
import { useAuth } from '../contexts/AuthContext';

const useCustomAuth = () => {
  const auth = useAuth();
  return auth;
};

export default useCustomAuth;
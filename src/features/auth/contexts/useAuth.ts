import { useContext } from 'react';
import { AuthContext } from './authContext';
import type { AuthContextType } from './authContext';

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};


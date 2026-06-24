import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

export const useRequireAuth = (authCondition: (user: ReturnType<typeof useAuth>['user']) => boolean): void => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !authCondition(user)) {
      navigate('/');
    }
  }, [user, loading, authCondition, navigate]);
};

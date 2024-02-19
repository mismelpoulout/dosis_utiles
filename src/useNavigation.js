import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
  const navigate = useNavigate();

  const handleNavigate = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  return {
    handleNavigate,
  };
};

export default useNavigation;

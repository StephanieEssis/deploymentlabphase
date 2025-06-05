import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

export const useAppContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AuthProvider');
  }
  return context;
}; 
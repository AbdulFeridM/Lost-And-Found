import { createContext, useContext, useEffect, useState } from 'react';
import api from '../config/api';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const UsersContext = createContext();

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) throw new Error('useUsers must be used within a UsersProvider');
  return context;
};

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchUsers = async () => {
    if (!user || user.role !== 'admin') return;
    setLoading(true);
    try {
      const users = await api.get('/users');
      setUsers(users);
      
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!id) return;
    try {
      await api.delete(`/users/${id}`);
      toast.success('User deleted successfully!');
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Delete user error:', error);
      toast.error('Failed to delete user');
    }
  };

  return (
    <UsersContext.Provider value={{ users, loading, fetchUsers, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
};

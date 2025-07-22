import { createContext, useContext, useEffect, useState } from 'react';
import api from '../config/api';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const StatsContext = createContext();

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) throw new Error('useStats must be used within a StatsProvider');
  return context;
};

export const StatsProvider = ({ children }) => {
  const [stats, setStats] = useState([]);
  const [loadingStats, setLoadingStats] = useState(false);
  const { user } = useAuth();

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const userId = user?.id;
      const endpoint = userId ? `/stats?userId=${userId}` : '/stats';

      const { posts, found, claimed, total } = await api.get(endpoint);
    
      setStats([
        { type: 'posts', count: posts, label: 'Lost Items' },
        { type: 'found', count: found, label: 'Found Items' },
        { type: 'claimed', count: claimed, label: 'Claimed Items' },
        { type: 'total', count: total, label: 'Total Items' },
      ]);
    } catch (error) {
      console.error('Fetch stats error:', error);
      toast.error('Failed to fetch item stats');
    } finally {
      setLoadingStats(false);
    }
  };


  const fetchAdminStats = async () => {
    setLoadingStats(true);
    try {
      const {users, rejected, approved, total, pending  } = await api.get('/stats/admin');
      setStats([
        { type: 'users', count: users, label: 'Total Users' },
        { type: 'rejected', count: rejected, label: 'Rejected Items' },
        { type: 'approved', count: approved, label: 'Approved Items' },
        { type: 'pending', count: pending, label: 'Pending Items' },
        { type: 'total', count: total, label: 'Total Items' },
      ]);
    } catch (error) {
      console.error('Fetch admin stats error:', error);
      toast.error('Failed to fetch admin stats');
    }
    finally {
      setLoadingStats(false);
    }
  };

  return (
    <StatsContext.Provider value={{ stats, loadingStats, fetchStats , fetchAdminStats }}>
      {children}
    </StatsContext.Provider>
  );
};

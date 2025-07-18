import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import api from '../config/api';
import toast from 'react-hot-toast';

const ItemsContext = createContext();

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchItems = async (filters = {}) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await api.get(`/items?${queryParams.toString()}`);
      setItems(response.data);
    } catch (error) {
      console.error('Fetch items error:', error);
      toast.error('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (itemData) => {
    try {
      const formData = new FormData();
      
      Object.keys(itemData).forEach(key => {
        if (itemData[key] !== null && itemData[key] !== undefined) {
          formData.append(key, itemData[key]);
        }
      });

      const response = await api.post('/items', formData);
      
      if (response.data.status === 'approved' || user.role === 'admin') {
        setItems(prev => [response.data, ...prev]);
      }
      
      toast.success('Item posted successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.message || 'Failed to post item');
      return { success: false, message: error.message };
    }
  };

  const claimItem = async (id) => {
    try {
      const response = await api.post(`/items/${id}/claim`);
      
      setItems(prev => prev.map(item => 
        item._id === id ? response.data : item
      ));
      
      toast.success('Item claimed successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.message || 'Failed to claim item');
      return { success: false, message: error.message };
    }
  };

  const value = {
    items,
    loading,
    fetchItems,
    addItem,
    claimItem,
  };

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
};
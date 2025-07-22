import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import api from '../config/api';
import toast from 'react-hot-toast';

const ItemsContext = createContext();

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) throw new Error('useItems must be used within an ItemsProvider');
  return context;
};

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latestItems, setLatestItems] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 12,
  });

  const { user } = useAuth();
  console.log('User in ItemsContext:', user);

  const fetchItems = async (filters = {}, page = 1) => {
    if (!user) return;
    const path = user?.role === 'admin' ? '/items/all' : '/items';
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') {
          queryParams.append(key, value);
        }
      });

      queryParams.append('page', page);
      queryParams.append('limit', pagination.limit);

      const res = await api.get(`${path}?${queryParams.toString()}`);
      const { items, currentPage, totalPages, total } = res;

      setItems(items);
      setPagination({
        currentPage,
        totalPages,
        totalItems: total,
        limit: pagination.limit,
      });
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (itemData) => {
    try {
      console.log('Adding item:', itemData);


      const  {message, item} = await api.post('/items', itemData);
      toast.success(message)
      if (item.status === 'approved' || user.role === 'admin') {
        setItems((prev) => [item, ...prev]);
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

      setItems((prev) =>
        prev.map((item) => (item._id === id ? response.data : item))
      );

      toast.success('Item claimed successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.message || 'Failed to claim item');
      return { success: false, message: error.message };
    }
  };


  const getMyItems = async () => {
    if (!user) return;
  
    setLoading(true);
    try {
      if( !user.id) {
        console.error('User ID is not available');
        return;
      }
      console.log('Fetching my items for user ID:', user.id);
      const response = await api.get('/items/my-items?userId=' + user.id);
      setMyItems(response.items || []);
    } catch (error) {
      console.error('Failed to fetch my items:', error);
      toast.error('Failed to fetch your items');
    } finally {
      setLoading(false);
    }
  };

  const getLatestItems = async () =>{
    setLoading(true);
    try {
      const response = await api.get('/items');
      setLatestItems(response.items || []);
    } catch (error) {
      console.error('Failed to fetch latest items:', error);
      toast.error('Failed to fetch latest items');
    } finally {
      setLoading(false);
    }
  }

  const getItemById = async (id) => {
    console.log('Fetching item by ID:', id);
    const item = await api.get(`/items/item/${id}`);
    return item;
  };
  
  const updateItem = async (id, data) => {
    try{
      await api.put(`/items/${id}`, data);
      return { success: true };
    }
    catch (error) {
      console.error('Failed to update item:', error);
      toast.error('Failed to update item');
      throw error;
    }

  };


  const deleteItem = async (id) => {
    try {
      await api.delete(`/items/${id}`);
      setItems((prev) => prev.filter((item) => item._id !== id));
      toast.success('Item deleted successfully!');
      return { success: true };
    } catch (error) {
      console.error('Failed to delete item:', error);
      toast.error('Failed to delete item');
      return { success: false, message: error.message };
    }
  };

  const approveItem = async (id) => {
    try {
      const response = await api.put(`/items/${id}/approve`);
      setItems((prev) =>
        prev.map((item) => (item._id === id ? response.data : item))
      );
      toast.success('Item approved successfully!');
      return { success: true };
    } catch (error) {
      console.error('Failed to approve item:', error);
      toast.error('Failed to approve item');
      return { success: false, message: error.message };
    }
  };
  
  const rejectItem = async (id) => {
    try {
      const response = await api.post(`/items/${id}/reject`);
      setItems((prev) =>
        prev.map((item) => (item._id === id ? response.data : item))
      );
      toast.success('Item rejected successfully!');
      return { success: true };
    } catch (error) {
      console.error('Failed to reject item:', error);
      toast.error('Failed to reject item');
      return { success: false, message: error.message };
    }
  }
  

  const value = {
    items,
    loading,
    pagination,
    fetchItems,
    addItem,
    claimItem,
    getMyItems,
    myItems,
    latestItems,
    getLatestItems,
    getItemById,
    updateItem,
    deleteItem,
    approveItem,
    rejectItem
  };


  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
};

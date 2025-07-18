import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Package } from 'lucide-react';

const AdminPanel = () => {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
        <p className="text-gray-600">You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Shield className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-1">Manage items and moderate content</p>
        </div>
      </div>

      {/* Empty State */}
      <div className="text-center py-12">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Admin features coming soon</h3>
        <p className="text-gray-600">Item moderation and user management features will be available here.</p>
      </div>
    </div>
  );
};

export default AdminPanel;
import React from 'react';
import { Package, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage your posted items and claims
          </p>
        </div>
        <Link
          to="/post-item"
          className="btn btn-primary inline-flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Post New Item
        </Link>
      </div>

      {/* Empty State */}
      <div className="text-center py-12">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No items posted yet</h3>
        <p className="text-gray-600 mb-6">Start by posting your first lost or found item.</p>
        <Link to="/post-item" className="btn btn-primary">
          Post an Item
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
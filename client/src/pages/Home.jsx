import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useItems } from '../contexts/ItemsContext';
import ItemCard from '../components/Items/ItemCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { categories, locations } from '../lib/constants';

const Home = () => {
  const { items, loading, fetchItems, pagination } = useItems();

  const [filters, setFilters] = useState({
    search: '',
    type: '',
    category: '',
    location: '',
  });

  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchItems(filters, currentPage);
  }, [filters, currentPage]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); 
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: '',
      category: '',
      location: '',
    });
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page > 0 && page <= pagination.totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 rounded-lg p-6">
        <h1 className="text-xl font-bold text-blue-900">Latest Items</h1>
        <Link
          to="/post-item"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Post Item
        </Link>
      </div>

      {/* Search + Filters */}
      <div className="bg-white/30 backdrop-blur-md border border-white bg-white rounded-xl p-6 space-y-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search items..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-700"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            {(filters.type || filters.category || filters.location) && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/40">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 bg-white/80 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All Types</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 bg-white/80 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 bg-white/80 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Items Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      ) : Array.isArray(items) && items.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border border-gray-50 rounded-lg p-4">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: pagination.totalPages }).map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 rounded-md border text-sm ${
                      page === currentPage
                        ? 'bg-blue-500 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === pagination.totalPages}
                className="px-3 py-1 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No items found</h3>
          <p className="text-gray-600 mb-6">
            {filters.search || filters.type || filters.category || filters.location
              ? 'Try adjusting your search or filter criteria.'
              : 'Be the first to post a lost or found item!'}
          </p>
          <Link
            to="/post-item"
            className="inline-block px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-sm font-medium"
          >
            Post an Item
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;

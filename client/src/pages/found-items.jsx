import React, { useEffect, useState } from 'react';
import { useItems } from '../contexts/ItemsContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const FoundItems = () => {
  const { fetchItems, items, pagination, loading } = useItems();

  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    status: 'all',
    type: 'found',
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchItems(filters, 1);
  };

  const handlePageChange = (direction) => {
    const nextPage =
      direction === 'next'
        ? pagination.currentPage + 1
        : pagination.currentPage - 1;

    if (nextPage > 0 && nextPage <= pagination.totalPages) {
      fetchItems(filters, nextPage);
    }
  };

  useEffect(() => {
    fetchItems(filters, 1);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">📦 All Found Items</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 justify-between">
        <input
          type="text"
          placeholder="Search found items..."
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-64"
        />

        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border border-gray-300 px-4 py-2 rounded-md"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
          <option value="accessories">Accessories</option>
          <option value="documents">Documents</option>
          <option value="keys">Keys</option>
          <option value="other">Other</option>
        </select>

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border border-gray-300 px-4 py-2 rounded-md"
        >
          <option value="all">All Status</option>
          <option value="approved">Approved</option>
          <option value="claimed">Claimed</option>
          <option value="pending">Pending</option>
        </select>

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Apply Filters
        </button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow p-5">
        <table className="min-w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-100 text-gray-600 font-semibold">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4 hidden md:table-cell">Category</th>
              <th className="py-3 px-4 hidden lg:table-cell">Location</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 hidden lg:table-cell">Finder</th>
              <th className="py-3 px-4 hidden xl:table-cell">Found Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-8">Loading...</td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8">No found items.</td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium">{item.title}</td>
                  <td className="px-4 py-3 hidden md:table-cell capitalize">{item.category}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">{item.location}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {item.postedBy?.name || '-'}
                  </td>
                  <td className="px-4 py-3 hidden xl:table-cell">
                    {new Date(item.dateReported).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-6 items-center gap-4">
          <button
            onClick={() => handlePageChange('prev')}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-gray-700 font-medium">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange('next')}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FoundItems;

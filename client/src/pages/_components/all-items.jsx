import React, { useEffect, useState } from 'react';
import { useItems } from '../../contexts/ItemsContext';
import { useAuth } from '../../contexts/AuthContext';
import { useDebouncedCallback } from 'use-debounce';
import Spinner from '../../components/spinner';
import { Check, Trash, X } from 'lucide-react';

const PaginatedItemsTable = ({ filters = {} }) => {
  const {
    items,
    pagination,
    fetchItems,
    loading,
    deleteItem,
    approveItem,
    rejectItem
  } = useItems();

  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [currentPage, setCurrentPage] = useState(1);
  const [localFilters, setLocalFilters] = useState(filters);

  const debouncedFetch = useDebouncedCallback((filters, page) => {
    fetchItems(filters, page);
  }, 300);

  useEffect(() => {
    setLocalFilters(filters);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    debouncedFetch(localFilters, currentPage);
  }, [localFilters, currentPage, debouncedFetch]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleApprove = async (id) => {
    await approveItem(id, { status: 'approved' });
    debouncedFetch(localFilters, currentPage);
  };

  const handleReject = async (id) => {
    await rejectItem(id);
    debouncedFetch(localFilters, currentPage);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    debouncedFetch(localFilters, currentPage);
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-4 md:p-6 min-h-screen bg-white rounded-lg shadow-sm">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">All Items</h2>

      <div className="overflow-x-auto rounded border">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 uppercase text-gray-600">
            <tr>
              <th className="px-3 py-2 md:px-4 md:py-3">Title</th>
              <th className="hidden md:table-cell px-4 py-3">Category</th>
              <th className="hidden md:table-cell px-4 py-3">Type</th>
              <th className="hidden md:table-cell px-4 py-3">Status</th>
              <th className="hidden md:table-cell px-4 py-3">Posted By</th>
              {isAdmin && <th className="px-3 py-2 md:px-4 md:py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {items?.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-6">
                  No items found.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-3 py-2 md:px-4 md:py-3">{item?.title}</td>
                  <td className="hidden md:table-cell px-4 py-3">{item?.category}</td>
                  <td className="hidden md:table-cell px-4 py-3">{item?.type}</td>
                  <td className="hidden md:table-cell px-4 py-3 capitalize">{item.status}</td>
                  <td className="hidden md:table-cell px-4 py-3">{item?.postedBy?.name || 'N/A'}</td>
                  {isAdmin && (
                    <td className="px-3 py-2 md:px-4 md:py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-500 hover:text-red-600 transition transform hover:scale-110"
                          title="Delete"
                        >
                          <Trash className="w-5 h-5 opacity-70" />
                        </button>
                        {item.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(item._id)}
                              className="text-green-500 px-2 py-1 rounded hover:text-green-600 transition"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(item._id)}
                              className="text-yellow-500 px-2 py-1 rounded hover:text-yellow-600 transition"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded text-sm font-medium ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 transition'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaginatedItemsTable;

import React, { useEffect } from 'react';
import { useItems } from '../contexts/ItemsContext';
import { useAuth } from '../contexts/AuthContext';
import Spinner from './Spinner'; // Optional: create a simple loading spinner

const PaginatedItemsTable = ({ filters = {} }) => {
  const {
    items,
    pagination,
    fetchItems,
    loading,
    deleteItem,
    updateItem,
  } = useItems();

  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchItems(filters, pagination.currentPage);
  }, [filters]);

  const handlePageChange = (page) => {
    fetchItems(filters, page);
  };

  const handleApprove = async (id) => {
    await updateItem(id, { status: 'approved' });
    fetchItems(filters, pagination.currentPage);
  };

  const handleReject = async (id) => {
    await updateItem(id, { status: 'rejected' });
    fetchItems(filters, pagination.currentPage);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems(filters, pagination.currentPage);
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Items</h2>
      <div className="overflow-x-auto rounded shadow">
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Posted By</th>
              {isAdmin && <th className="px-4 py-2 text-left">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {items?.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-4">
                  No items found.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.type}</td>
                  <td className="px-4 py-2 capitalize">{item.status}</td>
                  <td className="px-4 py-2">{item.postedBy?.name || 'N/A'}</td>
                  {isAdmin && (
                    <td className="px-4 py-2 space-x-2">
                      {item.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(item._id)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(item._id)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                pagination.currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
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

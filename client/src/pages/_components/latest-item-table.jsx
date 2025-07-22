import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { useItems } from '../../contexts/ItemsContext';
import { toast } from 'react-hot-toast';

const LatestItemsTable = ({ latestItems = [] }) => {
  const { user } = useAuth();
  const { deleteItem } = useItems();
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin';

  const handleDelete = async (itemId) => {
    await deleteItem(itemId);
    toast.success('Item deleted successfully');
    navigate(0);
    setConfirmDelete(null);
  };

  return (
    <div className="w-full mx-auto text-gray-800 rounded-2xl p-6 border border-gray-100 px-8 py-6 min-h-[400px] bg-white shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Latest Items</h2>
        <Link
          to="/dashboard/all-items"
          className="px-4 py-2 text-sm font-medium text-blue-500 rounded-full transition hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        {/* Desktop/Tablet Table */}
        <table className="min-w-full divide-y divide-gray-200 hidden md:table">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="py-2 px-4">Posted By</th>
              <th className="py-2 px-4">Item</th>
              <th className="py-2 px-4">Status</th>
              {!isAdmin && <th className="py-2 px-4">Claim</th>}
              {isAdmin && <th className="py-2 px-4">Actions</th>}
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {latestItems.map((item, index) => {
              const isClaimed = item.status === 'claimed';
              const isMyItem = user?.id === item?.postedBy?._id;

              return (
                <tr
                  key={item._id || index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 capitalize">{item?.postedBy?.name || 'Unknown'}</td>
                  <td className="py-3 px-4 capitalize">{item.title}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full capitalize">
                      {item.status}
                    </span>
                  </td>

                  {!isAdmin && (
                    <td className="py-3 px-4">
                      {isClaimed ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                          ✓ Claimed
                        </span>
                      ) : !isMyItem ? (
                        <button className="px-4 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition">
                          Claim
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Posted by you</span>
                      )}
                    </td>
                  )}

                  {isAdmin && (
                    <td className="py-3 px-4 flex gap-2 items-center justify-between">
                      {item.status === 'pending' && (
                        <>
                          <button
                            className="text-green-600 hover:text-green-800"
                            title="Approve"
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button
                            className="text-yellow-600 hover:text-yellow-800"
                            title="Reject"
                          >
                            <XCircle size={20} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setConfirmDelete(item._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Mobile - Only Title & Actions */}
        <div className="md:hidden flex flex-col gap-3">
          {latestItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
            >
              <h3 className="text-lg font-semibold truncate">{item.title}</h3>
              <div className="flex gap-4 flex-shrink-0">
                {isAdmin && item.status === 'pending' && (
                  <>
                    <button
                      className="text-green-600 hover:text-green-800"
                      title="Approve"
                      // Add your approve handler here
                    >
                      <CheckCircle size={20} />
                    </button>
                    <button
                      className="text-yellow-600 hover:text-yellow-800"
                      title="Reject"
                      // Add your reject handler here
                    >
                      <XCircle size={20} />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setConfirmDelete(item._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {latestItems.length === 0 && (
            <p className="text-center text-gray-500 py-8">No latest items found.</p>
          )}
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Deletion</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="px-4 py-1 text-sm rounded-full bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestItemsTable;

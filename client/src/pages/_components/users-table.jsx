import React, { useEffect, useState } from 'react';
import { Trash2, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../contexts/usersContext';
import { useAuth } from '../../contexts/AuthContext';

const UsersTable = ({ users = [], deleteUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    await deleteUser(selectedUserId);
    setShowModal(false);
    setSelectedUserId(null);
  };

  return (
    <div className="w-full mx-auto rounded-2xl p-6 md:p-8 border bg-white min-h-[400px]">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">All Users</h2>

      <div className="overflow-x-auto rounded-xl shadow-sm">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left whitespace-nowrap">Name</th>
              <th className="py-3 px-4 text-left hidden sm:table-cell">Email</th>
              {user?.role === 'admin' && (
                <th className="py-3 px-4 text-right whitespace-nowrap">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 transition-all">
                <td className="py-4 px-4 capitalize font-medium">{u.name}</td>
                <td className="py-4 px-4 hidden sm:table-cell">{u.email}</td>
                {u.role === 'user' && (
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleDeleteClick(u._id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Delete user"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center text-gray-500 py-8">No users found.</p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Are you sure?</h3>
            <p className="text-gray-600">This action will permanently delete the user.</p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex items-center gap-1 px-4 py-2 text-sm border rounded-md text-gray-600 hover:bg-gray-100"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex items-center gap-1 px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <Check size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;

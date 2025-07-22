import React, { useState } from 'react';
import { Pencil, Trash2, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useItems } from '../../contexts/ItemsContext';

const statusColor = {
  pending: 'bg-yellow-100 text-yellow-600',
  approved: 'bg-blue-100 text-blue-600',
  rejected: 'bg-red-100 text-red-600',
  claimed: 'bg-green-100 text-green-700',
};

const LatestReportTable = ({ myItems = [] }) => {
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const { deleteItem } = useItems();
  const navigate = useNavigate();

  const filteredItems =
    filter === 'All'
      ? myItems
      : myItems.filter((item) => item.type.toLowerCase() === filter.toLowerCase());

  const handleDeleteClick = (id) => {
    setSelectedItemId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    await deleteItem(selectedItemId);
    navigate(0);
    setShowModal(false);
    setSelectedItemId(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl p-6 md:p-8 border border-gray-100 min-h-[480px] shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">My Reports</h2>
        <div className="flex flex-wrap gap-2">
          {['All', 'Lost', 'Found'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full border transition ${
                filter === type
                  ? 'bg-blue-600 text-white border-blue-600 shadow'
                  : 'text-gray-600 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        {/* Desktop / Tablet Table */}
        <table className="min-w-full text-sm text-gray-700 border-collapse border border-gray-200 hidden md:table">
          <thead className="bg-gray-50 border-b text-gray-500">
            <tr>
              <th className="py-3 px-5 text-left">Category</th>
              <th className="py-3 px-5 text-left">Date</th>
              <th className="py-3 px-5 text-left">Location</th>
              <th className="py-3 px-5 text-left">Title</th>
              <th className="py-3 px-5 text-left">Status</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredItems.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition">
                <td className="py-4 px-5 capitalize font-medium">{item.category}</td>
                <td className="py-4 px-5">{dayjs(item.dateReported).format('HH:mm | ddd, MMM D, YYYY')}</td>
                <td className="py-4 px-5">{item.location}</td>
                <td className="py-4 px-5 capitalize">{item.title}</td>
                <td className="py-4 px-5">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor[item.status] || 'bg-gray-100 text-gray-600'}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-5 text-right flex justify-end gap-4">
                  <button
                    onClick={() => navigate(`/dashboard/items/edit-item/${item._id}`)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item._id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile - Only Title & Actions */}
        <div className="md:hidden flex flex-col gap-3">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
            >
              <h3 className="text-lg font-semibold truncate">{item.title}</h3>
              <div className="flex gap-4 flex-shrink-0">
                <button
                  onClick={() => navigate(`/dashboard/items/edit-item/${item._id}`)}
                  className="text-blue-600 hover:text-blue-800 transition"
                  title="Edit"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => handleDeleteClick(item._id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <p className="text-center text-gray-500 py-8">No reports found.</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Are you sure?</h3>
            <p className="text-gray-600">This action cannot be undone.</p>
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

export default LatestReportTable;

import React from 'react';
import { Calendar, MapPin, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useItems } from '../../contexts/ItemsContext';

const ItemCard = ({ item }) => {
  const { user } = useAuth();
  const { claimItem } = useItems();

  const handleClaim = async () => {
    if (window.confirm('Are you sure you want to claim this item?')) {
      await claimItem(item._id);
    }
  };

  const getTypeBadge = (type) => {
    return type === 'lost' 
      ? 'bg-red-100 text-red-800' 
      : 'bg-green-100 text-green-800';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const canClaim = item.type === 'found' &&
    item.status === 'approved' &&
    !item.claimedBy &&
    user?._id && // null-safe check
    item.userId?._id !== user._id; // fixed key from user.id → user._id

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      {/* Image */}
      {item.image && (
        <div className="mb-4">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
          <div className="flex items-center space-x-2 mb-2">
            <span className={`badge ${getTypeBadge(item.type)}`}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{formatDate(item.date)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <User className="w-4 h-4 mr-2" />
          <span>Posted by {item.userId?.name || 'Unknown'}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <span className="text-sm font-medium text-gray-700 capitalize">
          {item.category}
        </span>

        {canClaim && (
          <button
            onClick={handleClaim}
            className="btn btn-primary text-sm"
          >
            Claim Item
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;

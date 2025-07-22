import React from 'react';
import { Calendar, MapPin, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useItems } from '../../contexts/ItemsContext';
import { formatDate } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const { user } = useAuth();
  const { claimItem } = useItems();
  const navigate = useNavigate();

  const canClaim =
    item.type === 'found' &&
    item.status === 'approved' &&
    !item.claimedBy &&
    user?.id &&
    item.postedBy?._id !== user.id;

  const hasClaimed = item.claimedBy && item.claimedBy._id === user?.id;

  const handleClaim = async (e) => {
    e.stopPropagation();
    const confirmed = window.confirm('Are you sure you want to claim this item?');
    if (confirmed) {
      await claimItem(item._id);
    }
  };

  const handleNavigate = () => navigate(`/items/${item._id}`);

  const getTypeBadge = (type) => {
    return type === 'lost'
      ? 'bg-rose-100 text-rose-600 ring-1 ring-rose-300'
      : 'bg-emerald-100 text-emerald-600 ring-1 ring-emerald-300';
  };

  return (
    <div
      onClick={handleNavigate}
      className="bg-white rounded-xl shadow-sm px-4 py-2  hover:shadow-md transition-all duration-300 overflow-hidden w-full max-w-sm cursor-pointer"
    >
      <img
        src={item.images?.[0] || '/place-holder.jpg'}
        alt={item.title || 'Item'}
        className="w-full aspect-video object-cover rounded-t-xl mb-4"
      />

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-semibold text-blue-800 line-clamp-1">
            {item.title}
          </h3>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${getTypeBadge(
              item.type
            )}`}
          >
            {item.type}
          </span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>

        <div className="space-y-1 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span className="line-clamp-1">{item.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>{formatDate(item.updatedAt)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-blue-400" />
            <span className="line-clamp-1">By {item.postedBy?.name || 'Unknown'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm pt-2">
          <span className="text-gray-800 capitalize">{item.category}</span>
          {canClaim && (
            <button
              onClick={handleClaim}
              className="text-white bg-blue-500 hover:bg-blue-600 text-xs px-3 py-1 rounded-full transition duration-200"
            >
              Claim
            </button>
          )}
        </div>

        {hasClaimed && (
          <div className="mt-3 text-sm text-blue-700">
            Contact <strong>{item.postedBy?.name}</strong>:
            <a
              href={`mailto:${item.postedBy?.email}`}
              className="ml-1 text-blue-600 underline hover:text-blue-800"
              onClick={(e) => e.stopPropagation()}
            >
              {item.postedBy?.email}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
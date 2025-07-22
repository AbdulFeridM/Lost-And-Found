import React from 'react';
import { Calendar, MapPin, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useItems } from '../../contexts/ItemsContext';
import { formatDate } from '../../lib/utils';

const ItemCard = ({ item }) => {
  const { user } = useAuth();
  const { claimItem } = useItems();
  console.log()

  const handleClaim = async () => {
    if (window.confirm('Are you sure you want to claim this item?')) {
      await claimItem(item._id);
    }
  };

  const getTypeBadge = (type) => {
    return type === 'lost'
      ? 'bg-rose-100 text-rose-600 ring-1 ring-rose-300'
      : 'bg-emerald-100 text-emerald-600 ring-1 ring-emerald-300';
  };

  const canClaim =
    item.type === 'found' &&
    item.status === 'approved' &&
    !item.claimedBy &&
    user?.id &&
    item.postedBy?._id !== user.id;

    console.log(canClaim, 'can claim', user?._id, item.postedBy?._id, 'user ', user);
    

  return (
    <div className="rounded-2xl flex flex-col space-y-4 shadow-md p-4 bg-white even:bg-white  hover:shadow-sm transition-all duration-300 overflow-hidden">
      {/* Image */}
      {item.image && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      {/* Body */}
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-blue-800">{item.title}</h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
          {item.description}
        </p>

        {/* Meta Details */}
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>{formatDate(item.updatedAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            <span>Posted by {item.postedBy?.name || 'Unknown'}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 ">
          <span className="text-sm font-medium text-gray-800 capitalize">
            {item.category}
          </span>

          <span
              className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-medium ${getTypeBadge(
                item.type
              )}`}
            >
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </span>
        </div>
        
      </div>
      {canClaim && (
            <button
              onClick={handleClaim}
              className="bg-blue-500 hover:bg-blue-600 justify-end text-white text-sm font-medium py-1.5 px-4 rounded-xl transition duration-200"
            >
              Claim Item
            </button>
          )}
    </div>
  );
};

export default ItemCard;

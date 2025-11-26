import { Minus, Plus, Trash2, MapPin, Calendar } from 'lucide-react';
import { PantryItem } from '../lib/supabase';

interface PantryCardProps {
  item: PantryItem;
  onUpdate: (item: PantryItem) => void;
  onDelete: (id: string) => void;
}

export function PantryCard({ item, onUpdate, onDelete }: PantryCardProps) {
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(0, item.quantity + delta);
    onUpdate({ ...item, quantity: newQuantity });
  };

  const isExpiringSoon = item.expiry_date &&
    new Date(item.expiry_date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const isExpired = item.expiry_date && new Date(item.expiry_date) < new Date();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {item.category}
        </div>
        {isExpired && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Expired
          </div>
        )}
        {!isExpired && isExpiringSoon && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Expiring Soon
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h3>

        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          <span>{item.location}</span>
        </div>

        {item.expiry_date && (
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
            <Calendar className="w-4 h-4" />
            <span>{new Date(item.expiry_date).toLocaleDateString()}</span>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-emerald-600">
            {item.quantity} {item.unit}
          </span>
        </div>

        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-colors duration-200"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleQuantityChange(1)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => onDelete(item.id)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

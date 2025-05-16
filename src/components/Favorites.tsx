import React from 'react';
import { Heart, X } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

interface FavoritesProps {
  onSelectCity: (city: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ onSelectCity }) => {
  const { favorites, removeFromFavorites } = useFavorites();

  if (favorites.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <Heart className="text-red-500 mr-2" size={16} />
        <span className="text-sm font-medium text-gray-700">Favorites</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {favorites.map((city, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 rounded-full pl-3 pr-1 py-1 text-sm"
          >
            <span 
              className="cursor-pointer mr-1"
              onClick={() => onSelectCity(city)}
            >
              {city}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFromFavorites(city);
              }}
              className="p-1 rounded-full hover:bg-gray-200 text-gray-500"
              aria-label={`Remove ${city} from favorites`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
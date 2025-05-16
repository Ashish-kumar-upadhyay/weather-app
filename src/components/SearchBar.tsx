import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X, Clock } from 'lucide-react';
import { getCitySuggestions } from '../utils/getCitySuggestions';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: (city: string) => void;
  onUseCurrentLocation: () => void;
  recentSearches: string[];
  isLoadingLocation: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  onSearch, 
  onUseCurrentLocation,
  recentSearches,
  isLoadingLocation
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setShowSuggestions(false);
    }
  };

  // Handle outside click to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setShowRecent(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch suggestions when search term changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length > 1) {
        const results = await getCitySuggestions(searchTerm);
        setSuggestions(results);
        setShowSuggestions(true);
        setShowRecent(false);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
    setShowRecent(false);
  };

  const handleRecentClick = (recent: string) => {
    setSearchTerm(recent);
    onSearch(recent);
    setShowRecent(false);
  };

  const handleInputFocus = () => {
    if (searchTerm.trim().length > 1) {
      setShowSuggestions(true);
    } else if (recentSearches.length > 0) {
      setShowRecent(true);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative mb-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleInputFocus}
            placeholder="Search city..."
            className="w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={18} 
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        <div className="flex mt-2 gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex-grow flex items-center justify-center"
          >
            <Search size={16} className="mr-1" />
            Search
          </button>
          
          <button
            type="button"
            onClick={onUseCurrentLocation}
            className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
            disabled={isLoadingLocation}
          >
            <MapPin size={16} className={isLoadingLocation ? "animate-pulse text-blue-500" : ""} />
          </button>
        </div>
      </form>
      
      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto"
        >
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li 
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center"
              >
                <Search size={14} className="mr-2 text-gray-400" />
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Recent searches */}
      {showRecent && recentSearches.length > 0 && !showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto"
        >
          <div className="px-4 py-2 text-xs text-gray-500 border-b">Recent searches</div>
          <ul className="py-1">
            {recentSearches.map((recent, index) => (
              <li 
                key={index}
                onClick={() => handleRecentClick(recent)}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center"
              >
                <Clock size={14} className="mr-2 text-gray-400" />
                {recent}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
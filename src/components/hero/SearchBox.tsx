
import React, { useState } from 'react';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  locationPermission: 'granted' | 'denied' | 'prompt';
  requestLocation: () => void;
  toggleFilter: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ 
  searchQuery, 
  setSearchQuery,
  locationPermission,
  requestLocation,
  toggleFilter
}) => {
  return (
    <div className="relative">
      <div className="flex">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by location, property name..."
            className="w-full px-4 py-3 rounded-l-md border-0 focus:ring-2 focus:ring-realestate-500 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {locationPermission !== 'granted' && (
            <button 
              onClick={requestLocation}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-realestate-600"
              title="Use your current location"
            >
              <MapPin className="h-5 w-5" />
            </button>
          )}
        </div>
        
        <button 
          onClick={toggleFilter}
          className="bg-gray-100 text-gray-700 font-medium px-4 py-3 border-l border-gray-200 hover:bg-gray-200 transition duration-300 flex items-center"
        >
          <SlidersHorizontal className="mr-2 h-5 w-5" />
          FILTER
        </button>
        
        <button className="bg-realestate-600 hover:bg-realestate-700 text-white px-6 py-3 rounded-r-md transition duration-300 flex items-center">
          <Search className="h-5 w-5 mr-2" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBox;

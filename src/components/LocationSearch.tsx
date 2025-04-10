
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Mock suggestions for demonstration purposes
const locationSuggestions = [
  { id: '1', name: 'Baner, Pune', type: 'area' },
  { id: '2', name: 'Kharadi, Pune', type: 'area' },
  { id: '3', name: 'Hinjewadi, Pune', type: 'area' },
  { id: '4', name: 'Viman Nagar, Pune', type: 'area' },
  { id: '5', name: 'Civil Lines, Nagpur', type: 'area' },
  { id: '6', name: 'Dharampeth, Nagpur', type: 'area' },
  { id: '7', name: '411045', type: 'pin' },
  { id: '8', name: '411014', type: 'pin' },
];

const LocationSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSelectLocation = (location: string) => {
    setSelectedLocation(location);
    setSearchTerm(location);
    setShowSuggestions(false);
  };

  const filteredSuggestions = locationSuggestions.filter(loc => 
    loc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission - e.g., redirect to search results page
    console.log("Searching for properties in:", selectedLocation || searchTerm);
  };

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Find Your Dream Home
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Search for properties by location, area, or PIN code
          </p>
          
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center border-2 border-primary/80 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/30 bg-white">
              <div className="pl-4 text-gray-500">
                <MapPin size={20} />
              </div>
              <Input
                type="text"
                placeholder="Search by city, area or PIN code..."
                className="flex-1 py-3 px-4 text-base border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(searchTerm.length > 0)}
              />
              <Button 
                type="submit" 
                className="rounded-none h-full px-6 py-3"
              >
                <Search className="mr-2" size={18} />
                Search
              </Button>
            </div>
            
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
                {filteredSuggestions.map((loc) => (
                  <div
                    key={loc.id}
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => handleSelectLocation(loc.name)}
                  >
                    <MapPin size={16} className="text-gray-500 mr-2" />
                    <div>
                      <span>{loc.name}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        {loc.type === 'pin' ? 'PIN Code' : 'Area'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>
          
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="text-sm text-gray-500">Popular locations:</span>
            {['Pune', 'Nagpur', 'Baner', 'Kharadi', 'Hinjewadi'].map((loc) => (
              <Button 
                key={loc} 
                variant="ghost" 
                size="sm" 
                className="text-sm"
                onClick={() => handleSelectLocation(loc)}
              >
                {loc}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSearch;

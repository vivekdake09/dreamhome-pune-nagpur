
import React, { useState } from 'react';
import { Search, MapPin, Home } from 'lucide-react';
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
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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

  const handleFilterClick = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
    console.log(`Filter selected: ${filter}`);
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
          
          {/* <div className="flex flex-wrap justify-center gap-2 mt-4">
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
          </div> */}
          
          {/* Construction Status Filter Buttons - Moved to top with better spacing and layout */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-sm">
            <div className="text-center mb-3">
              <h3 className="font-medium text-gray-700">Filter by Construction Status</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant={activeFilter === "ready" ? "default" : "outline"}
                className={`px-6 py-2 ${activeFilter === "ready" ? "bg-primary text-white" : "border-primary/60 text-primary hover:bg-primary/10"}`}
                onClick={() => handleFilterClick("ready")}
              >
                <Home className="mr-2 h-4 w-4" />
                Ready to Move
              </Button>
              <Button
                variant={activeFilter === "under-construction" ? "default" : "outline"}
                className={`px-6 py-2 ${activeFilter === "under-construction" ? "bg-primary text-white" : "border-primary/60 text-primary hover:bg-primary/10"}`}
                onClick={() => handleFilterClick("under-construction")}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                  <path d="M4 12h16"></path>
                  <path d="M12 6v12"></path>
                </svg>
                Under Construction
              </Button>
              <Button
                variant={activeFilter === "newly-launched" ? "default" : "outline"}
                className={`px-6 py-2 ${activeFilter === "newly-launched" ? "bg-primary text-white" : "border-primary/60 text-primary hover:bg-primary/10"}`}
                onClick={() => handleFilterClick("newly-launched")}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Newly Launched
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSearch;

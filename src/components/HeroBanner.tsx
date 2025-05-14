
import React, { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HeroBanner: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  const backgroundImageUrl = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1920&auto=format&fit=crop";

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if ('geolocation' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setLocationPermission(result.state as 'granted' | 'denied' | 'prompt');
        
        // Listen for changes in permission state
        result.onchange = function() {
          setLocationPermission(this.state as 'granted' | 'denied' | 'prompt');
        };
      });
    }
  }, []);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Here you would typically reverse geocode to get the address
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);
          // For demonstration, we'll just set the permission
          setLocationPermission('granted');
        },
        (error) => {
          console.error("Error obtaining location", error);
          setLocationPermission('denied');
        }
      );
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Here you would typically handle the search functionality
  };

  return (
    <div className="relative w-full h-[600px] md:h-[500px] flex items-center">
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${backgroundImageUrl})`, 
          filter: 'brightness(0.7)'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-shadow">
            Find Your Dream Home in Pune & Nagpur
          </h1>
          <p className="text-white text-lg md:text-xl mb-8">
            Explore premium flats, row houses & villas all in one place
          </p>

          {/* Search box */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <div className="flex">
                  <div className="relative flex-grow">
                    <Input
                      type="text"
                      placeholder="Search by location, property name..."
                      className="w-full px-4 py-3 rounded-l-md border-0 focus:ring-2 focus:ring-realestate-500 focus:outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {locationPermission !== 'granted' && (
                      <button 
                        type="button"
                        onClick={requestLocation}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-realestate-600"
                        title="Use your current location"
                      >
                        <MapPin className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-realestate-600 hover:bg-realestate-700 text-white px-6 py-3 rounded-r-md transition duration-300 flex items-center"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    <span>Search</span>
                  </Button>
                </div>
              </div>
            </form>
            
            {/* Quick filters have been removed as requested */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

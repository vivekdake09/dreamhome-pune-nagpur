
import React, { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';

const HeroBanner = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationPermission, setLocationPermission] = useState('prompt');

  const backgroundImageUrl = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1920&auto=format&fit=crop";

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if ('geolocation' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setLocationPermission(result.state);
        
        // Listen for changes in permission state
        result.onchange = function() {
          setLocationPermission(this.state);
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
                <button className="bg-realestate-600 hover:bg-realestate-700 text-white px-6 py-3 rounded-r-md transition duration-300 flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  <span>Search</span>
                </button>
              </div>
            </div>
            
            {/* Quick filters */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <button className="bg-realestate-50 hover:bg-realestate-100 text-realestate-700 px-4 py-1 rounded-full text-sm transition duration-200">
                Ready to Move
              </button>
              <button className="bg-realestate-50 hover:bg-realestate-100 text-realestate-700 px-4 py-1 rounded-full text-sm transition duration-200">
                Under Construction
              </button>
              <button className="bg-realestate-50 hover:bg-realestate-100 text-realestate-700 px-4 py-1 rounded-full text-sm transition duration-200">
                1 BHK
              </button>
              <button className="bg-realestate-50 hover:bg-realestate-100 text-realestate-700 px-4 py-1 rounded-full text-sm transition duration-200">
                2 BHK
              </button>
              <button className="bg-realestate-50 hover:bg-realestate-100 text-realestate-700 px-4 py-1 rounded-full text-sm transition duration-200">
                Villa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

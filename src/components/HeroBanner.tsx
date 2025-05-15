
import React, { useState, useEffect } from 'react';
import SearchBox from './hero/SearchBox';
import FilterPanel from './hero/FilterPanel';
import QuickFilters from './hero/QuickFilters';

const HeroBanner: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const backgroundImageUrl = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1920&auto=format&fit=crop";
  
  const quickFilters = [
    "Ready to Move",
    "Under Construction",
    "1 BHK",
    "2 BHK",
    "Villa"
  ];

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

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
    console.log("Filter visibility toggled:", !isFilterVisible); // Debug log
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
            <SearchBox 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              locationPermission={locationPermission}
              requestLocation={requestLocation}
              toggleFilter={toggleFilter}
            />
            
            <QuickFilters filters={quickFilters} />
          </div>
          
          {/* Advanced Filters Panel */}
          <FilterPanel isVisible={isFilterVisible} />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

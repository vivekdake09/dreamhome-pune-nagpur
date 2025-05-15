
import React, { useState, useEffect } from 'react';
import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const HeroBanner: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

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
          
          {/* Advanced Filters Panel */}
          {isFilterVisible && (
            <div className="mt-4 p-6 bg-white rounded-lg shadow-lg text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Property Type</label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Type</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">City</label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="nagpur">Nagpur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Bedrooms</label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Bathrooms</label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium mb-4 text-gray-700">Price Range (₹ Cr)</label>
                  <Slider 
                    defaultValue={[0, 10]} 
                    max={10}
                    step={0.5}
                    className="my-4"
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">₹0 Cr</span>
                    <span className="text-sm text-gray-600">₹10 Cr+</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-4 text-gray-700">Area (sq.ft.)</label>
                  <Slider 
                    defaultValue={[0, 5000]} 
                    max={10000}
                    step={500}
                    className="my-4"
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">0 sq.ft.</span>
                    <span className="text-sm text-gray-600">10000+ sq.ft.</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6 space-x-4">
                <Button variant="outline">Reset</Button>
                <Button>Apply Filters</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

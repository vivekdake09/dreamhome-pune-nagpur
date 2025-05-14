
import React, { useState, useEffect } from 'react';
import { MapPin, Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const HeroBanner: React.FC = () => {
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter state
  const [filters, setFilters] = useState({
    propertyType: 'any',
    city: 'any',
    bedrooms: 'any',
    bathrooms: 'any',
    priceRange: [0, 5],
    areaRange: [0, 5000]
  });

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

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      propertyType: 'any',
      city: 'any',
      bedrooms: 'any',
      bathrooms: 'any',
      priceRange: [0, 5],
      areaRange: [0, 5000]
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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

          {/* Search Filter Box */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search by location, property name..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <Button 
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                variant="outline"
                className="whitespace-nowrap"
              >
                {isFilterVisible ? <X className="mr-2 h-4 w-4" /> : <SlidersHorizontal className="mr-2 h-4 w-4" />}
                {isFilterVisible ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>

            {/* Filters Panel - only visible when toggle is on */}
            {isFilterVisible && (
              <div className="mt-4 p-4 border rounded-lg grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Property Type</label>
                  <Select 
                    value={filters.propertyType} 
                    onValueChange={(value) => handleFilterChange('propertyType', value)}
                  >
                    <SelectTrigger>
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
                  <label className="block text-sm font-medium mb-2 text-foreground">City</label>
                  <Select 
                    value={filters.city} 
                    onValueChange={(value) => handleFilterChange('city', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any City</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="nagpur">Nagpur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Bedrooms</label>
                  <Select 
                    value={filters.bedrooms} 
                    onValueChange={(value) => handleFilterChange('bedrooms', value)}
                  >
                    <SelectTrigger>
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
                  <label className="block text-sm font-medium mb-2 text-foreground">Bathrooms</label>
                  <Select 
                    value={filters.bathrooms} 
                    onValueChange={(value) => handleFilterChange('bathrooms', value)}
                  >
                    <SelectTrigger>
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
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-4 text-foreground">Price Range (₹ Cr)</label>
                  <Slider 
                    value={filters.priceRange} 
                    max={10}
                    step={0.5}
                    className="my-4"
                    onValueChange={(value) => handleFilterChange('priceRange', value)}
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">₹{filters.priceRange[0]} Cr</span>
                    <span className="text-sm text-muted-foreground">₹{filters.priceRange[1]} Cr+</span>
                  </div>
                </div>
                
                <div className="md:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium mb-4 text-foreground">Area (sq.ft.)</label>
                  <Slider 
                    value={filters.areaRange} 
                    max={10000}
                    step={500}
                    className="my-4"
                    onValueChange={(value) => handleFilterChange('areaRange', value)}
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{filters.areaRange[0]} sq.ft.</span>
                    <span className="text-sm text-muted-foreground">{filters.areaRange[1]} sq.ft.+</span>
                  </div>
                </div>
                
                <div className="md:col-span-3 lg:col-span-4 flex justify-end space-x-4">
                  <Button variant="outline" onClick={resetFilters}>Reset</Button>
                  <Button onClick={() => setIsFilterVisible(false)}>Apply Filters</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

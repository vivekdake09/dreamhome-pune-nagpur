
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface FilterPanelProps {
  onFilterChange?: (filters: any) => void;
  className?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange, className }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter state could be expanded as needed
  const [filters, setFilters] = useState({
    propertyType: 'any',
    city: 'any',
    bedrooms: 'any',
    bathrooms: 'any',
    priceRange: [0, 5],
    areaRange: [0, 5000]
  });

  const handleFilterChange = (key: string, value: any) => {
    const updatedFilters = {
      ...filters,
      [key]: value
    };
    setFilters(updatedFilters);
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  const resetFilters = () => {
    const defaultFilters = {
      propertyType: 'any',
      city: 'any',
      bedrooms: 'any',
      bathrooms: 'any',
      priceRange: [0, 5],
      areaRange: [0, 5000]
    };
    setFilters(defaultFilters);
    if (onFilterChange) {
      onFilterChange(defaultFilters);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`mb-8 ${className}`}>
      {/* Search and Filter Bar */}
      <div className="mb-8">
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

        {/* Filters Panel */}
        {isFilterVisible && (
          <div className="mt-4 p-6 border rounded-lg grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
  );
};

export default FilterPanel;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface FilterPanelProps {
  isVisible: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
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
  );
};

export default FilterPanel;

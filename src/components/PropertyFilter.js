import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronRight } from 'lucide-react';

const FILTER_OPTIONS = {
  location: [
    {
      id: 'pune',
      label: 'Pune',
      options: [
        { id: 'kharadi', label: 'Kharadi' },
        { id: 'hinjewadi', label: 'Hinjewadi' },
        { id: 'baner', label: 'Baner' },
        { id: 'wakad', label: 'Wakad' },
        { id: 'viman-nagar', label: 'Viman Nagar' }
      ]
    },
    {
      id: 'nagpur',
      label: 'Nagpur',
      options: [
        { id: 'dharampeth', label: 'Dharampeth' },
        { id: 'civil-lines', label: 'Civil Lines' },
        { id: 'ramdaspeth', label: 'Ramdaspeth' },
        { id: 'sadar', label: 'Sadar' }
      ]
    }
  ],
  propertyType: [
    { id: '1rk', label: '1 RK' },
    { id: '1bhk', label: '1 BHK' },
    { id: '1-5bhk', label: '1.5 BHK' },
    { id: '2bhk', label: '2 BHK' },
    { id: '2-5bhk', label: '2.5 BHK' },
    { id: '3bhk', label: '3 BHK' },
    { id: '3plus-bhk', label: '3+ BHK' },
    { id: 'row-house', label: 'Row House' },
    { id: 'villa', label: 'Villa' }
  ],
  budget: [
    { id: '30-50l', label: '₹30-50 Lacs' },
    { id: '50-70l', label: '₹50-70 Lacs' },
    { id: '70-90l', label: '₹70-90 Lacs' },
    { id: '90-110l', label: '₹90L-1.1Cr' },
    { id: '110-130l', label: '₹1.1Cr-1.3Cr' },
    { id: '130-150l', label: '₹1.3Cr-1.5Cr' },
    { id: '150l-plus', label: 'Above ₹1.5Cr' }
  ],
  buildingType: [
    { id: 'big-society', label: 'Big Society' },
    { id: '2-3-wings', label: '2-3 Wings' },
    { id: 'standalone', label: 'Standalone' },
    { id: 'gated-community', label: 'Gated Community' }
  ],
  possessionStatus: [
    { id: 'ready-to-move', label: 'Ready To Move' },
    { id: 'near-possession', label: 'Nearing Possession' },
    { id: 'under-construction', label: 'Under Construction' },
    { id: 'recently-launched', label: 'Recently Launched' }
  ],
  approvals: [
    { id: 'rera-approved', label: 'RERA Approved' },
    { id: 'na-sanctioned', label: 'NA Sanctioned' }
  ]
};

const PropertyFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    location: [],
    propertyType: [],
    budget: [],
    buildingType: [],
    possessionStatus: [],
    approvals: []
  });
  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const toggleFilterOption = (category, optionId) => {
    setActiveFilters(prevFilters => {
      const currentFilters = prevFilters[category] || [];
      const newFilters = currentFilters.includes(optionId)
        ? currentFilters.filter(id => id !== optionId)
        : [...currentFilters, optionId];
      
      return {
        ...prevFilters,
        [category]: newFilters
      };
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({
      location: [],
      propertyType: [],
      budget: [],
      buildingType: [],
      possessionStatus: [],
      approvals: []
    });
  };

  const countActiveFilters = () => {
    return Object.values(activeFilters).flat().length;
  };

  const isSubOptionSelected = (category, parentId, optionId) => {
    return activeFilters[category]?.includes(optionId) || false;
  };

  const isOptionSelected = (category, optionId) => {
    return activeFilters[category]?.includes(optionId) || false;
  };

  return (
    <div className="mb-8">
      {/* Filter button */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <button 
            onClick={toggleFilter}
            className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Filter className="h-5 w-5 text-realestate-600" />
            <span className="font-medium">Filter</span>
            {countActiveFilters() > 0 && (
              <span className="bg-realestate-100 text-realestate-700 rounded-full text-xs px-2 py-0.5">
                {countActiveFilters()}
              </span>
            )}
          </button>
          
          {countActiveFilters() > 0 && (
            <button 
              onClick={clearAllFilters}
              className="text-sm text-realestate-600 hover:text-realestate-700 hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Filter panel */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-start pt-4 px-4 md:pt-16">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Filter Properties</h2>
              <button 
                onClick={toggleFilter}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Location */}
                <div className="space-y-3">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleCategory('location')}
                  >
                    <h3 className="font-medium text-gray-800">Location</h3>
                    {expandedCategories.includes('location') ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  
                  {expandedCategories.includes('location') && (
                    <div className="space-y-3 pl-1">
                      {FILTER_OPTIONS.location.map((city) => (
                        <div key={city.id} className="space-y-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`city-${city.id}`}
                              checked={isOptionSelected('location', city.id)}
                              onChange={() => toggleFilterOption('location', city.id)}
                              className="rounded text-realestate-600 focus:ring-realestate-500"
                            />
                            <label htmlFor={`city-${city.id}`} className="ml-2 text-sm text-gray-700">
                              {city.label}
                            </label>
                          </div>
                          
                          <div className="space-y-2 pl-6">
                            {city.options?.map((area) => (
                              <div key={area.id} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`area-${area.id}`}
                                  checked={isSubOptionSelected('location', city.id, area.id)}
                                  onChange={() => toggleFilterOption('location', area.id)}
                                  className="rounded text-realestate-600 focus:ring-realestate-500"
                                />
                                <label htmlFor={`area-${area.id}`} className="ml-2 text-sm text-gray-600">
                                  {area.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Property Type */}
                <div className="space-y-3">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleCategory('propertyType')}
                  >
                    <h3 className="font-medium text-gray-800">Property Type</h3>
                    {expandedCategories.includes('propertyType') ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  
                  {expandedCategories.includes('propertyType') && (
                    <div className="space-y-2 pl-1">
                      {FILTER_OPTIONS.propertyType.map((option) => (
                        <div key={option.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`type-${option.id}`}
                            checked={isOptionSelected('propertyType', option.id)}
                            onChange={() => toggleFilterOption('propertyType', option.id)}
                            className="rounded text-realestate-600 focus:ring-realestate-500"
                          />
                          <label htmlFor={`type-${option.id}`} className="ml-2 text-sm text-gray-700">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Budget */}
                <div className="space-y-3">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleCategory('budget')}
                  >
                    <h3 className="font-medium text-gray-800">Budget</h3>
                    {expandedCategories.includes('budget') ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  
                  {expandedCategories.includes('budget') && (
                    <div className="space-y-2 pl-1">
                      {FILTER_OPTIONS.budget.map((option) => (
                        <div key={option.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`budget-${option.id}`}
                            checked={isOptionSelected('budget', option.id)}
                            onChange={() => toggleFilterOption('budget', option.id)}
                            className="rounded text-realestate-600 focus:ring-realestate-500"
                          />
                          <label htmlFor={`budget-${option.id}`} className="ml-2 text-sm text-gray-700">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Building Type */}
                <div className="space-y-3">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleCategory('buildingType')}
                  >
                    <h3 className="font-medium text-gray-800">Building Type</h3>
                    {expandedCategories.includes('buildingType') ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  
                  {expandedCategories.includes('buildingType') && (
                    <div className="space-y-2 pl-1">
                      {FILTER_OPTIONS.buildingType.map((option) => (
                        <div key={option.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`building-${option.id}`}
                            checked={isOptionSelected('buildingType', option.id)}
                            onChange={() => toggleFilterOption('buildingType', option.id)}
                            className="rounded text-realestate-600 focus:ring-realestate-500"
                          />
                          <label htmlFor={`building-${option.id}`} className="ml-2 text-sm text-gray-700">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Possession Status */}
                <div className="space-y-3">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleCategory('possessionStatus')}
                  >
                    <h3 className="font-medium text-gray-800">Possession Status</h3>
                    {expandedCategories.includes('possessionStatus') ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  
                  {expandedCategories.includes('possessionStatus') && (
                    <div className="space-y-2 pl-1">
                      {FILTER_OPTIONS.possessionStatus.map((option) => (
                        <div key={option.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`possession-${option.id}`}
                            checked={isOptionSelected('possessionStatus', option.id)}
                            onChange={() => toggleFilterOption('possessionStatus', option.id)}
                            className="rounded text-realestate-600 focus:ring-realestate-500"
                          />
                          <label htmlFor={`possession-${option.id}`} className="ml-2 text-sm text-gray-700">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Approvals */}
                <div className="space-y-3">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleCategory('approvals')}
                  >
                    <h3 className="font-medium text-gray-800">Approvals</h3>
                    {expandedCategories.includes('approvals') ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  
                  {expandedCategories.includes('approvals') && (
                    <div className="space-y-2 pl-1">
                      {FILTER_OPTIONS.approvals.map((option) => (
                        <div key={option.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`approval-${option.id}`}
                            checked={isOptionSelected('approvals', option.id)}
                            onChange={() => toggleFilterOption('approvals', option.id)}
                            className="rounded text-realestate-600 focus:ring-realestate-500"
                          />
                          <label htmlFor={`approval-${option.id}`} className="ml-2 text-sm text-gray-700">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end space-x-4">
              <button 
                onClick={clearAllFilters}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                Clear All
              </button>
              <button 
                onClick={toggleFilter}
                className="px-6 py-2 bg-realestate-600 hover:bg-realestate-700 text-white rounded-md font-medium transition duration-300"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilter;

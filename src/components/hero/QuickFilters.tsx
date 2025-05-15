
import React from 'react';

interface QuickFiltersProps {
  filters: string[];
}

const QuickFilters: React.FC<QuickFiltersProps> = ({ filters }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {filters.map((filter, index) => (
        <button 
          key={index}
          className="bg-realestate-50 hover:bg-realestate-100 text-realestate-700 px-4 py-1 rounded-full text-sm transition duration-200"
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default QuickFilters;

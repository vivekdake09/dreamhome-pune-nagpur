
import React from 'react';
import { ChevronRight } from 'lucide-react';
import PropertyCard, { PropertyCardProps } from './PropertyCard';

interface PropertySectionProps {
  title: string;
  subtitle?: string;
  properties: PropertyCardProps[];
  viewAllLink?: string;
}

const PropertySection: React.FC<PropertySectionProps> = ({
  title,
  subtitle,
  properties,
  viewAllLink
}) => {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
            {subtitle && (
              <p className="text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
          
          {viewAllLink && (
            <a 
              href={viewAllLink}
              className="flex items-center text-realestate-600 hover:text-realestate-700 font-medium"
            >
              View All
              <ChevronRight className="h-5 w-5 ml-1" />
            </a>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertySection;

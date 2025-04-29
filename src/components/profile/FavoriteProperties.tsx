
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { PropertyData } from '@/services/propertyService';
import { Link } from 'react-router-dom';

interface FavoritePropertiesProps {
  properties: PropertyData[];
  isLoading: boolean;
}

export default function FavoriteProperties({ properties, isLoading }: FavoritePropertiesProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="h-64 animate-pulse">
            <CardContent className="p-0 h-full">
              <div className="h-32 bg-gray-200 rounded-t-lg"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!properties.length) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-gray-500">You haven't added any properties to your favorites yet.</h3>
        <p className="text-gray-400 mt-2">Explore properties and click the heart icon to save them here.</p>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">
          Browse Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <Link key={property.id} to={`/property/${property.id}`}>
          <Card className="h-64 hover:shadow-md transition-shadow overflow-hidden">
            <CardContent className="p-0 h-full">
              <div 
                className="h-32 bg-cover bg-center" 
                style={{ 
                  backgroundImage: `url(${property.property_img_url_1 || '/placeholder.svg'})` 
                }}
              ></div>
              <div className="p-4">
                <h3 className="font-medium text-lg truncate">{property.title}</h3>
                <p className="text-sm text-gray-500 truncate">{property.location}</p>
                <p className="font-semibold mt-2">{property.price}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

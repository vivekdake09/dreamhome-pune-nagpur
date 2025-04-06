
import React from 'react';
import { MapPin, Home, Bed, Bath, Move, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const PropertyCard = ({
  id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  type,
  image,
  tags = [],
  isNew = false,
  isFeatured = false,
  possession
}) => {
  return (
    <Link to={`/property/${id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 hover-scale">
        <div className="relative">
          {/* Property Image */}
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
          
          {/* Tags on Image */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                NEW
              </span>
            )}
            {isFeatured && (
              <span className="bg-realestate-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                FEATURED
              </span>
            )}
          </div>
          
          {/* Price Tag */}
          <div className="absolute bottom-3 right-3">
            <span className="bg-white/90 text-realestate-800 px-3 py-1 rounded-md text-sm font-semibold shadow-sm">
              {price}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{title}</h3>
          
          {/* Location */}
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin className="h-4 w-4 mr-1 text-gray-400 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{location}</span>
          </div>
          
          {/* Property Details */}
          <div className="flex items-center justify-between mt-4 border-t border-gray-100 pt-3">
            <div className="flex items-center text-gray-600">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm">{bedrooms} {bedrooms > 1 ? 'Beds' : 'Bed'}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-sm">{bathrooms} {bathrooms > 1 ? 'Baths' : 'Bath'}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Move className="h-4 w-4 mr-1" />
              <span className="text-sm">{area}</span>
            </div>
          </div>
          
          {/* Property Type and Possession */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <Home className="h-4 w-4 mr-1 text-realestate-600" />
              <span className="text-sm text-gray-700">{type}</span>
            </div>
            {possession && (
              <div className="text-xs bg-realestate-50 text-realestate-800 px-2 py-1 rounded-full">
                {possession}
              </div>
            )}
          </div>
          
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;

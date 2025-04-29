
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PropertyDetail from '../components/PropertyDetail';
import HomeBot from '../components/HomeBot';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { fetchPropertyById, PropertyData } from '../services/propertyService';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [property, setProperty] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true);
      try {
        if (!id) {
          throw new Error('Property ID is missing');
        }
        
        const propertyData = await fetchPropertyById(id);
        
        if (!propertyData) {
          throw new Error('Property not found');
        }
        
        // Format the data for the PropertyDetail component
        const formattedProperty = {
          id: propertyData.id,
          title: propertyData.title,
          description: propertyData.description || 'No description available.',
          location: propertyData.location || 'Location not specified',
          price: propertyData.price || 'Price on request',
          pricePerSqFt: calculatePricePerSqFt(propertyData.price, propertyData.carpet_area),
          bedrooms: propertyData.bedrooms || 0,
          bathrooms: propertyData.bathrooms || 0,
          area: propertyData.carpet_area || 'Area not specified',
          propertyType: propertyData.type || 'Not specified',
          furnished: 'Not specified',
          possession: propertyData.status || 'Not specified',
          mainImage: propertyData.property_img_url_1 || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=80',
          images: [
            propertyData.property_img_url_1,
            propertyData.property_img_url_2,
          ].filter(Boolean) as string[],
          features: Array.isArray(propertyData.features_amenities) 
            ? propertyData.features_amenities 
            : ['No features available'],
          specifications: {
            'Floor': 'Not specified',
            'Total Floors': 'Not specified',
            'Age of Property': 'Not specified',
            'Balconies': 'Not specified',
            'Facing': 'Not specified',
            'Flooring': 'Not specified',
            'Furnishing': 'Not specified',
            'Car Parking': 'Not specified',
            'Water Supply': 'Not specified',
            'Electricity': 'Not specified'
          },
          reraInfo: propertyData.rera_info || 'RERA information not available',
          builderName: 'Information not available',
          builderDescription: propertyData.about || 'Builder information not available',
          videoTour: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          floorPlans: [
            {
              title: propertyData.bedrooms ? `${propertyData.bedrooms} BHK - (${propertyData.carpet_area || 'Area not specified'})` : 'Floor Plan',
              image: propertyData.property_img_url_1 || 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&auto=format&fit=crop&q=80'
            }
          ]
        };
        
        setProperty(formattedProperty);
      } catch (err: any) {
        setError(err.message || 'Failed to load property details. Please try again later.');
        console.error('Error fetching property:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProperty();
  }, [id]);
  
  // Helper function to calculate price per sq ft
  const calculatePricePerSqFt = (price?: string, area?: string): string => {
    if (!price || !area) return 'Not available';
    
    // Extract numeric value from price (assuming price format like "₹78.5 Lacs")
    const priceMatch = price.match(/[0-9.]+/);
    if (!priceMatch) return 'Not available';
    
    const priceValue = parseFloat(priceMatch[0]);
    
    // Extract numeric value from area (assuming area format like "1000 sq.ft.")
    const areaMatch = area.match(/[0-9.]+/);
    if (!areaMatch) return 'Not available';
    
    const areaValue = parseFloat(areaMatch[0]);
    
    if (isNaN(priceValue) || isNaN(areaValue) || areaValue === 0) {
      return 'Not available';
    }
    
    // Calculate price per sq ft
    const pricePerSqFt = Math.round(priceValue * 100000 / areaValue);
    return `₹${pricePerSqFt}`;
  };
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-4">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Link 
            to="/" 
            className="inline-flex items-center text-realestate-600 hover:text-realestate-700 font-medium mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to properties
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-[500px]">
            <Loader2 className="h-8 w-8 text-realestate-600 animate-spin" />
            <span className="ml-2 text-lg text-gray-600">Loading property details...</span>
          </div>
        ) : error ? (
          <div className="container mx-auto px-4 py-8 text-center">
            <div className="bg-red-50 text-red-700 p-4 rounded-lg max-w-lg mx-auto">
              <p>{error}</p>
              <Link to="/" className="text-realestate-600 hover:underline mt-4 inline-block">
                Go back to home page
              </Link>
            </div>
          </div>
        ) : property ? (
          <PropertyDetail {...property} />
        ) : null}
      </div>
      
      <HomeBot />
    </div>
  );
};

export default PropertyDetailPage;

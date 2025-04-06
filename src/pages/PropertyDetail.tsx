
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PropertyDetail from '../components/PropertyDetail';
import HomeBot from '../components/HomeBot';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [property, setProperty] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would fetch data from your API
    // For demo purposes, we'll just simulate an API call
    const fetchProperty = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock property data
        const mockProperty = {
          id: id || '1',
          title: 'Luxurious 3 BHK Apartment in Green Valley',
          description: `This luxurious 3 BHK apartment is located in one of the most prestigious societies in the area. With stunning views, modern amenities, and spacious rooms, this property offers the perfect blend of comfort and elegance.

The apartment features a spacious living room with large windows that allow plenty of natural light, a modern kitchen with high-quality fittings, and three well-sized bedrooms with attached bathrooms. The master bedroom includes a walk-in closet and a premium bathroom with a bathtub.

The society offers a host of amenities including a swimming pool, gymnasium, children's play area, landscaped gardens, and 24/7 security. Located close to major schools, hospitals, and shopping centers, this property offers both convenience and luxury.`,
          location: 'Green Valley, Baner, Pune',
          price: '₹78.5 Lacs',
          pricePerSqFt: '₹7,850',
          bedrooms: 3,
          bathrooms: 3,
          area: '1000 sq.ft.',
          propertyType: '3 BHK Apartment',
          furnished: 'Semi-Furnished',
          possession: 'Ready to Move',
          mainImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=80',
          images: [
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1600566753086-00f18fb6b3c7?w=800&auto=format&fit=crop&q=80'
          ],
          features: [
            'Swimming Pool',
            'Gymnasium',
            'Clubhouse',
            'Children\'s Play Area',
            'Landscaped Gardens',
            'Car Parking',
            '24/7 Security',
            'Power Backup',
            'Lift Access',
            'Jogging Track'
          ],
          specifications: {
            'Floor': '5th Floor',
            'Total Floors': '12',
            'Age of Property': 'New Construction',
            'Balconies': '2',
            'Facing': 'East',
            'Flooring': 'Vitrified Tiles',
            'Furnishing': 'Semi-Furnished',
            'Car Parking': '1 Covered',
            'Water Supply': '24/7',
            'Electricity': '24/7 with Backup'
          },
          reraInfo: `RERA Registration Number: PREG/2023/12345
          
Approved on: 15th June 2023
Valid till: 14th June 2028
          
Project Name: Green Valley Residences
Project Type: Residential Apartments
Total Units: 120
Total Floors: 12
          
Developer: Dreamland Developers Pvt. Ltd.
Developer RERA Reg No: DRER/DEV/2020/789`,
          builderName: 'Dreamland Developers',
          builderDescription: `Established in 2005, Dreamland Developers is one of the most trusted names in the real estate industry in Pune and Nagpur. With over 15 years of experience, the company has successfully delivered more than 25 residential and commercial projects across Maharashtra.

Dreamland Developers is known for their commitment to quality, innovation in design, and timely delivery of projects. Their construction practices adhere to the highest standards of quality and safety, ensuring that every property they build stands the test of time.

The company has received multiple awards for architectural excellence and customer satisfaction. Their vision is to create living spaces that enhance the quality of life while maintaining environmental sustainability.`,
          videoTour: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          floorPlans: [
            {
              title: '3 BHK - Type A (1000 sq.ft.)',
              image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&auto=format&fit=crop&q=80'
            },
            {
              title: '3 BHK - Type B (1100 sq.ft.)',
              image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3c7?w=800&auto=format&fit=crop&q=80'
            }
          ]
        };
        
        setProperty(mockProperty);
      } catch (err) {
        setError('Failed to load property details. Please try again later.');
        console.error('Error fetching property:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);
  
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

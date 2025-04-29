
import React, { useState } from 'react';
import {
  MapPin,
  Home,
  Info,
  Grid,
  FileText,
  Check,
  Layers,
  Award,
  Video,
  Building,
  Phone,
  Calendar,
  Share2
} from 'lucide-react';
import SiteVisitModal from './SiteVisitModal';

interface PropertyDetailProps {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  pricePerSqFt: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  propertyType: string;
  furnished: string;
  possession: string;
  mainImage: string;
  images: string[];
  features: string[];
  specifications: {
    [key: string]: string;
  };
  reraInfo: string;
  builderName: string;
  builderDescription: string;
  videoTour?: string | null;
  floorPlans?: {
    title: string;
    image: string;
  }[];
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({
  id,
  title,
  description,
  location,
  price,
  pricePerSqFt,
  bedrooms,
  bathrooms,
  area,
  propertyType,
  furnished,
  possession,
  mainImage,
  images,
  features,
  specifications,
  reraInfo,
  builderName,
  builderDescription,
  videoTour,
  floorPlans
}) => {
  const [activeImage, setActiveImage] = useState(mainImage);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSiteVisitModalOpen, setSiteVisitModalOpen] = useState(false);
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Info className="h-4 w-4" /> },
    { id: 'specifications', label: 'Specifications', icon: <Grid className="h-4 w-4" /> },
    { id: 'floor-plans', label: 'Floor Plans', icon: <Layers className="h-4 w-4" /> },
    { id: 'rera-info', label: 'RERA Info', icon: <FileText className="h-4 w-4" /> },
    { id: 'builder', label: 'Builder', icon: <Building className="h-4 w-4" /> }
  ];
  
  const openSiteVisitModal = () => {
    setSiteVisitModalOpen(true);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Property Images Slider */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main image */}
            <div className="lg:col-span-2">
              <div className="rounded-lg overflow-hidden h-[400px] lg:h-[500px] shadow-md bg-gray-100">
                <img 
                  src={activeImage} 
                  alt={title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex overflow-x-auto space-x-2 mt-3 pb-2">
                {[mainImage, ...images].map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(image)}
                    className={`flex-shrink-0 rounded-md overflow-hidden w-20 h-16 cursor-pointer transition-all ${activeImage === image ? 'ring-2 ring-realestate-600' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <img 
                      src={image} 
                      alt={`Property view ${index}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Property info card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-gray-600">{location}</span>
                    </div>
                  </div>
                  <button 
                    className="text-gray-500 hover:text-gray-700"
                    title="Share property"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-gray-800">{price}</span>
                    <span className="text-gray-600 text-sm">{pricePerSqFt} per sq.ft.</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <span className="block text-xl font-semibold text-gray-800">{bedrooms}</span>
                      <span className="text-gray-600 text-sm">Bedrooms</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-xl font-semibold text-gray-800">{bathrooms}</span>
                      <span className="text-gray-600 text-sm">Bathrooms</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-xl font-semibold text-gray-800">{area}</span>
                      <span className="text-gray-600 text-sm">Area</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Type</span>
                      <span className="font-medium text-gray-800">{propertyType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Furnished Status</span>
                      <span className="font-medium text-gray-800">{furnished}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Possession</span>
                      <span className="font-medium text-gray-800">{possession}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 space-y-3">
                  <button 
                    onClick={openSiteVisitModal}
                    className="w-full bg-realestate-600 hover:bg-realestate-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 flex justify-center items-center"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule a Site Visit
                  </button>
                  <a 
                    href="tel:+919876543210"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 flex justify-center items-center"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <div className="bg-white shadow-sm sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto space-x-1 py-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 flex items-center whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-realestate-600 border-b-2 border-realestate-600 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">About This Property</h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {description}
                </p>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Features & Amenities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-realestate-600 mr-2 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {videoTour && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Video className="h-5 w-5 mr-2 text-realestate-600" />
                      Video Tour
                    </h3>
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
                      <video
                        width="100%" 
                        height="315"
                        src={videoTour}
                        title="Property Video Tour" 
                        controls
                        className="rounded-lg"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-realestate-600" />
                  Project Highlights
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-realestate-50 rounded-full p-1 mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-realestate-600" />
                    </div>
                    <span className="text-gray-700">RERA Approved</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-realestate-50 rounded-full p-1 mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-realestate-600" />
                    </div>
                    <span className="text-gray-700">NA Sanctioned Plot</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-realestate-50 rounded-full p-1 mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-realestate-600" />
                    </div>
                    <span className="text-gray-700">Premium Location</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-realestate-50 rounded-full p-1 mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-realestate-600" />
                    </div>
                    <span className="text-gray-700">Well Connected</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-realestate-50 rounded-full p-1 mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-realestate-600" />
                    </div>
                    <span className="text-gray-700">Modern Amenities</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  Our experts are available to answer any questions about this property.
                </p>
                <a 
                  href="tel:+919876543210" 
                  className="bg-realestate-600 hover:bg-realestate-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Expert
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Specifications Tab */}
        {activeTab === 'specifications' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Property Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">{key}</span>
                  <span className="font-medium text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Floor Plans Tab */}
        {activeTab === 'floor-plans' && floorPlans && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Floor Plans</h2>
            <div className="space-y-8">
              {floorPlans.map((plan, index) => (
                <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{plan.title}</h3>
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src={plan.image} 
                      alt={`${plan.title} Floor Plan`} 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* RERA Info Tab */}
        {activeTab === 'rera-info' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-realestate-600" />
              RERA Details
            </h2>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <p className="whitespace-pre-line text-gray-700">{reraInfo}</p>
            </div>
            <div className="mt-6 bg-realestate-50 p-4 rounded-lg border border-realestate-100">
              <h3 className="text-realestate-800 font-medium mb-2">Why is RERA important?</h3>
              <p className="text-sm text-gray-700">
                RERA (Real Estate Regulatory Authority) was established to ensure transparency in the real estate sector and protect buyer interests. Always check RERA approval before investing in a property.
              </p>
            </div>
          </div>
        )}
        
        {/* Builder Tab */}
        {activeTab === 'builder' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">About the Builder</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center text-center">
                  <Building className="h-12 w-12 text-realestate-600 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-800">{builderName}</h3>
                  <div className="mt-4 w-full space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Projects Completed</span>
                      <span className="font-medium">25+</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Years of Experience</span>
                      <span className="font-medium">15+</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Cities Present</span>
                      <span className="font-medium">3</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Builder Description</h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {builderDescription}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Site Visit Modal */}
      <SiteVisitModal
        propertyId={id}
        propertyName={title}
        isOpen={isSiteVisitModalOpen}
        onClose={() => setSiteVisitModalOpen(false)}
      />
    </div>
  );
};

export default PropertyDetail;

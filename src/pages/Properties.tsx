
import React from 'react';
import Navbar from '@/components/Navbar';
import PropertyCard, { PropertyCardProps } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, Home, SlidersHorizontal, X } from 'lucide-react';

// Sample properties data (this would typically come from an API)
const properties: PropertyCardProps[] = [
  {
    id: "1",
    title: "Modern Apartment with Sea View",
    location: "Bandra, Mumbai",
    price: "1.25 Cr",
    bedrooms: 3,
    bathrooms: 2,
    area: "1200 sq.ft.",
    type: "Apartment",
    image: "/placeholder.svg",
    isFeatured: true,
    isNew: true
  },
  {
    id: "2",
    title: "Luxury Villa with Private Pool",
    location: "Koregaon Park, Pune",
    price: "2.5 Cr",
    bedrooms: 4,
    bathrooms: 3,
    area: "3500 sq.ft.",
    type: "Villa",
    image: "/placeholder.svg",
    isFeatured: true,
    tags: ["Swimming Pool", "Garden"]
  },
  {
    id: "3",
    title: "Cozy Studio in City Center",
    location: "MG Road, Bangalore",
    price: "0.75 Cr",
    bedrooms: 1,
    bathrooms: 1,
    area: "600 sq.ft.",
    type: "Studio",
    image: "/placeholder.svg",
    isNew: true,
    possession: "Ready to Move"
  },
  {
    id: "4",
    title: "Family Home with Garden",
    location: "Viman Nagar, Pune",
    price: "1.8 Cr",
    bedrooms: 3,
    bathrooms: 2,
    area: "2200 sq.ft.",
    type: "House",
    image: "/placeholder.svg",
    tags: ["Garden", "Parking"]
  },
  {
    id: "5",
    title: "Penthouse with Terrace",
    location: "South Delhi, Delhi",
    price: "3.2 Cr",
    bedrooms: 3,
    bathrooms: 3,
    area: "2400 sq.ft.",
    type: "Penthouse",
    image: "/placeholder.svg",
    isFeatured: true,
    tags: ["Terrace", "City View"]
  },
  {
    id: "6",
    title: "Commercial Office Space",
    location: "Hitec City, Hyderabad",
    price: "4.5 Cr",
    bedrooms: 0,
    bathrooms: 2,
    area: "4000 sq.ft.",
    type: "Commercial",
    image: "/placeholder.svg",
    possession: "Q4 2025"
  }
];

const Properties: React.FC = () => {
  const [isFilterVisible, setIsFilterVisible] = React.useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-10">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 text-foreground">Browse Properties</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover your dream home among our exclusive listings.
          </p>
        </header>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search by location, property name..." 
                className="pl-10"
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
                <Select>
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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Any City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any City</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Bedrooms</label>
                <Select>
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
                <Select>
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
                  defaultValue={[0, 5]} 
                  max={10}
                  step={0.5}
                  className="my-4"
                />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">₹0 Cr</span>
                  <span className="text-sm text-muted-foreground">₹10 Cr+</span>
                </div>
              </div>
              
              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium mb-4 text-foreground">Area (sq.ft.)</label>
                <Slider 
                  defaultValue={[0, 5000]} 
                  max={10000}
                  step={500}
                  className="my-4"
                />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">0 sq.ft.</span>
                  <span className="text-sm text-muted-foreground">10000+ sq.ft.</span>
                </div>
              </div>
              
              <div className="md:col-span-3 lg:col-span-4 flex justify-end space-x-4">
                <Button variant="outline">Reset</Button>
                <Button>Apply Filters</Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Results Count & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <p className="text-foreground mb-4 sm:mb-0">
            <span className="font-medium">{properties.length}</span> properties found
          </p>
          
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <Button variant="outline" className="mr-2">Previous</Button>
          <Button variant="outline" className="mx-1 bg-primary text-primary-foreground">1</Button>
          <Button variant="outline" className="mx-1">2</Button>
          <Button variant="outline" className="mx-1">3</Button>
          <Button variant="outline" className="ml-2">Next</Button>
        </div>
      </div>

      {/* Empty State */}
      {properties.length === 0 && (
        <div className="text-center py-16">
          <Home className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">No properties found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search filters</p>
          <Button>Reset Filters</Button>
        </div>
      )}

      <footer className="bg-muted py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">© 2025 by BookMyDreamHome Pvt Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Properties;

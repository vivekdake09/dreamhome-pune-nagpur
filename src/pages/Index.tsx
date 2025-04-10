
import React from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import PropertyFilter from '../components/PropertyFilter';
import PropertySection from '../components/PropertySection';
import HomeBot from '../components/HomeBot';
import BuilderAdCarousel from '../components/BuilderAdCarousel';
import LocationSearch from '../components/LocationSearch';

const Index: React.FC = () => {
  // Mock data for property listings
  const readyToMoveProperties = [
    {
      id: "1",
      title: "Luxurious 3 BHK Apartment in Green Valley",
      location: "Baner, Pune",
      price: "₹78.5 Lacs",
      bedrooms: 3,
      bathrooms: 3,
      area: "1000 sq.ft.",
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=80",
      tags: ["Gym", "Swimming Pool"],
      possession: "Ready to Move"
    },
    {
      id: "2",
      title: "Elegant 2 BHK in Prime Location",
      location: "Kharadi, Pune",
      price: "₹55 Lacs",
      bedrooms: 2,
      bathrooms: 2,
      area: "850 sq.ft.",
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&auto=format&fit=crop&q=80",
      isFeatured: true,
      possession: "Ready to Move"
    },
    {
      id: "3",
      title: "Modern 1.5 BHK with Garden View",
      location: "Hinjewadi, Pune",
      price: "₹42 Lacs",
      bedrooms: 1,
      bathrooms: 1,
      area: "650 sq.ft.",
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=800&auto=format&fit=crop&q=80",
      tags: ["Garden View", "Security"],
      possession: "Ready to Move"
    },
    {
      id: "4",
      title: "Premium 2.5 BHK with Balcony",
      location: "Wakad, Pune",
      price: "₹65 Lacs",
      bedrooms: 2,
      bathrooms: 2,
      area: "950 sq.ft.",
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3c7?w=800&auto=format&fit=crop&q=80",
      possession: "Ready to Move"
    }
  ];

  const nearingPossessionProperties = [
    {
      id: "5",
      title: "Spacious 3 BHK in Green Hills",
      location: "Viman Nagar, Pune",
      price: "₹82 Lacs",
      bedrooms: 3,
      bathrooms: 2,
      area: "1200 sq.ft.",
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&auto=format&fit=crop&q=80",
      isNew: true,
      possession: "Nov 2023"
    },
    {
      id: "6",
      title: "Modern 2 BHK in City Center",
      location: "Dharampeth, Nagpur",
      price: "₹58 Lacs",
      bedrooms: 2,
      bathrooms: 2,
      area: "900 sq.ft.",
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      tags: ["Park", "Clubhouse"],
      possession: "Dec 2023"
    },
    {
      id: "7",
      title: "Elegant Row House with Garden",
      location: "Ramdaspeth, Nagpur",
      price: "₹1.2 Cr",
      bedrooms: 3,
      bathrooms: 3,
      area: "1800 sq.ft.",
      type: "Row House",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      isFeatured: true,
      possession: "Jan 2024"
    },
    {
      id: "8",
      title: "Premium 4 BHK Villa",
      location: "Civil Lines, Nagpur",
      price: "₹1.8 Cr",
      bedrooms: 4,
      bathrooms: 4,
      area: "2500 sq.ft.",
      type: "Villa",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
      isNew: true,
      possession: "Feb 2024"
    }
  ];

  const recentlyLaunchedProperties = [
    {
      id: "9",
      title: "Affordable 1BHK in Prime Location",
      location: "Sadar, Nagpur",
      price: "₹35 Lacs",
      bedrooms: 1,
      bathrooms: 1,
      area: "550 sq.ft.",
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&auto=format&fit=crop&q=80",
      isNew: true,
      possession: "Aug 2025"
    },
    {
      id: "10",
      title: "Luxury 3 BHK in Riverside Towers",
      location: "Baner, Pune",
      price: "₹95 Lacs",
      bedrooms: 3,
      bathrooms: 3,
      area: "1400 sq.ft.",
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop&q=80",
      isNew: true,
      possession: "Dec 2025"
    },
    {
      id: "11",
      title: "Premium 2 BHK with Lake View",
      location: "Hinjewadi, Pune",
      price: "₹68 Lacs",
      bedrooms: 2,
      bathrooms: 2,
      area: "950 sq.ft.",
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80",
      isFeatured: true,
      possession: "Jun 2025"
    },
    {
      id: "12",
      title: "Elegant Studio Apartment",
      location: "Kharadi, Pune",
      price: "₹28 Lacs",
      bedrooms: 1,
      bathrooms: 1,
      area: "400 sq.ft.",
      type: "Studio",
      image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop&q=80",
      isNew: true,
      possession: "Jul 2025"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* New Builder Ad Carousel */}
      <BuilderAdCarousel />
      
      {/* New Location Search Section */}
      <LocationSearch />
      
      <HeroBanner />
      <PropertyFilter />
      
      <PropertySection 
        title="Ready to Move Properties" 
        subtitle="Move into your dream home immediately" 
        properties={readyToMoveProperties} 
        viewAllLink="#"
      />
      
      <PropertySection 
        title="Nearing Possession" 
        subtitle="Properties that will be ready soon" 
        properties={nearingPossessionProperties} 
        viewAllLink="#"
      />
      
      <PropertySection 
        title="Recently Launched" 
        subtitle="New properties with great investment potential" 
        properties={recentlyLaunchedProperties} 
        viewAllLink="#"
      />
      
      {/* Testimonials Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">What Our Customers Say</h2>
            <p className="text-gray-600 mt-2">Trusted by hundreds of satisfied homeowners</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-realestate-100 text-realestate-600 flex items-center justify-center font-bold text-xl">
                  RP
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Rahul Patel</h4>
                  <div className="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "BookMyDreamHome helped me find my perfect home in Pune. Their filters made it easy to narrow down properties that matched my requirements. Highly recommended!"
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-realestate-100 text-realestate-600 flex items-center justify-center font-bold text-xl">
                  AS
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Anjali Singh</h4>
                  <div className="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The site visit scheduling feature saved me so much time. I could book visits at my convenience and the representatives were always on time and knowledgeable."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-realestate-100 text-realestate-600 flex items-center justify-center font-bold text-xl">
                  VK
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Vijay Kumar</h4>
                  <div className="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The detailed property information and virtual tours helped me shortlist properties from Nagpur while I was still in Mumbai. Made the entire process seamless."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Why Choose BookMyDreamHome</h2>
            <p className="text-gray-600 mt-2">We're committed to making your home buying journey seamless</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="h-16 w-16 bg-realestate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-realestate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Verified Listings</h3>
              <p className="text-gray-600">All our properties are verified and have complete documentation</p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center">
              <div className="h-16 w-16 bg-realestate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-realestate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Virtual Tours</h3>
              <p className="text-gray-600">Explore properties from the comfort of your home with virtual tours</p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center">
              <div className="h-16 w-16 bg-realestate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-realestate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure Transactions</h3>
              <p className="text-gray-600">We ensure secure and transparent transactions for peace of mind</p>
            </div>
            
            {/* Feature 4 */}
            <div className="text-center">
              <div className="h-16 w-16 bg-realestate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-realestate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Expert Support</h3>
              <p className="text-gray-600">Our real estate experts are always available to guide you</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div>
              <h3 className="text-xl font-bold mb-4">BookMyDreamHome</h3>
              <p className="text-gray-400 mb-4">
                Your trusted partner in finding the perfect home in Pune and Nagpur.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.159 1.207 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Home</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">About Us</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Properties</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Blog</a>
                </li>
              </ul>
            </div>
            
            {/* Column 3 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Locations</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Pune</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Nagpur</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Baner</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Hinjewadi</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Kharadi</a>
                </li>
              </ul>
            </div>
            
            {/* Column 4 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="text-gray-400">123 Main Street, Pune, Maharashtra</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span className="text-gray-400">+91 98765 43210</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span className="text-gray-400">info@bookmydreamhome.in</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} BookMyDreamHome.in. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      <HomeBot />
    </div>
  );
};

export default Index;

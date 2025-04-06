
import React, { useState } from 'react';
import { Menu, X, MapPin, User, Phone } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState<string | null>(null);

  // City selection dropdown
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const cities = ['Pune', 'Nagpur'];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCityDropdown = () => setIsCityDropdownOpen(!isCityDropdownOpen);
  
  const selectCity = (city: string) => {
    setCurrentCity(city);
    setIsCityDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4 px-4 md:px-0">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="font-bold text-2xl text-realestate-700">
              BookMyDreamHome
              <span className="text-sm text-realestate-500">.in</span>
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button 
                onClick={toggleCityDropdown}
                className="flex items-center text-gray-700 hover:text-realestate-600"
              >
                <MapPin className="w-4 h-4 mr-1" />
                <span>{currentCity || 'Select City'}</span>
              </button>
              
              {isCityDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-md py-2 w-48 z-30">
                  {cities.map((city) => (
                    <button
                      key={city}
                      className="block w-full text-left px-4 py-2 hover:bg-realestate-50 text-gray-700"
                      onClick={() => selectCity(city)}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <a href="#" className="text-gray-700 hover:text-realestate-600">Home</a>
            <a href="#" className="text-gray-700 hover:text-realestate-600">Properties</a>
            <a href="#" className="text-gray-700 hover:text-realestate-600">Services</a>
            <a href="#" className="text-gray-700 hover:text-realestate-600">About Us</a>
            <a href="#" className="text-gray-700 hover:text-realestate-600">Contact</a>
            
            {/* User actions */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-700 hover:text-realestate-600">
                <User className="w-5 h-5" />
              </button>
              <a href="tel:+919876543210" className="bg-realestate-600 hover:bg-realestate-700 text-white px-4 py-2 rounded-md transition duration-300 flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>Contact Us</span>
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-3">
            <div className="py-2">
              <button 
                onClick={toggleCityDropdown}
                className="flex items-center text-gray-700"
              >
                <MapPin className="w-4 h-4 mr-2" />
                <span>{currentCity || 'Select City'}</span>
              </button>
              
              {isCityDropdownOpen && (
                <div className="mt-1 bg-gray-50 rounded-md py-2">
                  {cities.map((city) => (
                    <button
                      key={city}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                      onClick={() => selectCity(city)}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a href="#" className="block py-2 text-gray-700">Home</a>
            <a href="#" className="block py-2 text-gray-700">Properties</a>
            <a href="#" className="block py-2 text-gray-700">Services</a>
            <a href="#" className="block py-2 text-gray-700">About Us</a>
            <a href="#" className="block py-2 text-gray-700">Contact</a>
            <div className="pt-2">
              <a href="tel:+919876543210" className="bg-realestate-600 hover:bg-realestate-700 text-white px-4 py-2 rounded-md transition duration-300 inline-flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

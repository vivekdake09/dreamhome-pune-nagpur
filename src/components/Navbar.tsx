
import React, { useState } from 'react';
import { Menu, X, MapPin, User, Phone, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from '@/lib/auth';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState<string | null>(null);

  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const cities = ['Pune', 'Nagpur'];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCityDropdown = () => setIsCityDropdownOpen(!isCityDropdownOpen);
  
  const selectCity = (city: string) => {
    setCurrentCity(city);
    setIsCityDropdownOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4 px-4 md:px-0">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-2xl text-realestate-700">
              BookMyDreamHome
              <span className="text-sm text-realestate-500">.in</span>
            </span>
          </Link>

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
            
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-realestate-600"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4">
              {user ? (
                <Popover>
                  <PopoverTrigger>
                    <Avatar>
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback>
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-48">
                    <div className="space-y-2">
                      <Link 
                        to="/profile" 
                        className="block w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md"
                      >
                        Profile
                      </Link>
                      <Link 
                        to="/my-properties" 
                        className="block w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md"
                      >
                        My Properties
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md"
                      >
                        Log out
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              )}
            </div>
          </div>

          <button 
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

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
            
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="block py-2 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
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

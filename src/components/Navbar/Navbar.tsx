import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
    isScrolled || !transparent
      ? 'bg-white shadow-md py-2'
      : 'bg-transparent py-4'
  }`;

  const linkClasses = `font-medium transition-colors duration-200 ${
    isScrolled || !transparent ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-indigo-200'
  }`;

  const logoClasses = `text-xl font-bold ${
    isScrolled || !transparent ? 'text-indigo-600' : 'text-white'
  }`;

  const mobileButtonClasses = `${
    isScrolled || !transparent ? 'text-gray-700' : 'text-white'
  }`;

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className={logoClasses}>
              YourLogo
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {['Home', 'Features', 'Pricing', 'About', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className={`${linkClasses} px-3 py-2 rounded-md`}>
                  {item}
                </a>
              ))}
              <Button 
                href="#"
                variant={isScrolled || !transparent ? "primary" : "secondary"}
                size="md"
              >
                Sign Up
              </Button>
            </div>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className={`${mobileButtonClasses} inline-flex items-center justify-center p-2 rounded-md hover:bg-opacity-20 hover:bg-gray-700 focus:outline-none`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          {['Home', 'Features', 'Pricing', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-700 hover:text-indigo-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <Button 
            href="#"
            variant="primary"
            size="md"
            fullWidth
          >
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

'use client'

import React, { useState } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Menu, X, FlaskConical, SearchIcon } from 'lucide-react'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { useRouter } from 'next/navigation'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const router = useRouter();
  const navItems = header?.navItems || []
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (link) => {
    // Close the mobile menu
    setIsMobileMenuOpen(false);

    // Determine the navigation path
    let navigationPath = '';
    
    if (link.type === 'reference' && link.reference?.value) {
      // If it's a reference to a page, use its URL
      navigationPath = link.reference.value.slug || '';
    } else if (link.url) {
      // Use the provided URL
      navigationPath = link.url;
    } else if (link.label) {
      // Create a path from the label if no explicit URL is provided
      navigationPath = `/${link.label.toLowerCase()}`;
    }

    // Remove leading slash to ensure correct routing
    navigationPath = navigationPath.replace(/^\//, '');

    // Perform navigation
    router.push(`/${navigationPath}`);
  };

  const NavList = () => (
    <div className="flex flex-col  sm:flex-row gap-6 items-start sm:items-center">
      {navItems.map(({ link }, i) => (
        <div 
          key={i} 
          onClick={() => handleNavigation(link)}
          className="w-full cursor-pointer"
        >
          <CMSLink 
            {...link} 
            appearance="link" 
            className="block py-2 hover:bg-secondary/10 w-full text-xl sm:text-2xl"
          />
        </div>
      ))}
      <div 
        onClick={() => {
          setIsMobileMenuOpen(false);
          router.push('/search');
        }}
        className="w-full cursor-pointer"
      >
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </div>
      <ThemeSelector   />
      <div 
        onClick={() => {
          setIsMobileMenuOpen(false);
          router.push('/lab');
        }}
        className="w-full flex items-center justify-start cursor-pointer"
      >  
      
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden sm:flex gap-3 items-center justify-start sm:gap-6 lg:gap-10">
        <NavList />
      </nav>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex items-center justify-end">
        {/* Hamburger Menu Button */}
        <button 
          onClick={toggleMobileMenu} 
          className="z-50 relative p-2"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-background/90 z-40 pt-24 px-4 overflow-y-auto flex justify-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <nav 
              className="flex flex-col space-y-2"
              onClick={(e) => e.stopPropagation()}
            >
              <NavList />
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
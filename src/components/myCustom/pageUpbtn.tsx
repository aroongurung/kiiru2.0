"use client";
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const PageUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when the user is at the bottom of the page
  const checkScrollPosition = () => {
    const isAtBottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;
    setIsVisible(isAtBottom);
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', checkScrollPosition);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {isVisible && (
        <button
        onClick={scrollToTop}
        className="fixed bottom-48 right-48 p-3 rounded-full shadow-lg md:right-80 md:bottom-40 hover:bg-zinc-300 hover:text-zinc-950 transition"
        aria-label="Scroll to top"
      >
        <ArrowUp size={28} />
      </button>
      
      )}
    </>
  );
};

export default PageUpButton;

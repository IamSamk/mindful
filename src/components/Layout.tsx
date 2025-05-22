
import React, { useEffect } from "react";
import Navigation from "./Navigation";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "../contexts/LanguageContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Prevent scrolling and bouncing effects in mobile browsers
    document.body.style.overscrollBehavior = "none";
    
    // Hide address bar on mobile when possible
    const hideAddressBar = () => window.scrollTo(0, 1);
    window.addEventListener('load', hideAddressBar);
    window.addEventListener('orientationchange', hideAddressBar);
    
    // Prevent double-tap to zoom on mobile
    document.documentElement.style.touchAction = "manipulation";
    
    return () => {
      window.removeEventListener('load', hideAddressBar);
      window.removeEventListener('orientationchange', hideAddressBar);
      document.body.style.overscrollBehavior = "";
      document.documentElement.style.touchAction = "";
    };
  }, []);
  
  return (
    <div className="mobile-container">
      <div className="page-container">
        <AnimatePresence mode="wait">
          <div 
            key={location.pathname} 
            className="page-content scrollbar-hidden"
            style={{ 
              WebkitOverflowScrolling: "touch", 
              overscrollBehavior: "none" 
            }}
          >
            {children}
          </div>
        </AnimatePresence>
      </div>
      <Navigation />
    </div>
  );
};

export default Layout;

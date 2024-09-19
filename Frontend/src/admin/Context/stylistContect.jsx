import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const StylistContext = createContext();

// Custom hook to use the StylistContext
export const useStylists = () => {
  return useContext(StylistContext);
};

export const StylistProvider = ({ children }) => {
  const [stylists, setStylists] = useState(() => {
    // Retrieve from localStorage on component mount
    const storedStylists = localStorage.getItem('stylists');
    return storedStylists ? JSON.parse(storedStylists) : [];
  });

  // Function to add a new stylist
  const addStylist = (stylist) => {
    setStylists((prevStylists) => {
      const updatedStylists = [...prevStylists, stylist];
      localStorage.setItem('stylists', JSON.stringify(updatedStylists)); // Save updated stylists to localStorage
      return updatedStylists;
    });
  };

  // Function to update availability
  const toggleAvailability = (id) => {
    setStylists((prevStylists) => {
      const updatedStylists = prevStylists.map((stylist) =>
        stylist.id === id ? { ...stylist, available: !stylist.available } : stylist
      );
      localStorage.setItem('stylists', JSON.stringify(updatedStylists)); // Save updated stylists to localStorage
      return updatedStylists;
    });
  };

   // Function to remove a stylist
   const removeStylist = (id) => {
    setStylists((prevStylists) => {
      const updatedStylists = prevStylists.filter((stylist) => stylist.id !== id);
      localStorage.setItem('stylists', JSON.stringify(updatedStylists)); // Update localStorage after deletion
      return updatedStylists;
    });
  };

  return (
    <StylistContext.Provider value={{ stylists, addStylist, toggleAvailability, removeStylist }}>
      {children}
    </StylistContext.Provider>
  );
};
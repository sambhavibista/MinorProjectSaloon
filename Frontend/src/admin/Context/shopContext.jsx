import React, { createContext, useState, useContext, useEffect } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Get initial shops from local storage or default to an empty array
  const [shops, setShops] = useState(() => {
    const savedShops = localStorage.getItem('shops');
    return savedShops ? JSON.parse(savedShops) : [];
  });

  // Persist shops to local storage whenever they are updated
  useEffect(() => {
    localStorage.setItem('shops', JSON.stringify(shops));
  }, [shops]);

  const addShop = (shop) => {
    setShops((prevShops) => [...prevShops, { ...shop, id: Date.now() }]);
  };

  const deleteShop = (id) => {
    setShops((prevShops) => prevShops.filter(shop => shop.id !== id));
  };

  const updateShop = (updatedShop) => {
    setShops(prevShops => 
      prevShops.map(shop => shop.id === updatedShop.id ? updatedShop : shop)
    );
  };


  return (
    <ShopContext.Provider value={{ shops, addShop, deleteShop, updateShop}}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShops = () => useContext(ShopContext);
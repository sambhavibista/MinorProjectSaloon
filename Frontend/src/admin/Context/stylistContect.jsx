import { useState, useEffect, useContext, createContext } from 'react';

const StylistContext = createContext();

export const useStylists = () => useContext(StylistContext);

export const StylistProvider = ({ children }) => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = () => {
      const storedShops = localStorage.getItem('shops');
      if (storedShops) {
        setShops(JSON.parse(storedShops));
      }
    };

    fetchShops();

    const intervalId = setInterval(fetchShops, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const addStylistToShop = (shopId, stylist) => {
    setShops((prevShops) => {
      const updatedShops = prevShops.map((shop) =>
        shop.id === shopId
          ? { ...shop, stylists: [...shop.stylists, stylist] }
          : shop
      );
      localStorage.setItem('shops', JSON.stringify(updatedShops));
      return updatedShops;
    });
  };

  const toggleAvailability = (shopId, stylistId) => {
    setShops((prevShops) => {
      const updatedShops = prevShops.map((shop) => {
        if (shop.id === shopId) {
          const updatedStylists = shop.stylists.map((stylist) =>
            stylist.id === stylistId
              ? { ...stylist, available: !stylist.available }
              : stylist
          );
          return { ...shop, stylists: updatedStylists };
        }
        return shop;
      });
      localStorage.setItem('shops', JSON.stringify(updatedShops));
      return updatedShops;
    });
  };

  const removeStylistFromShop = (shopId, stylistId) => {
    setShops((prevShops) => {
      const updatedShops = prevShops.map((shop) => {
        if (shop.id === shopId) {
          const updatedStylists = shop.stylists.filter((stylist) => stylist.id !== stylistId);
          return { ...shop, stylists: updatedStylists };
        }
        return shop;
      });
      localStorage.setItem('shops', JSON.stringify(updatedShops));
      return updatedShops;
    });
  };

  return (
    <StylistContext.Provider value={{ shops, addStylistToShop, toggleAvailability, removeStylistFromShop }}>
      {children}
    </StylistContext.Provider>
  );
};

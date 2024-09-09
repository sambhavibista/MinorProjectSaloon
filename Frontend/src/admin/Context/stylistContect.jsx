import React, { createContext, useState, useContext } from 'react';

// Create context
const StylistContext = createContext();

// Custom hook to use the StylistContext
export const useStylists = () => {
  return useContext(StylistContext);
};

export const StylistProvider = ({ children }) => {
  // Initial stylist data
  const initialStylistList = [
    { id: 1, name: 'Nina', service: 'Hair Coloring', image: 'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg', available: true },
    { id: 2, name: 'Tina', service: 'Hair Smoothing', image: 'https://as1.ftcdn.net/v2/jpg/04/29/61/12/1000_F_429611211_kPJMCjPS1xiIXZ5laYd4h0WGTU8iFEnp.jpg', available: false },
    { id: 3, name: 'David', service: 'Hair Cutting', image: 'https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.webp?b=1&s=612x612&w=0&k=20&c=07SAQPb33q39bTswXx3DsQWU0Mwnuvs2GxigTlLo9Lg=', available: true },
    { id: 4, name: 'Sophia', service: 'Facials', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO2vBQ1vOla9pPM6M0ZsYZb7OckCS21cgN_Q&s', available: false },
    { id: 5, name: 'John', service: 'Hair Styling', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?cs=srgb&dl=pexels-justin-shaifer-501272-1222271.jpg&fm=jpg', available: true },
    { id: 6, name: 'Emma', service: 'Herbal Massage', image: 'https://img.freepik.com/free-photo/alluring-young-african-american-female-with-dark-curly-hairstyle-smiling-determined-motivated-cross-arms-chest-confident-pose-smiling-daring-camera-white-wall_176420-35065.jpg?size=626&ext=jpg&ga=GA1.1.1687694167.1712016000&semt=ais', available: true },
    { id: 7, name: 'Mina', service: 'Hair Coloring', image: 'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg', available: true },
    { id: 8, name: 'Rina', service: 'Hair Smoothing', image: 'https://as1.ftcdn.net/v2/jpg/04/29/61/12/1000_F_429611211_kPJMCjPS1xiIXZ5laYd4h0WGTU8iFEnp.jpg', available: false },
    { id: 9, name: 'joey', service: 'Hair Cutting', image: 'https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.webp?b=1&s=612x612&w=0&k=20&c=07SAQPb33q39bTswXx3DsQWU0Mwnuvs2GxigTlLo9Lg=', available: true },
    { id: 10, name: 'pohiya', service: 'Facials', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO2vBQ1vOla9pPM6M0ZsYZb7OckCS21cgN_Q&s', available: false },
    { id: 11, name: 'rohn', service: 'Hair Styling', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?cs=srgb&dl=pexels-justin-shaifer-501272-1222271.jpg&fm=jpg', available: true },
    { id: 12, name: 'watson', service: 'Herbal Massage', image: 'https://img.freepik.com/free-photo/alluring-young-african-american-female-with-dark-curly-hairstyle-smiling-determined-motivated-cross-arms-chest-confident-pose-smiling-daring-camera-white-wall_176420-35065.jpg?size=626&ext=jpg&ga=GA1.1.1687694167.1712016000&semt=ais', available: true },
    // Add more stylists as needed
  ];

  const [stylists, setStylists] = useState(initialStylistList);

  // Function to update availability
  const toggleAvailability = (id) => {
    setStylists((prevStylists) =>
      prevStylists.map((stylist) =>
        stylist.id === id ? { ...stylist, available: !stylist.available } : stylist
      )
    );
  };

  return (
    <StylistContext.Provider value={{ stylists, toggleAvailability }}>
      {children}
    </StylistContext.Provider>
  );
};

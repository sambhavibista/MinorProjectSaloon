import React, { useEffect, useState } from "react";
import CommonCard from "./stylist_section_card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useStylists } from "../../admin/Context/stylistContect";

function StylistService({ onCardClick, shopId }) {  // Pass the shopId prop to get the correct stylists for the shop
  const { shops } = useStylists();
  const [stylistList, setStylistList] = useState([]);

  useEffect(() => {
    // Fetch stylists for the specific shop from localStorage or context
    const fetchStylists = () => {
      const storedShops = JSON.parse(localStorage.getItem("shops")) || [];
      const currentShop = storedShops.find((shop) => shop.id === shopId);
      if (currentShop && currentShop.stylists) {
        setStylistList(currentShop.stylists);
      }
    };

    fetchStylists();

    // Poll every 5 seconds to check for updates in localStorage
    const intervalId = setInterval(fetchStylists, 5000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [shopId]); // Depend on shopId to fetch the correct shop's stylists


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const handleCardClick = (item) => {
    const { name } = item;
    console.log("Clicked on card with name:", name);
    onCardClick({ name });
  };

  return (
    <div className="center__carousel" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Slider {...settings}>
        {stylistList.map((item) => (
          <div key={item.id} className="top-card-wrapper" onClick={() => handleCardClick(item)}>
            <CommonCard 
              imageUrl={item.imageUrl}
              name={item.name}
              service={item.service}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default StylistService;

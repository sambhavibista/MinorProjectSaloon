import React, { useEffect, useState } from "react";
import CommonCard from "./stylist_section_card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function StylistService({ onCardClick }) {
  const [stylistList, setStylistList] = useState([]);

  // Retrieve stylists from localStorage when the component mounts
  useEffect(() => {
    const storedStylists = localStorage.getItem('stylists');
    if (storedStylists) {
      setStylistList(JSON.parse(storedStylists));
    }
  }, []);

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
              name={item.name}          // Pass name
              service={item.service}    // Pass service
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default StylistService;

import React from "react";
import CommonCard from "./shop_section_card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useShops} from "../../admin/Context/shopContext"; // Import the shop context

function ShopService({ onCardClick }) {
  const { shops } = useShops();  // Get the shops from the context
  
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
    const { name, location } = item; // Destructure only name and location from item
    console.log("Clicked on card with name:", name, "and location:", location);
    onCardClick({ name, location }); // Pass only name and location to the prop function
  };

  return (
    <div className="center__carousel" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Slider {...settings}>
        {shops.map((item) => (
          <div key={item.id} className="top-card-wrapper" onClick={() => handleCardClick(item)}>
            <CommonCard 
              imageUrl={item.image}
              location={item.location}
              name={item.name}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ShopService;

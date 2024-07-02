import React from 'react';
import './PropertyCard.css';

const PropertyCard = ({ title, count, color, iconFill }) => (
  <div className={`property-card ${color}`}>
    <div className="property-info">
      <h3 className="property-count">{count}</h3>
      <p className="property-title">{title}</p>
    </div>
    <div className="view-more">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b4c85e38580e090a83a3cb0fc052366fb141c83ad4478601363e0e3f0e62a8e7?apiKey=88f4cc2f29274bd281246fc6dff5b594&" alt="" className="view-icon" />
      <span className="view-text">View more</span>
    </div>
  </div>
);

export default PropertyCard;

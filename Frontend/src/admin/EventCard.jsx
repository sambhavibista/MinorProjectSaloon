import React from 'react';
import './EventCard.css';

const EventCard = ({ type, property, dateTime }) => (
  <div className="event-card">
    <h3 className="event-type">{type}</h3>
    <p className="event-details">
      <span>Property: {property}</span>
      <br />
      <br />
      <span>Date & Time: {dateTime}</span>
    </p>
  </div>
);

export default EventCard;

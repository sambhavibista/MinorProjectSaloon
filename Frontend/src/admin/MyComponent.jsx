import React, { useState, useContext } from 'react';
import './MyComponent.css';
import logo from "../assets/images/SELOGO 1.png"
import statics from '../assets/images/statistical analysis.png';
import { BookingsContext } from './BookingContext';
import PropertyCard from './propertyCard';
import EventCard from './EventCard';
import ShopService from '../components/shopSection/shop_section_card_services'; // Adjust the path based on your file structure

function MyComponent() {
  const { bookings } = useContext(BookingsContext);
  const [currentSection, setCurrentSection] = useState('Dashboard'); // Initial section
  const [selectedShop, setSelectedShop] = useState(null); // State to store selected shop

  const handleSectionClick = (section) => {
    setCurrentSection(section);
    setSelectedShop(null); // Reset selected shop when switching sections
  };

  const handleShopClick = (item) => {
    setSelectedShop(item); // Set selected shop to state
  };

  return (
    <>
      <header className="main-header">
        <div className="logo-container">
          <img loading="lazy" src={logo} alt="Company Logo" className="logo" />
          <div className="header-divider" />
        </div>
        <nav className="header-nav">
          <div className="search-container">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d271a49b1a0fcbaaa1f4e434f947cfe88d58f64d3f0b33e6987b3d92769d85d?apiKey=88f4cc2f29274bd281246fc6dff5b594&" alt="Search" className="search-icon" />
          </div>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/dfa66d135708bb343aa827d59d40e126da86702db120b6b7bc04e17fbf045a65?apiKey=88f4cc2f29274bd281246fc6dff5b594&" alt="Notifications" className="notification-icon" />
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7de2cd43e4ae51af9e8e164d847cc8da7482d4828a3673bda36ef45d84ac238a?apiKey=88f4cc2f29274bd281246fc6dff5b594&" alt="User Profile" className="profile-icon" />
        </nav>
      </header>
      <div className="main-content">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <a href="#dashboard" className="nav-item" onClick={() => handleSectionClick('Dashboard')}>Dashboard</a>
            <a href="#Booking" className="nav-item">Booking</a>
            <a href="#ShopsList" className="nav-item" onClick={() => handleSectionClick('Shops List')}>Shops List</a>
            <a href="#schedule" className="nav-item">Schedule</a>
            <div className="logout-container">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c30b8b67f97e4b2ce7ae1058d3703aa44e53e64a5ae08f6be308642fbd13488f?apiKey=88f4cc2f29274bd281246fc6dff5b594&" alt="" className="logout-icon" />
              <span className="logout-text">Log Out</span>
            </div>
          </nav>
        </aside>
        <main className="content-area">
          <section className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Welcome to admin panel</p>
            <div className="add-property-container">
              <div className="divider" />
              <h2 className="add-property-title">Appointments Overview</h2>
              <div className="divider" />
            </div>
          </section>
          <section className="property-types">
            <div className="property-type land">
              <div className="corner top-left" />
              <h3 className="type-title">All </h3>
              <p className="count-number">120</p>
            </div>
            <div className="property-type house">
              <div className="corner top-left" />
              <h3 className="type-title">New</h3>
              <p className="count-number">56</p>
            </div>
            <div className="property-type apartment">
              <div className="corner top-left" />
              <h3 className="type-title">Today</h3>
              <p className="count-number">12/4</p>
            </div>
            <div className="property-type apartment">
              <div className="corner top-left" />
              <h3 className="type-title">Cancelled</h3>
              <p className="count-number">25</p>
            </div>
          </section>
          <section className="total-properties">
            <div className="property-count">
              <h2 className="count-title">Total Shops Added </h2>
              <p className="count-number">120</p>
            </div>
            <div className="view-more">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b4c85e38580e090a83a3cb0fc052366fb141c83ad4478601363e0e3f0e62a8e7?apiKey=88f4cc2f29274bd281246fc6dff5b594&" alt="" className="view-icon" />
              <span className="view-text">View more</span>
            </div>
          </section>
          {currentSection === 'Shops List' && (
            <section className="shops-list">
              <h2 className="section-title">Shops List</h2>
              {selectedShop && (
                <div className="selected-shop">
                  <h3>{selectedShop.name}</h3>
                  <p>{selectedShop.location}</p>
                </div>
              )}
              <ShopService handleCardClick={handleShopClick} />
            </section>
          )}
          <section className="property-stats">
            <PropertyCard title="Shops added" count="120" color="blue" iconFill="#fdaf17" />
            <PropertyCard title="Bookings Listed" count="120" color="orange" iconFill="#263471" />
          </section>
          <section className="statistical-analysis">
            <div className="analysis-header">
              <h2 className="analysis-title">Statistical Analysis</h2>
              <div className="time-frame">
                <button className="time-button">Yearly</button>
                <button className="time-button">Monthly</button>
              </div>
            </div>
            <img loading="lazy" src={statics} alt="Statistical Analysis Graph" className="analysis-graph" />
          </section>
          <section className="upcoming-events">
            <h2 className="section-title">Bookings</h2>
            <div className="events-list">
              {bookings.map((booking, index) => (
                <EventCard key={index} type={booking.service} property={booking.shop} dateTime={booking.date.toLocaleString()} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default MyComponent;

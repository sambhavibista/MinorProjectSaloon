import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './layout/nav_bar'
import Footer from './layout/footer'
import FirstSectionLanding from './components/first_section_landing'
import AboutSection from './components/about_section'
import ServicesSection from './components/services_section'
import AppointmentSection from './components/appointment_section'
import ShopSection from './components/shop_section'

function Home() {
  return (
    <>
    <NavBar />
    <Outlet />
    <FirstSectionLanding />
    <AboutSection />
    <ServicesSection />
    <AppointmentSection />
    <ShopSection/>
    <Footer />
    </>
  )
}

export default Home
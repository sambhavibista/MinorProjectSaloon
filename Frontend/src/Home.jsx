import React, {useRef} from 'react'
// import { Outlet, Route ,Routes} from 'react-router-dom'
import NavBar from './layout/nav_bar'
import Footer from './layout/footer'
import FirstSectionLanding from './components/first_section_landing'
// import AboutSection from './components/about_section'
// import ServicesSection from './components/services_section'
// import AppointmentSection from './components/appointment_section'
import ShopSection from './components/shop_section'
import Contact from './components/contact'
// import SalonBookingApp from './components/parent_component'

function Home() {
  const  appointmentRef = useRef(null);
  const shopRef = useRef(null);
  const contactRef = useRef(null);

  const refs = {
    Appointment : appointmentRef,
    Shops: shopRef,
    ContactUs: contactRef,
  }
  return (
    <>
    <NavBar refs={refs} />
    {/* <Outlet /> */}
    <FirstSectionLanding />
    {/* <AboutSection />
    <ServicesSection /> */}
    {/* <SalonBookingApp shopRef={shopRef}/> */}
    {/* <ServicesSection /> */}
    <ShopSection shopRef={shopRef}/>
    {/* <section ref = {appointmentRef}><AppointmentSection/></section> */}
    <section ref={contactRef}><Contact/></section>
    <Footer />
    </>
  )
}

export default Home;
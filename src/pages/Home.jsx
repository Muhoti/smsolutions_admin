import React, { useEffect } from 'react';
import Hero from '../components/sections/Hero';
import ServicesSection from '../components/sections/ServicesSection';
import HowWeWork from '../components/sections/HowWeWork';
import PortfolioSection from '../components/sections/PortfolioSection';
import Testimonials from '../components/sections/Testimonials';
import CTA from '../components/sections/CTA';
import { useApp } from '../context/AppContext';
import './Home.css';

const Home = () => {
  const { fetchProjects, fetchTestimonials } = useApp();

  useEffect(() => {
    fetchProjects();
    fetchTestimonials();
  }, [fetchProjects, fetchTestimonials]);

  return (
    <div className="home-page">
      <Hero />
      <ServicesSection />
      <HowWeWork />
      <PortfolioSection />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default Home;

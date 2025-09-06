import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiArrowRight, 
  FiSmartphone, 
  FiMonitor, 
  FiCode, 
  FiUsers,
  FiAward,
  FiClock,
  FiCheckCircle
} from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Portfolio from '../components/sections/Portfolio';
import Testimonials from '../components/sections/Testimonials';
import CTA from '../components/sections/CTA';
import Stats from '../components/sections/Stats';
import './Home.css';

const Home = () => {
  const { fetchProjects, fetchTestimonials, loading } = useApp();

  useEffect(() => {
    // Fetch featured projects and testimonials on page load
    fetchProjects();
    fetchTestimonials();
  }, [fetchProjects, fetchTestimonials]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <Hero />
      
      {/* Stats Section */}
      <Stats />
      
      {/* Services Section */}
      <Services />
      
      {/* Portfolio Section */}
      <Portfolio />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* CTA Section */}
      <CTA />
    </div>
  );
};

export default Home;

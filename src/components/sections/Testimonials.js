import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FiStar } from 'react-icons/fi';
import './Testimonials.css';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CEO',
      company: 'TechStart Solutions',
      project: 'E-Commerce Mobile App',
      rating: 5,
      text: 'Strong delivered an exceptional mobile app that increased our sales by 300%. His attention to detail and user experience design is outstanding. The app has been live for 6 months with zero issues.',
      avatar: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Director',
      company: 'County Agriculture',
      project: 'Agricultural Management System',
      rating: 5,
      text: 'The agricultural MIS Strong built for our county has revolutionized how we track and manage farming data. The system is robust, user-friendly, and has improved our efficiency by 250%.',
      avatar: '/api/placeholder/80/80'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      position: 'Emergency Services Director',
      company: 'City Emergency Services',
      project: 'Emergency Response Platform',
      rating: 5,
      text: 'Strong\'s emergency response system has been a game-changer for our organization. The real-time tracking and instant notifications have saved countless lives. His technical expertise is unmatched.',
      avatar: '/api/placeholder/80/80'
    },
    {
      id: 4,
      name: 'David Kimani',
      position: 'Operations Manager',
      company: 'UETCL',
      project: 'Asset Tracking Mobile App',
      rating: 5,
      text: 'The asset tracking app Strong developed has streamlined our operations completely. What used to take days now takes minutes. His professionalism and technical skills are top-tier.',
      avatar: '/api/placeholder/80/80'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar 
        key={index} 
        size={16} 
        className={index < rating ? 'star-filled' : 'star-empty'} 
      />
    ));
  };

  return (
    <section className="testimonials-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="testimonials-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2>What My Clients Say</h2>
          <p>Don't just take my word for it. Here's what my clients have to say about the mobile and web applications I've built for their businesses.</p>
        </motion.div>

        <motion.div 
          className="testimonials-slider"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              }
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="client-avatar">
                      <img src={testimonial.avatar} alt={testimonial.name} />
                    </div>
                    <div className="client-info">
                      <h4>{testimonial.name}</h4>
                      <p className="client-position">{testimonial.position}, {testimonial.company}</p>
                      <p className="client-project">{testimonial.project}</p>
                    </div>
                  </div>
                  
                  <div className="testimonial-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <blockquote className="testimonial-text">
                    "{testimonial.text}"
                  </blockquote>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div 
          className="testimonials-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="stat-item">
            <h3>50+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="stat-item">
            <h3>4.9/5</h3>
            <p>Average Rating</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>Client Satisfaction</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

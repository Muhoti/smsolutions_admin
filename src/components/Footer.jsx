import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
} from 'react-icons/fi';
import './Footer.css';
import { ASSETS } from '../constants/assets';
import { CONTACT, SOCIAL_LINKS } from '../data/company';
import { FOOTER_QUICK_LINKS, FOOTER_SERVICES } from '../data/navigation';
import Button from './ui/Button';

const Footer = () => {
  const { pathname } = useLocation();
  const currentYear = new Date().getFullYear();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const quickLinks = FOOTER_QUICK_LINKS;
  const services = FOOTER_SERVICES;
  const socialLinks = SOCIAL_LINKS;
  return (
    <footer className="footer ai-surface">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section footer-section--brand">
            <div className="footer-logo">
              <img 
                src={ASSETS.logoNavbar} 
                alt="Strong's Digital Labs" 
                className="footer-logo-img"
              />
            </div>
            <p className="footer-tagline">{CONTACT.tagline}</p>
            <p className="footer-description">
              We help businesses design and build intelligent online systems — websites, 
              web apps, and mobile applications with practical AI integration.
            </p>
            <div className="footer-contact">
              <div className="contact-item">
                <FiMail size={16} />
                <span>{CONTACT.email}</span>
              </div>
              <div className="contact-item">
                <FiPhone size={16} />
                <span>{CONTACT.phone}</span>
              </div>
              <div className="contact-item">
                <FiMapPin size={16} />
                <span>{CONTACT.location}</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="footer-link">
                    <FiArrowRight size={12} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              {services.map((service) => (
                <li key={service.name}>
                  <Link to={service.path} className="footer-link">
                    <FiArrowRight size={12} />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Get In Touch</h3>
            <p className="newsletter-description">
              Have a project in mind? We would love to hear about it.
            </p>
            <Button to="/contact" variant="primary" style={{ marginTop: '1rem' }}>
              Contact Us
              <FiArrowRight size={16} />
            </Button>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} Strong&apos;s Digital Labs. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/contact" className="footer-bottom-link">Contact</Link>
              <Link to="/about" className="footer-bottom-link">About Us</Link>
              <Link to="/services" className="footer-bottom-link">Services</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

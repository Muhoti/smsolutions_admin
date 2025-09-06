import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiGithub, 
  FiLinkedin, 
  FiTwitter,
  FiArrowRight
} from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' }
  ];

  const services = [
    { name: 'Mobile App Development', path: '/services#mobile' },
    { name: 'Web Development', path: '/services#web' },
    { name: 'UI/UX Design', path: '/services#design' },
    { name: 'Consultation', path: '/services#consultation' }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: FiGithub, url: 'https://github.com/strongmuhoti' },
    { name: 'LinkedIn', icon: FiLinkedin, url: 'https://linkedin.com/in/strongmuhoti' },
    { name: 'Twitter', icon: FiTwitter, url: 'https://twitter.com/strongmuhoti' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">
                <span className="logo-text">SM</span>
              </div>
              <div className="logo-text-container">
                <span className="logo-name">Strong Muhoti</span>
                <span className="logo-tagline">App Development</span>
              </div>
            </div>
            <p className="footer-description">
              Transforming businesses through innovative mobile and web applications. 
              I deliver high-quality, scalable solutions that drive growth and success.
            </p>
            <div className="footer-contact">
              <div className="contact-item">
                <FiMail size={16} />
                <span>strongmuhoti@gmail.com</span>
              </div>
              <div className="contact-item">
                <FiPhone size={16} />
                <span>+254 707 809 592</span>
              </div>
              <div className="contact-item">
                <FiMapPin size={16} />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
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

          {/* Services */}
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

          {/* Newsletter */}
          <div className="footer-section">
            <h3 className="footer-title">Stay Updated</h3>
            <p className="newsletter-description">
              Get the latest updates on new projects and development insights.
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="newsletter-btn">
                <FiArrowRight size={16} />
              </button>
            </div>
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

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} Strong Muhoti. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy" className="footer-bottom-link">Privacy Policy</Link>
              <Link to="/terms" className="footer-bottom-link">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

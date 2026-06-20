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
    { name: 'Systems Consultancy', path: '/services#consultancy' },
    { name: 'Web Development', path: '/services#web' },
    { name: 'Mobile Apps', path: '/services#mobile' },
    { name: 'AI-Enabled Solutions', path: '/services#ai' }
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
          <div className="footer-section">
            <div className="footer-logo">
              <img 
                src="/logo-navbar.png" 
                alt="Strong's Digital Labs" 
                className="footer-logo-img"
              />
            </div>
            <p className="footer-tagline">WE CODE. WE DESIGN. WE EMPOWER.</p>
            <p className="footer-description">
              We help businesses design and build intelligent online systems — websites, 
              web apps, and mobile applications with practical AI integration.
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
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Contact Us
              <FiArrowRight size={16} />
            </Link>
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

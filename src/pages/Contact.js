import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend,
  FiCheckCircle,
  FiClock,
  FiMessageCircle
} from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { submitContact, loading } = useApp();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      const result = await submitContact(data);
      
      if (result.success) {
        toast.success('Message sent successfully! I\'ll get back to you within 24 hours.');
        setIsSubmitted(true);
        reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        toast.error(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      value: 'strongmuhoti@gmail.com',
      description: 'Send me an email anytime',
      action: 'mailto:strongmuhoti@gmail.com'
    },
    {
      icon: FiPhone,
      title: 'Phone',
      value: '+254 707 809 592',
      description: 'Call me for urgent matters',
      action: 'tel:+254707809592'
    },
    {
      icon: FiMapPin,
      title: 'Location',
      value: 'Nairobi, Kenya',
      description: 'Available for local meetings',
      action: '#'
    }
  ];

  const projectTypes = [
    'Mobile App Development',
    'Web Application',
    'Mobile + Web App',
    'UI/UX Design',
    'Consultation',
    'Other'
  ];

  const budgetRanges = [
    'Under $10,000',
    '$10,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000+',
    'Flexible',
    'Confidential'
  ];

  const timelines = [
    'ASAP',
    '1 Month',
    '2-3 Months',
    '3-6 Months',
    '6+ Months',
    'Flexible'
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <motion.div 
            className="contact-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="contact-title">Get In Touch</h1>
            <p className="contact-subtitle">
              Ready to start your project? Let's discuss how I can help bring your app idea to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-info-section">
        <div className="container">
          <motion.div 
            className="contact-info-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {contactInfo.map((info, index) => (
              <motion.div 
                key={info.title}
                className="contact-info-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="contact-icon">
                  <info.icon size={32} />
                </div>
                <h3>{info.title}</h3>
                <p className="contact-value">{info.value}</p>
                <p className="contact-description">{info.description}</p>
                <a href={info.action} className="contact-action">
                  {info.title === 'Email' ? 'Send Email' : 
                   info.title === 'Phone' ? 'Call Now' : 'View Map'}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section" ref={ref}>
        <div className="container">
          <div className="form-container">
            <motion.div 
              className="form-header"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <h2>Start Your Project</h2>
              <p>Fill out the form below and I'll get back to you within 24 hours</p>
            </motion.div>

            {isSubmitted ? (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <FiCheckCircle size={48} />
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. I'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <motion.form 
                className="contact-form"
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      placeholder="Your full name"
                    />
                    {errors.name && <span className="error-message">{errors.name.message}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      placeholder="+254 700 000 000"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      {...register('company')}
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="projectType">Project Type *</label>
                    <select
                      id="projectType"
                      {...register('projectType', { required: 'Project type is required' })}
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.projectType && <span className="error-message">{errors.projectType.message}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="budget">Budget Range</label>
                    <select
                      id="budget"
                      {...register('budget')}
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="timeline">Project Timeline</label>
                  <select
                    id="timeline"
                    {...register('timeline')}
                  >
                    <option value="">Select timeline</option>
                    {timelines.map((timeline) => (
                      <option key={timeline} value={timeline}>{timeline}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Details *</label>
                  <textarea
                    id="message"
                    {...register('message', { required: 'Project details are required' })}
                    rows={6}
                    placeholder="Tell me about your project, goals, and any specific requirements..."
                  />
                  {errors.message && <span className="error-message">{errors.message.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className={`btn btn-primary btn-lg ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <FiClock size={20} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq">
        <div className="container">
          <motion.div 
            className="faq-content"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>How long does a typical project take?</h3>
                <p>Project timelines vary based on complexity. A simple mobile app takes 2-3 months, while complex web applications can take 4-6 months. I'll provide a detailed timeline during our initial consultation.</p>
              </div>
              <div className="faq-item">
                <h3>What's included in your development process?</h3>
                <p>My process includes discovery & planning, design & prototyping, development & testing, and deployment & launch. I also provide ongoing support and maintenance.</p>
              </div>
              <div className="faq-item">
                <h3>Do you provide ongoing support after launch?</h3>
                <p>Yes! I offer comprehensive support packages including bug fixes, updates, feature additions, and performance monitoring to ensure your app continues to perform optimally.</p>
              </div>
              <div className="faq-item">
                <h3>What technologies do you work with?</h3>
                <p>I specialize in React Native for mobile apps, React.js for web applications, Node.js for backends, and various databases. I stay updated with the latest technologies and best practices.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

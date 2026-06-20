import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiClock,
} from 'react-icons/fi';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useApp } from '../context/AppContext';
import { CONTACT } from '../data/company';
import {
  BUDGET_RANGES,
  FAQ_ITEMS,
  PROJECT_TYPES,
  TIMELINES,
} from '../data/contactForm';
import PageHero from '../components/ui/PageHero';
import './Contact.css';

const CONTACT_CARDS = [
  {
    icon: FiMail,
    title: 'Email',
    value: CONTACT.email,
    description: 'Email us anytime',
    action: `mailto:${CONTACT.email}`,
    actionLabel: 'Send Email',
  },
  {
    icon: FiPhone,
    title: 'Phone',
    value: CONTACT.phone,
    description: 'Call us for urgent matters',
    action: `tel:${CONTACT.phoneTel}`,
    actionLabel: 'Call Now',
  },
  {
    icon: FiMapPin,
    title: 'Location',
    value: CONTACT.location,
    description: 'Available for local meetings',
    action: '#',
    actionLabel: 'View Map',
  },
];

const Contact = () => {
  const [ref, inView] = useScrollReveal();

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
        toast.success('Message sent successfully! We will get back to you within 24 hours.');
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

  return (
    <div className="contact-page">
      <PageHero
        heroClass="contact-hero"
        titleClass="contact-title"
        subtitleClass="contact-subtitle"
        contentClass="contact-hero-content"
        title="Contact Us"
        subtitle="Ready to start your project? Tell us about your requirements and we will respond with a clear recommendation."
      />

      {/* Contact Info */}
      <section className="contact-info-section">
        <div className="container">
          <motion.div 
            className="contact-info-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {CONTACT_CARDS.map((info, index) => (
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
                  {info.actionLabel}
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
              <h2>Tell Us About Your Project</h2>
              <p>Fill out the form below and we will get back to you within 24 hours</p>
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
                <p>Your message has been sent successfully. We will get back to you within 24 hours.</p>
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
                      {PROJECT_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
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
                      {BUDGET_RANGES.map((range) => (
                        <option key={range.value} value={range.value}>{range.label}</option>
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
                    {TIMELINES.map((timeline) => (
                      <option key={timeline.value} value={timeline.value}>{timeline.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Details *</label>
                  <textarea
                    id="message"
                    {...register('message', { required: 'Project details are required' })}
                    rows={6}
                    placeholder="Tell us about your project, goals, and any specific requirements..."
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
              {FAQ_ITEMS.map((item) => (
                <div key={item.question} className="faq-item">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

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
import { CONTACT_CONTENT } from '../data/pageContent';
import {
  BUDGET_RANGES,
  FAQ_ITEMS,
  PROJECT_TYPES,
  TIMELINES,
} from '../data/contactForm';
import PageHero from '../components/ui/PageHero';
import MobileScreenGate from '../components/mobile/MobileScreenGate';
import MobileContactScreen from '../components/mobile/screens/MobileContactScreen';
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

const ContactDesktop = ({ inView, sectionRef, onSubmit, loading, isSubmitted, register, handleSubmit, errors }) => {
  const { hero, form, success, faq } = CONTACT_CONTENT;
  const fields = form.fields;

  return (
  <>
    <PageHero
      heroClass="contact-hero"
      titleClass="contact-title"
      subtitleClass="contact-subtitle"
      contentClass="contact-hero-content"
      title={hero.title}
      subtitle={hero.subtitle}
    />

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

    <section className="contact-form-section" ref={sectionRef}>
      <div className="container">
        <div className="form-container">
          <motion.div
            className="form-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2>{form.title}</h2>
            <p>{form.subtitle}</p>
          </motion.div>

          {isSubmitted ? (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FiCheckCircle size={48} />
              <h3>{success.title}</h3>
              <p>{success.message}</p>
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
                  <label htmlFor="name">{fields.name.label}</label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: fields.name.required })}
                    placeholder={fields.name.placeholder}
                  />
                  {errors.name && <span className="error-message">{errors.name.message}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">{fields.email.label}</label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: fields.email.required,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: fields.email.invalid,
                      },
                    })}
                    placeholder={fields.email.placeholder}
                  />
                  {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">{fields.phone.label}</label>
                  <input type="tel" id="phone" {...register('phone')} placeholder={fields.phone.placeholder} />
                </div>
                <div className="form-group">
                  <label htmlFor="company">{fields.company.label}</label>
                  <input type="text" id="company" {...register('company')} placeholder={fields.company.placeholder} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="projectType">{fields.projectType.label}</label>
                  <select id="projectType" {...register('projectType', { required: fields.projectType.required })}>
                    <option value="">{fields.projectType.placeholder}</option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <span className="error-message">{errors.projectType.message}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="budget">{fields.budget.label}</label>
                  <select id="budget" {...register('budget')}>
                    <option value="">{fields.budget.placeholder}</option>
                    {BUDGET_RANGES.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="timeline">{fields.timeline.label}</label>
                <select id="timeline" {...register('timeline')}>
                  <option value="">{fields.timeline.placeholder}</option>
                  {TIMELINES.map((timeline) => (
                    <option key={timeline.value} value={timeline.value}>
                      {timeline.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">{fields.message.label}</label>
                <textarea
                  id="message"
                  {...register('message', { required: fields.message.required })}
                  rows={6}
                  placeholder={fields.message.placeholder}
                />
                {errors.message && <span className="error-message">{errors.message.message}</span>}
              </div>

              <button type="submit" className={`btn btn-primary btn-lg ${loading ? 'loading' : ''}`} disabled={loading}>
                {loading ? (
                  <>
                    <FiClock size={20} />
                    {form.sending}
                  </>
                ) : (
                  <>
                    <FiSend size={20} />
                    {form.submit}
                  </>
                )}
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </section>

    <section className="contact-faq">
      <div className="container">
        <motion.div
          className="faq-content"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2>{faq.title}</h2>
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
  </>
  );
};

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
      message: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await submitContact(data);
      if (result.success) {
        toast.success(CONTACT_CONTENT.toast.success);
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        toast.error(result.error || CONTACT_CONTENT.toast.error);
      }
    } catch {
      toast.error(CONTACT_CONTENT.toast.unexpected);
    }
  };

  return (
    <div className="contact-page">
      <MobileScreenGate mobile={<MobileContactScreen />} desktop={
        <ContactDesktop
          inView={inView}
          sectionRef={ref}
          onSubmit={onSubmit}
          loading={loading}
          isSubmitted={isSubmitted}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      } />
    </div>
  );
};

export default Contact;

import React from 'react';
import { motion } from 'framer-motion';
import { FiX, FiSave } from 'react-icons/fi';
import Button from '../ui/Button';

const AdminFormModals = ({
  showProjectForm,
  setShowProjectForm,
  showTestimonialForm,
  setShowTestimonialForm,
  showContactForm,
  setShowContactForm,
  registerProject,
  handleProjectSubmit,
  onProjectSubmit,
  projectErrors,
  registerTestimonial,
  handleTestimonialSubmit,
  onTestimonialSubmit,
  testimonialErrors,
  registerContact,
  handleContactSubmit,
  onContactSubmit,
  contactErrors,
  isCreatingProject,
  isCreatingTestimonial,
  isCreatingContact,
}) => (
  <>
    {showProjectForm && (
      <div className="adm-modal-overlay">
        <motion.div className="adm-modal" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="adm-modal-header">
            <h3>Add project</h3>
            <button type="button" className="adm-modal-close" onClick={() => setShowProjectForm(false)}>
              <FiX size={20} />
            </button>
          </div>
          <form onSubmit={handleProjectSubmit(onProjectSubmit)} className="adm-modal-form">
            <div className="form-row">
              <div className="form-group">
                <label>Project title *</label>
                <input {...registerProject('title', { required: 'Title is required' })} placeholder="Project name" />
                {projectErrors.title && <span className="error">{projectErrors.title.message}</span>}
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select {...registerProject('category', { required: 'Category is required' })}>
                  <option value="">Select category</option>
                  <option value="web">Web Application</option>
                  <option value="mobile">Mobile App</option>
                  <option value="both">Cross-Platform</option>
                </select>
                {projectErrors.category && <span className="error">{projectErrors.category.message}</span>}
              </div>
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea {...registerProject('description', { required: 'Description is required' })} rows={4} />
              {projectErrors.description && <span className="error">{projectErrors.description.message}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Live demo URL</label>
                <input {...registerProject('liveDemo')} placeholder="https://…" />
              </div>
              <div className="form-group">
                <label>GitHub URL</label>
                <input {...registerProject('github')} placeholder="https://github.com/…" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Play Store URL</label>
                <input {...registerProject('playStore')} />
              </div>
              <div className="form-group">
                <label>App Store URL</label>
                <input {...registerProject('appStore')} />
              </div>
            </div>
            <div className="form-group">
              <label>Tech stack (comma separated)</label>
              <input {...registerProject('techStack')} placeholder="React, Node.js, PostgreSQL" />
            </div>
            <div className="form-group">
              <label className="adm-checkbox-label">
                <input type="checkbox" {...registerProject('featured')} />
                Featured project
              </label>
            </div>
            <div className="adm-modal-actions">
              <Button type="button" variant="outline" onClick={() => setShowProjectForm(false)}>Cancel</Button>
              <Button type="submit" variant="primary" disabled={isCreatingProject}>
                <FiSave size={16} />
                {isCreatingProject ? 'Creating…' : 'Create project'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    )}

    {showTestimonialForm && (
      <div className="adm-modal-overlay">
        <motion.div className="adm-modal" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="adm-modal-header">
            <h3>Add testimonial</h3>
            <button type="button" className="adm-modal-close" onClick={() => setShowTestimonialForm(false)}>
              <FiX size={20} />
            </button>
          </div>
          <form onSubmit={handleTestimonialSubmit(onTestimonialSubmit)} className="adm-modal-form">
            <div className="form-row">
              <div className="form-group">
                <label>Client name *</label>
                <input {...registerTestimonial('name', { required: 'Required' })} />
                {testimonialErrors.name && <span className="error">{testimonialErrors.name.message}</span>}
              </div>
              <div className="form-group">
                <label>Position *</label>
                <input {...registerTestimonial('title', { required: 'Required' })} />
                {testimonialErrors.title && <span className="error">{testimonialErrors.title.message}</span>}
              </div>
            </div>
            <div className="form-group">
              <label>Company *</label>
              <input {...registerTestimonial('company', { required: 'Required' })} />
              {testimonialErrors.company && <span className="error">{testimonialErrors.company.message}</span>}
            </div>
            <div className="form-group">
              <label>Review *</label>
              <textarea {...registerTestimonial('review', { required: 'Required' })} rows={4} />
              {testimonialErrors.review && <span className="error">{testimonialErrors.review.message}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Rating</label>
                <select {...registerTestimonial('rating')}>
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>{n} stars</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Project (optional)</label>
                <input {...registerTestimonial('project')} />
              </div>
            </div>
            <div className="form-group">
              <label className="adm-checkbox-label">
                <input type="checkbox" {...registerTestimonial('featured')} />
                Featured testimonial
              </label>
            </div>
            <div className="adm-modal-actions">
              <Button type="button" variant="outline" onClick={() => setShowTestimonialForm(false)}>Cancel</Button>
              <Button type="submit" variant="primary" disabled={isCreatingTestimonial}>
                <FiSave size={16} />
                {isCreatingTestimonial ? 'Creating…' : 'Create testimonial'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    )}

    {showContactForm && (
      <div className="adm-modal-overlay">
        <motion.div className="adm-modal" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="adm-modal-header">
            <h3>Add contact</h3>
            <button type="button" className="adm-modal-close" onClick={() => setShowContactForm(false)}>
              <FiX size={20} />
            </button>
          </div>
          <form onSubmit={handleContactSubmit(onContactSubmit)} className="adm-modal-form">
            <div className="form-row">
              <div className="form-group">
                <label>Name *</label>
                <input {...registerContact('name', { required: 'Required' })} />
                {contactErrors.name && <span className="error">{contactErrors.name.message}</span>}
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  {...registerContact('email', {
                    required: 'Required',
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
                  })}
                />
                {contactErrors.email && <span className="error">{contactErrors.email.message}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input {...registerContact('phone')} />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input {...registerContact('company')} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Project type *</label>
                <select {...registerContact('projectType', { required: 'Required' })}>
                  <option value="">Select type</option>
                  <option value="mobile">Mobile App</option>
                  <option value="web">Web Application</option>
                  <option value="both">Both</option>
                  <option value="consultation">Consultancy</option>
                  <option value="other">Other</option>
                </select>
                {contactErrors.projectType && <span className="error">{contactErrors.projectType.message}</span>}
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select {...registerContact('priority')}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea {...registerContact('message', { required: 'Required', minLength: { value: 10, message: 'Min 10 chars' } })} rows={4} />
              {contactErrors.message && <span className="error">{contactErrors.message.message}</span>}
            </div>
            <div className="adm-modal-actions">
              <Button type="button" variant="outline" onClick={() => setShowContactForm(false)}>Cancel</Button>
              <Button type="submit" variant="primary" disabled={isCreatingContact}>
                <FiSave size={16} />
                {isCreatingContact ? 'Creating…' : 'Create contact'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    )}
  </>
);

export default AdminFormModals;

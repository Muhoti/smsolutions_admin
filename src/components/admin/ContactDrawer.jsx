import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FiX, FiMail, FiPhone, FiSave } from 'react-icons/fi';
import { apiService } from '../../services/api';
import Button from '../ui/Button';
import {
  PROJECT_TYPE_LABELS,
  PRIORITY_LABELS,
  CONTACT_STATUS_OPTIONS,
  formatDateTime,
} from './adminConstants';

const ContactDrawer = ({ contact, onClose, onUpdated }) => {
  const [status, setStatus] = useState(contact.status);
  const [notes, setNotes] = useState(contact.notes || '');
  const [priority, setPriority] = useState(contact.priority || 'medium');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await apiService.admin.updateContact(contact.id, {
        status,
        notes,
        priority,
      });
      toast.success('Contact updated');
      onUpdated(res.data.data);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update contact');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button type="button" className="adm-drawer-backdrop" onClick={onClose} aria-label="Close panel" />
      <aside className="adm-drawer" role="dialog" aria-labelledby="contact-drawer-title">
        <div className="adm-drawer-header">
          <div>
            <p className="adm-drawer-eyebrow">Inquiry details</p>
            <h2 id="contact-drawer-title">{contact.name}</h2>
            <p className="adm-drawer-sub">{formatDateTime(contact.createdAt)}</p>
          </div>
          <button type="button" className="adm-drawer-close" onClick={onClose} aria-label="Close">
            <FiX size={20} />
          </button>
        </div>

        <div className="adm-drawer-body">
          <div className="adm-drawer-section">
            <h3>Contact</h3>
            <div className="adm-detail-grid">
              <div className="adm-detail-item">
                <FiMail size={14} />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
              {contact.phone && (
                <div className="adm-detail-item">
                  <FiPhone size={14} />
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </div>
              )}
              {contact.company && (
                <div className="adm-detail-item">
                  <span className="adm-detail-label">Company</span>
                  <span>{contact.company}</span>
                </div>
              )}
            </div>
          </div>

          <div className="adm-drawer-section">
            <h3>Project</h3>
            <div className="adm-detail-grid">
              <div>
                <span className="adm-detail-label">Type</span>
                <p>{PROJECT_TYPE_LABELS[contact.projectType] || contact.projectType}</p>
              </div>
              {contact.budget && (
                <div>
                  <span className="adm-detail-label">Budget</span>
                  <p>{contact.budget.replace(/-/g, ' ')}</p>
                </div>
              )}
              {contact.timeline && (
                <div>
                  <span className="adm-detail-label">Timeline</span>
                  <p>{contact.timeline.replace(/-/g, ' ')}</p>
                </div>
              )}
            </div>
          </div>

          <div className="adm-drawer-section">
            <h3>Message</h3>
            <p className="adm-drawer-message">{contact.message}</p>
          </div>

          <div className="adm-drawer-section">
            <h3>Manage</h3>
            <div className="form-group">
              <label htmlFor="contact-status">Status</label>
              <select
                id="contact-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {CONTACT_STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="contact-priority">Priority</label>
              <select
                id="contact-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="contact-notes">Internal notes</label>
              <textarea
                id="contact-notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this inquiry…"
              />
            </div>
          </div>
        </div>

        <div className="adm-drawer-footer">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="primary" onClick={handleSave} disabled={saving}>
            <FiSave size={16} />
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </aside>
    </>
  );
};

export default ContactDrawer;

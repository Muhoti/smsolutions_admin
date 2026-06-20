import React from 'react';
import { FiUsers, FiMessageSquare, FiFolder, FiStar, FiArrowRight } from 'react-icons/fi';
import AdminKpiCard from './AdminKpiCard';
import { PROJECT_TYPE_LABELS, formatDate } from './adminConstants';

const StatusBadge = ({ status }) => (
  <span className={`adm-badge adm-badge--${status}`}>
    {status.replace(/-/g, ' ')}
  </span>
);

const DashboardPanel = ({ stats, recentContacts, onNavigate }) => (
  <div className="adm-panel">
    <div className="adm-kpi-grid">
      <AdminKpiCard
        icon={FiUsers}
        label="Total contacts"
        value={stats.totalContacts}
        hint="All time"
        accent="blue"
        onClick={() => onNavigate('contacts')}
      />
      <AdminKpiCard
        icon={FiMessageSquare}
        label="New inquiries"
        value={stats.newInquiries}
        hint="Needs attention"
        accent="cyan"
        onClick={() => onNavigate('contacts')}
      />
      <AdminKpiCard
        icon={FiFolder}
        label="Portfolio projects"
        value={stats.totalProjects}
        hint={`${stats.featuredProjects} featured`}
        accent="indigo"
        onClick={() => onNavigate('projects')}
      />
      <AdminKpiCard
        icon={FiStar}
        label="Testimonials"
        value={stats.totalTestimonials}
        hint="Client reviews"
        accent="amber"
        onClick={() => onNavigate('testimonials')}
      />
    </div>

    <div className="adm-card">
      <div className="adm-card-header">
        <div>
          <h2>Recent inquiries</h2>
          <p>Latest contact form submissions</p>
        </div>
        <button type="button" className="adm-text-link" onClick={() => onNavigate('contacts')}>
          View all
          <FiArrowRight size={14} />
        </button>
      </div>

      {recentContacts.length > 0 ? (
        <div className="adm-table-scroll">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentContacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="adm-cell-strong">{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{PROJECT_TYPE_LABELS[contact.projectType] || contact.projectType}</td>
                  <td><StatusBadge status={contact.status} /></td>
                  <td className="adm-cell-muted">{formatDate(contact.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="adm-empty-inline">
          <p>No inquiries yet. They will appear here when someone submits the contact form.</p>
        </div>
      )}
    </div>
  </div>
);

export default DashboardPanel;

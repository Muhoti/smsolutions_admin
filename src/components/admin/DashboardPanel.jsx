import React from 'react';
import { FiUsers, FiMessageSquare, FiFolder, FiStar, FiArrowRight } from 'react-icons/fi';
import AdminKpiCard from './AdminKpiCard';
import ContactListCard from './ContactListCard';
import MobileSectionHead from './MobileSectionHead';
import { PROJECT_TYPE_LABELS, formatDate } from './adminConstants';

const StatusBadge = ({ status }) => (
  <span className={`adm-badge adm-badge--${status}`}>
    {status.replace(/-/g, ' ')}
  </span>
);

const DashboardPanel = ({ stats, recentContacts, onNavigate, onSelectContact }) => (
  <div className="adm-panel">
    {/* ── Mobile layout ── */}
    <div className="adm-mobile-only adm-m-screen">
      <div className="adm-m-hero">
        <div className="adm-m-hero-body">
          <p className="adm-m-hero-eyebrow">Client inbox</p>
          <h2 className="adm-m-hero-headline">
            {stats.newInquiries > 0
              ? `${stats.newInquiries} new ${stats.newInquiries === 1 ? 'lead' : 'leads'} waiting`
              : 'You\'re all caught up'}
          </h2>
          <p className="adm-m-hero-copy">
            {stats.newInquiries > 0
              ? 'Respond to inquiries and keep projects moving.'
              : 'New contact form submissions will appear here.'}
          </p>
          <button type="button" className="adm-m-hero-cta" onClick={() => onNavigate('contacts')}>
            Open contacts
          </button>
        </div>
        <div className="adm-m-hero-badge" aria-hidden="true">
          <span>{stats.newInquiries}</span>
          <small>new</small>
        </div>
      </div>

      <MobileSectionHead title="Overview" />
      <div className="adm-m-stat-grid">
        <button type="button" className="adm-m-stat-tile" onClick={() => onNavigate('contacts')}>
          <FiUsers size={18} />
          <span className="adm-m-stat-val">{stats.totalContacts}</span>
          <span className="adm-m-stat-lbl">Contacts</span>
        </button>
        <button type="button" className="adm-m-stat-tile" onClick={() => onNavigate('projects')}>
          <FiFolder size={18} />
          <span className="adm-m-stat-val">{stats.totalProjects}</span>
          <span className="adm-m-stat-lbl">Projects</span>
        </button>
        <button type="button" className="adm-m-stat-tile" onClick={() => onNavigate('testimonials')}>
          <FiStar size={18} />
          <span className="adm-m-stat-val">{stats.totalTestimonials}</span>
          <span className="adm-m-stat-lbl">Reviews</span>
        </button>
        <button type="button" className="adm-m-stat-tile adm-m-stat-tile--accent" onClick={() => onNavigate('projects')}>
          <FiMessageSquare size={18} />
          <span className="adm-m-stat-val">{stats.featuredProjects}</span>
          <span className="adm-m-stat-lbl">Featured</span>
        </button>
      </div>

      <MobileSectionHead
        title="Recent inquiries"
        action="See all"
        onAction={() => onNavigate('contacts')}
      />

      {recentContacts.length > 0 ? (
        <div className="adm-m-list">
          {recentContacts.slice(0, 5).map((contact) => (
            <ContactListCard
              key={contact.id}
              contact={contact}
              onClick={onSelectContact || (() => onNavigate('contacts'))}
            />
          ))}
        </div>
      ) : (
        <div className="adm-m-empty-card">
          <p>No inquiries yet. Submissions from your contact form will show here.</p>
        </div>
      )}
    </div>

    {/* ── Desktop layout ── */}
    <div className="adm-desktop-only">
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
  </div>
);

export default DashboardPanel;

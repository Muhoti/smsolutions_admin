import React from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import { ASSETS } from '../../constants/assets';
import { ADMIN_TABS } from './adminConstants';
import ThemeToggle from '../ThemeToggle';
import AdminUserMenu from './AdminUserMenu';
import AdminMobileNav from './AdminMobileNav';
import Button from '../ui/Button';

const TAB_TITLES = {
  dashboard: 'Dashboard',
  contacts: 'Contacts',
  projects: 'Projects',
  testimonials: 'Testimonials',
};

const AdminShell = ({
  activeTab,
  onTabChange,
  stats,
  adminUser,
  onLogout,
  children,
}) => (
  <div className="adm-app">
    <aside className="adm-sidebar adm-sidebar--desktop">
      <div className="adm-sidebar-brand">
        <Link to="/" className="adm-sidebar-logo">
          <img src={ASSETS.logoNavbar} alt="Strong's Digital Labs" />
        </Link>
      </div>

      <nav className="adm-sidebar-nav" aria-label="Admin navigation">
        {ADMIN_TABS.map(({ id, label, icon: Icon, badgeKey }) => {
          const badge = badgeKey ? stats?.[badgeKey] : null;
          const showBadge = badgeKey === 'newInquiries' ? badge > 0 : false;

          return (
            <button
              key={id}
              type="button"
              className={`adm-sidebar-link${activeTab === id ? ' active' : ''}`}
              onClick={() => onTabChange(id)}
            >
              <Icon size={18} />
              <span>{label}</span>
              {showBadge && <span className="adm-sidebar-badge">{badge}</span>}
            </button>
          );
        })}
      </nav>

      <div className="adm-sidebar-footer">
        <Button to="/" variant="secondary" className="adm-sidebar-site-link">
          <FiExternalLink size={16} />
          View public site
        </Button>
      </div>
    </aside>

    <div className="adm-frame">
      <header className="adm-header">
        <div className="adm-header-brand-mobile">
          <Link to="/" className="adm-header-logo-mobile">
            <img src={ASSETS.logoNavbar} alt="" />
          </Link>
        </div>

        <div className="adm-header-title">
          <p className="adm-header-portal">Admin Portal</p>
          <h1 className="adm-header-section">{TAB_TITLES[activeTab]}</h1>
        </div>

        <div className="adm-header-actions">
          <ThemeToggle />
          <AdminUserMenu user={adminUser} onLogout={onLogout} compactOnMobile />
        </div>
      </header>

      <main className="adm-main">{children}</main>
    </div>

    <AdminMobileNav activeTab={activeTab} onTabChange={onTabChange} stats={stats} />
  </div>
);

export default AdminShell;

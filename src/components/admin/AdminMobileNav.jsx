import React from 'react';
import { ADMIN_TABS } from './adminConstants';

const AdminMobileNav = ({ activeTab, onTabChange, stats }) => (
  <nav className="adm-mobile-nav" aria-label="Admin navigation">
    {ADMIN_TABS.map(({ id, label, icon: Icon, badgeKey }) => {
      const badge = badgeKey === 'newInquiries' ? stats?.newInquiries : 0;
      const active = activeTab === id;

      return (
        <button
          key={id}
          type="button"
          className={`adm-mobile-tab${active ? ' active' : ''}`}
          onClick={() => onTabChange(id)}
          aria-current={active ? 'page' : undefined}
        >
          <span className="adm-mobile-tab-icon">
            <Icon size={22} strokeWidth={active ? 2.25 : 1.85} />
            {badge > 0 && <span className="adm-mobile-tab-badge">{badge}</span>}
          </span>
          <span className="adm-mobile-tab-label">{label}</span>
          {active && <span className="adm-mobile-tab-indicator" aria-hidden="true" />}
        </button>
      );
    })}
  </nav>
);

export default AdminMobileNav;

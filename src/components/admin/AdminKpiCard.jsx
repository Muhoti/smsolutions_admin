import React from 'react';

const AdminKpiCard = ({ icon: Icon, label, value, hint, onClick, accent = 'blue' }) => (
  <button
    type="button"
    className={`adm-kpi adm-kpi--${accent}${onClick ? ' adm-kpi--clickable' : ''}`}
    onClick={onClick}
    disabled={!onClick}
  >
    <div className="adm-kpi-top">
      <span className="adm-kpi-icon">
        <Icon size={20} />
      </span>
      {hint && <span className="adm-kpi-hint">{hint}</span>}
    </div>
    <p className="adm-kpi-value">{value}</p>
    <p className="adm-kpi-label">{label}</p>
  </button>
);

export default AdminKpiCard;

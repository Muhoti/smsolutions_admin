import React from 'react';

const MobileSectionHead = ({ title, action, onAction }) => (
  <div className="adm-m-section-head">
    <p className="adm-m-section-title">{title}</p>
    {action && (
      <button type="button" className="adm-m-section-action" onClick={onAction}>
        {action}
      </button>
    )}
  </div>
);

export default MobileSectionHead;

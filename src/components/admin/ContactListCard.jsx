import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { PROJECT_TYPE_LABELS, formatDate, getInitials } from './adminConstants';

const ContactListCard = ({ contact, onClick }) => (
  <button type="button" className="adm-m-list-card" onClick={() => onClick(contact)}>
    <span className="adm-m-avatar">{getInitials(contact.name)}</span>
    <span className="adm-m-list-body">
      <span className="adm-m-list-top">
        <strong>{contact.name}</strong>
        <span className={`adm-badge adm-badge--${contact.status}`}>
          {contact.status.replace(/-/g, ' ')}
        </span>
      </span>
      <span className="adm-m-list-sub">{contact.email}</span>
      <span className="adm-m-list-meta">
        {PROJECT_TYPE_LABELS[contact.projectType] || contact.projectType}
        {contact.company ? ` · ${contact.company}` : ''}
        · {formatDate(contact.createdAt)}
      </span>
    </span>
    <FiChevronRight size={18} className="adm-m-list-chevron" />
  </button>
);

export default ContactListCard;

import {
  FiTrendingUp,
  FiUsers,
  FiFolder,
  FiMessageSquare,
} from 'react-icons/fi';

export const ADMIN_TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: FiTrendingUp },
  { id: 'contacts', label: 'Contacts', icon: FiUsers, badgeKey: 'newInquiries' },
  { id: 'projects', label: 'Projects', icon: FiFolder, badgeKey: 'totalProjects' },
  { id: 'testimonials', label: 'Testimonials', icon: FiMessageSquare, badgeKey: 'totalTestimonials' },
];

export const PROJECT_TYPE_LABELS = {
  mobile: 'Mobile App',
  web: 'Web Application',
  both: 'Web + Mobile',
  consultation: 'Consultancy',
  other: 'Other',
};

export const CONTACT_STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'closed', label: 'Closed' },
];

export const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};

export const PAGE_SIZE = 10;

export const formatDate = (dateString) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getAdminUser = () => {
  try {
    const raw = localStorage.getItem('adminUser');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setAdminUser = (user) => {
  if (user) {
    localStorage.setItem('adminUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('adminUser');
  }
};

export const filterContacts = (contacts, { search, status }) => {
  const q = search.trim().toLowerCase();
  return contacts.filter((contact) => {
    const matchesStatus = !status || contact.status === status;
    const matchesSearch = !q || [
      contact.name,
      contact.email,
      contact.company,
      contact.message,
    ].some((field) => field?.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });
};

export const filterProjects = (projects, { search, category }) => {
  const q = search.trim().toLowerCase();
  return projects.filter((project) => {
    const matchesCategory = !category || project.category === category;
    const matchesSearch = !q || [
      project.title,
      project.description,
      project.clientName,
    ].some((field) => field?.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });
};

export const paginate = (items, page, pageSize = PAGE_SIZE) => {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    total: items.length,
  };
};

export const getInitials = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || '?';

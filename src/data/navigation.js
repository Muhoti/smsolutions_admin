import {
  FiHome,
  FiBriefcase,
  FiFolder,
  FiUser,
  FiMail,
} from 'react-icons/fi';

export const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  {
    name: 'Services',
    path: '/services',
    dropdown: [
      { name: 'Systems Consultancy', path: '/services#consultancy' },
      { name: 'Web Development', path: '/services#web' },
      { name: 'Mobile Apps', path: '/services#mobile' },
      { name: 'AI-Enabled Solutions', path: '/services#ai' },
    ],
  },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const MOBILE_TAB_ITEMS = [
  { name: 'Home', path: '/', icon: FiHome },
  { name: 'Services', path: '/services', icon: FiBriefcase },
  { name: 'Work', path: '/portfolio', icon: FiFolder },
  { name: 'About', path: '/about', icon: FiUser },
  { name: 'Contact', path: '/contact', icon: FiMail },
];

export const FOOTER_QUICK_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
];

export const FOOTER_SERVICES = [
  { name: 'Systems Consultancy', path: '/services#consultancy' },
  { name: 'Web Development', path: '/services#web' },
  { name: 'Mobile Apps', path: '/services#mobile' },
  { name: 'AI-Enabled Solutions', path: '/services#ai' },
];

import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

export const CONTACT = {
  email: 'info@smsolutions.co.ke',
  phone: '+254 707 809 592',
  phoneTel: '+254707809592',
  location: 'Nairobi, Kenya',
  tagline: 'WE CODE. WE DESIGN. WE EMPOWER.',
};

export const SOCIAL_LINKS = [
  { name: 'GitHub', icon: FiGithub, url: 'https://github.com/strongmuhoti' },
  { name: 'LinkedIn', icon: FiLinkedin, url: 'https://linkedin.com/in/strongmuhoti' },
  { name: 'Twitter', icon: FiTwitter, url: 'https://twitter.com/strongmuhoti' },
];

export const COMPANY_VALUES = [
  {
    title: 'Quality Engineering',
    description: 'We write maintainable code and build systems designed to last.',
  },
  {
    title: 'Client Success',
    description: 'Your outcomes drive our work. We measure success by the value we deliver.',
  },
  {
    title: 'Practical Innovation',
    description: 'We adopt new technology — including AI — only when it serves your business.',
  },
  {
    title: 'Transparency',
    description: 'Clear communication, honest timelines, and no surprises along the way.',
  },
];

export const PROJECT_CATEGORIES = [
  { id: 'all', name: 'All Projects' },
  { id: 'web', name: 'Web Applications' },
  { id: 'mobile', name: 'Mobile Apps' },
  { id: 'both', name: 'Cross-Platform' },
];

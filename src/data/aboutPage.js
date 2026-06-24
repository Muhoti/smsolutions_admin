import {
  FiCode,
  FiSmartphone,
  FiMonitor,
  FiCpu,
  FiUsers,
  FiGlobe,
  FiCheckCircle,
  FiTarget,
} from 'react-icons/fi';

export const ABOUT_CAPABILITIES = [
  { name: 'React & Node.js', level: 95, icon: FiCode },
  { name: 'Web Applications', level: 95, icon: FiMonitor },
  { name: 'Mobile Development', level: 90, icon: FiSmartphone },
  { name: 'PostgreSQL & APIs', level: 92, icon: FiCode },
  { name: 'AI Integration', level: 88, icon: FiCpu },
  { name: 'Systems Architecture', level: 90, icon: FiTarget },
];

export const ABOUT_HIGHLIGHTS = [
  {
    icon: FiUsers,
    number: 'Consultancy',
    title: 'Client-First Approach',
    description: 'We start with your business problem, not a technology trend',
  },
  {
    icon: FiGlobe,
    number: 'Full-Stack',
    title: 'End-to-End Delivery',
    description: 'From strategy and design through to deployment and support',
  },
  {
    icon: FiCpu,
    number: 'AI-Ready',
    title: 'Practical Intelligence',
    description: 'We apply AI where it saves time, reduces cost, or improves decisions',
  },
  {
    icon: FiCheckCircle,
    number: 'Nairobi',
    title: 'Local & Remote',
    description: 'Based in Kenya, serving clients locally and internationally',
  },
];

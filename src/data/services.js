import {
  FiBriefcase,
  FiMonitor,
  FiSmartphone,
  FiCpu,
} from 'react-icons/fi';

export const SERVICES = [
  {
    id: 'consultancy',
    icon: FiBriefcase,
    title: 'Systems Consultancy',
    subtitle: 'Strategy & Architecture',
    description:
      'We help organizations plan, assess, and modernize their technology — before a single line of code is written.',
    features: [
      'Requirements discovery & workshops',
      'Technical architecture & roadmaps',
      'Legacy system assessment',
      'Vendor & technology selection',
      'Digital transformation planning',
      'Ongoing technical advisory',
    ],
    technologies: ['Architecture', 'System Design', 'APIs', 'Cloud', 'PostgreSQL'],
  },
  {
    id: 'web',
    icon: FiMonitor,
    title: 'Web Development',
    subtitle: 'Websites, Apps & Portals',
    description:
      'We build web applications, business websites, and admin portals that scale with your organization.',
    features: [
      'Corporate & business websites',
      'Web applications & dashboards',
      'Admin portals & CMS systems',
      'API development & integrations',
      'Cloud deployment',
      'Performance optimization',
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'REST APIs', 'AWS'],
  },
  {
    id: 'mobile',
    icon: FiSmartphone,
    title: 'Mobile App Development',
    subtitle: 'iOS, Android & Cross-Platform',
    description:
      'We create mobile applications that connect your team and customers to your systems anywhere.',
    features: [
      'Cross-platform mobile apps',
      'Native iOS & Android',
      'Field & offline-first apps',
      'Push notifications',
      'App store deployment',
      'Mobile-backend integration',
    ],
    technologies: ['React Native', 'iOS', 'Android', 'Firebase', 'REST APIs'],
  },
  {
    id: 'ai',
    icon: FiCpu,
    title: 'AI-Enabled Solutions',
    subtitle: 'Practical Intelligence',
    description:
      'We integrate AI capabilities that improve efficiency, automate workflows, and unlock insights from your data.',
    features: [
      'AI-assisted development (faster delivery)',
      'Intelligent dashboards & reporting',
      'Chatbots & customer support automation',
      'Document processing & extraction',
      'Workflow automation',
      'AI-ready system architecture',
    ],
    technologies: ['LLM APIs', 'Automation', 'NLP', 'Data Pipelines', 'Integrations'],
  },
];

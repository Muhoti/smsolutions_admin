/** Canonical page copy — shared by the desktop site and mobile screens */

export const HOME_CONTENT = {
  hero: {
    title: 'We build intelligent',
    titleAccent: 'online systems',
    subtitle:
      "At Strong's Digital Labs, we help businesses design and launch high-performance websites, web apps, and mobile solutions — integrating practical AI that drives measurable results.",
    ctaPrimary: { label: 'View Our Work', to: '/portfolio' },
    ctaSecondary: { label: 'Contact Us', to: '/contact' },
  },
  services: {
    title: 'Our Services',
    subtitle:
      'End-to-end technology consultancy for businesses building modern online systems',
    linkLabel: 'All services',
  },
  howWeWork: {
    title: 'How We Work',
    subtitle:
      'A structured consultancy process designed to reduce risk and deliver results',
  },
  portfolio: {
    title: 'Featured Projects',
    subtitle:
      'Selected projects showcasing the systems we design and build for our clients',
    linkLabel: 'View All Projects',
    previewCount: 3,
    loadingMessage: 'Loading amazing projects...',
    emptyTitle: 'No projects yet',
    emptyMessage: "Projects will appear here once they're added to the database.",
    emptyHint: 'Check back later or contact us to discuss your project.',
  },
  testimonials: {
    title: 'What Clients Say',
    subtitle: 'Feedback from organizations we have partnered with',
  },
  cta: {
    title: 'Ready to Build Your Next System?',
    subtitle:
      'Tell us about your goals. We will review your requirements and respond with a clear path forward — consultancy, development, or both.',
    button: 'Contact Us',
  },
};

export const ABOUT_CONTENT = {
  hero: {
    title: "About Strong's Digital Labs",
    subtitle: 'A technology consultancy helping businesses build intelligent online systems',
  },
  story: {
    title: 'Who We Are',
    paragraphs: [
      "Strong's Digital Labs is a software development consultancy focused on helping businesses design, build, and maintain online systems — websites, web applications, and mobile apps that solve real operational challenges.",
      'We work with startups, SMEs, NGOs, and public-sector organizations that need reliable technology partners. From emergency response platforms to agricultural management systems, we bring full-stack engineering expertise to every engagement.',
      'What sets us apart is our practical approach to AI. We do not sell buzzwords — we integrate intelligent automation, faster development workflows, and data-driven features where they genuinely improve outcomes for your business.',
    ],
  },
  capabilities: {
    title: 'Our Capabilities',
    subtitle:
      'Modern full-stack engineering with a focus on maintainable, scalable systems',
  },
  howWeWork: {
    title: 'How We Work',
  },
  values: {
    title: 'Our Values',
  },
};

export const SERVICES_CONTENT = {
  hero: {
    title: 'Our Services',
    subtitle:
      'Technology consultancy and development for businesses building modern online systems',
  },
  process: {
    title: 'Our Process',
    subtitle:
      'A proven consultancy methodology from first conversation to long-term support',
  },
  cta: {
    title: "Let's Discuss Your Project",
    subtitle: 'Tell us what you are building. We will respond with a clear recommendation.',
    primary: 'Contact Us',
    secondary: 'View Our Work',
  },
};

export const PORTFOLIO_CONTENT = {
  hero: {
    title: 'Our Portfolio',
    subtitle:
      'Explore the online systems, web applications, and mobile apps we have built for our clients',
  },
  cta: {
    title: 'Ready to Build Your System?',
    subtitle:
      'Tell us about your project and we will respond with a clear recommendation.',
    button: 'Contact Us',
  },
  empty: {
    title: 'No projects yet',
    message: 'Projects will appear here once added via the admin panel.',
  },
  loadingMessage: 'Loading projects...',
};

export const CONTACT_CONTENT = {
  hero: {
    title: 'Contact Us',
    subtitle:
      'Ready to start your project? Tell us about your requirements and we will respond with a clear recommendation.',
  },
  form: {
    title: 'Tell Us About Your Project',
    subtitle: 'Fill out the form below and we will get back to you within 24 hours',
    fields: {
      name: { label: 'Full Name *', placeholder: 'Your full name', required: 'Name is required' },
      email: {
        label: 'Email Address *',
        placeholder: 'your.email@example.com',
        required: 'Email is required',
        invalid: 'Invalid email address',
      },
      phone: { label: 'Phone Number', placeholder: '+254 700 000 000' },
      company: { label: 'Company Name', placeholder: 'Your company name' },
      projectType: { label: 'Project Type *', placeholder: 'Select project type', required: 'Project type is required' },
      budget: { label: 'Budget Range', placeholder: 'Select budget range' },
      timeline: { label: 'Project Timeline', placeholder: 'Select timeline' },
      message: {
        label: 'Project Details *',
        placeholder: 'Tell us about your project, goals, and any specific requirements...',
        required: 'Project details are required',
      },
    },
    submit: 'Send Message',
    sending: 'Sending...',
  },
  success: {
    title: 'Thank You!',
    message: 'Your message has been sent successfully. We will get back to you within 24 hours.',
  },
  faq: {
    title: 'Frequently Asked Questions',
  },
  toast: {
    success: 'Message sent successfully! We will get back to you within 24 hours.',
    error: 'Failed to send message. Please try again.',
    unexpected: 'An unexpected error occurred. Please try again.',
  },
};

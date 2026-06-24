export const getProjectType = (category, type) => {
  if (category === 'mobile') return 'Mobile App';
  if (category === 'web') return 'Web Application';
  if (category === 'both') return 'Cross-Platform';
  if (category === 'consultation') return 'Consultancy';
  return type || 'Application';
};

export const getProjectCover = (project) => {
  if (project?.images?.length > 0 && project.images[0]) {
    return project.images[0];
  }
  return null;
};

export const getProjectInitials = (title = '') =>
  title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase() || 'P';

export const getCategoryTheme = (category) => {
  const themes = {
    web: { key: 'web', label: 'Web' },
    mobile: { key: 'mobile', label: 'Mobile' },
    both: { key: 'both', label: 'Cross-platform' },
    consultation: { key: 'consultation', label: 'Consultancy' },
  };
  return themes[category] || themes.web;
};

export const filterProjects = (projects, { category = 'all', searchTerm = '' } = {}) => {
  const term = searchTerm.toLowerCase();

  return projects.filter((project) => {
    const matchesCategory = category === 'all' || project.category === category;
    const matchesSearch =
      !term ||
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      (project.clientName && project.clientName.toLowerCase().includes(term));

    return matchesCategory && matchesSearch;
  });
};

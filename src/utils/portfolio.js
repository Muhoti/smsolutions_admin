export const getProjectType = (category, type) => {
  if (category === 'mobile') return 'Mobile App';
  if (category === 'web') return 'Web Application';
  if (category === 'both') return 'Cross-Platform';
  return type || 'Application';
};

export const getProjectImage = (project) => {
  if (project.images?.length > 0) {
    return project.images[0];
  }

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(project.title)}&background=0088ff&color=fff&size=400`;
};

export const filterProjects = (projects, { category = 'all', searchTerm = '' } = {}) => {
  const term = searchTerm.toLowerCase();

  return projects.filter((project) => {
    const matchesCategory = category === 'all' || project.category === category;
    const matchesSearch =
      !term ||
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });
};

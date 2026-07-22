const defaultProjects = [
  {
    id: 'ibyapa',
    title: 'Ibyapa.com — Driving Exam Platform',
    description:
      'Production platform serving 80,000+ learners with reliable exam sessions, payment processing, and continuous access across Rwanda.',
    featured: true,
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'NGINX', 'Cloudflare'],
    metrics: [
      { value: '80K+', label: 'Users' },
    ],
    challenges: [],
    solutions: [],
    results: [],
    links: { live: 'https://ibyapa.com' },
  },
  {
    id: 'ai-server',
    title: 'Containerized AI Server',
    description:
      'Reproducible LLM benchmarking on resource-constrained edge devices with containerized services and secure remote access.',
    featured: true,
    tech: ['Docker', 'Raspberry Pi', 'Python', 'AI/ML'],
    metrics: [
      { value: 'ARM64', label: 'Edge Runtime' },
      { value: 'Docker', label: 'Deploys' },
    ],
    challenges: [],
    solutions: [],
    results: [],
    links: {},
  },
];

const defaultBlogs = [
  {
    id: 'platform-80k-users',
    slug: 'building-platform-80000-users',
    title: 'Building a Platform Used by 80,000 Users',
    excerpt:
      'Ibyapa.com started as a practical need in Rwanda. Years later it has 80,000+ users, and I am still the person who gets the call when something breaks.',
    content: 'See full article on portfolio site.',
    readTime: '10 min read',
    tags: ['Production Systems', 'Ibyapa', 'Entrepreneurship'],
    featured: true,
  },
  {
    id: 'rwanda-to-america',
    slug: 'journey-rwanda-to-graduate-school',
    title: 'My Journey from Rwanda to Graduate School in America',
    excerpt:
      'Rwanda, then India for undergrad, now a Master\'s in Computer Science in Washington, DC. A short account of how I got here and what stayed the same.',
    content: 'See full article on portfolio site.',
    readTime: '8 min read',
    tags: ['Career', 'International', 'Personal'],
    featured: false,
  },
  {
    id: 'production-infrastructure',
    slug: 'lessons-production-infrastructure',
    title: 'Lessons Learned Running Production Infrastructure',
    excerpt:
      'Notes from keeping Linux servers, NGINX, and Node.js APIs alive for a real product. Mostly unglamorous, occasionally stressful.',
    content: 'See full article on portfolio site.',
    readTime: '12 min read',
    tags: ['DevOps', 'Linux', 'Production'],
    featured: true,
  },
  {
    id: 'benchmarking-llms',
    slug: 'benchmarking-small-language-models',
    title: 'Benchmarking Small Language Models on Edge Devices',
    excerpt:
      'I needed a fair way to compare small open-source models on a Raspberry Pi. Here is the setup I used and what actually limited performance.',
    content: 'See full article on portfolio site.',
    readTime: '9 min read',
    tags: ['AI', 'Edge Computing', 'Research'],
    featured: true,
  },
];

const defaultSkills = [
  {
    id: 'skills-frontend',
    title: 'Frontend / Web',
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
  },
  {
    id: 'skills-backend',
    title: 'Backend / API',
    skills: ['Node.js', 'Express', 'Python', 'REST APIs'],
  },
  {
    id: 'skills-devops',
    title: 'Cloud & DevOps',
    skills: ['Docker', 'Linux', 'NGINX', 'CI/CD', 'VPS', 'AWS'],
  },
  {
    id: 'skills-databases',
    title: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB'],
  },
  {
    id: 'skills-systems',
    title: 'Systems',
    skills: ['Git', 'Redis', 'PM2'],
  },
  {
    id: 'skills-ai',
    title: 'AI / ML',
    skills: ['Python', 'TensorFlow'],
  },
];

module.exports = {
  defaultProjects,
  defaultBlogs,
  defaultSkills,
};

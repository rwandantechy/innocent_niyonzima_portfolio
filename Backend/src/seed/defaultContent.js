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
      'What I learned building and operating Ibyapa.com — a driving theory platform that grew from zero to 80,000+ users with real payments, real failures, and real production responsibility.',
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
      'From growing up in Rwanda to studying in India and now pursuing a Master\'s in Computer Science in Washington, DC.',
    content: 'See full article on portfolio site.',
    readTime: '8 min read',
    tags: ['Career', 'International', 'Personal'],
    featured: true,
  },
  {
    id: 'production-infrastructure',
    slug: 'lessons-production-infrastructure',
    title: 'Lessons Learned Running Production Infrastructure',
    excerpt:
      'Practical lessons from operating Linux servers, NGINX, and Node.js APIs in production.',
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
      'How I designed automated benchmarking frameworks to compare open-source LLMs on resource-constrained Raspberry Pi hardware.',
    content: 'See full article on portfolio site.',
    readTime: '9 min read',
    tags: ['AI', 'Edge Computing', 'Research'],
    featured: true,
  },
];

const defaultSkills = [
  {
    id: 'skills-languages',
    title: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'],
  },
  {
    id: 'skills-backend',
    title: 'Backend',
    skills: ['Node.js', 'Express', 'REST APIs', 'Laravel'],
  },
  {
    id: 'skills-databases',
    title: 'Databases',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'skills-devops',
    title: 'DevOps & Infra',
    skills: ['Docker', 'Linux', 'NGINX', 'CI/CD', 'VPS'],
  },
];

module.exports = {
  defaultProjects,
  defaultBlogs,
  defaultSkills,
};

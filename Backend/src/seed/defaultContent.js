const defaultProjects = [
  {
    id: 'ibyapa',
    title: 'Ibyapa.com - Driving Exam Platform',
    description:
      'Production platform serving 80,000+ learners with reliable exam sessions, payment processing, and continuous access across Rwanda.',
    featured: true,
    published: true,
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
    published: true,
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
    published: true,
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
    published: true,
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
    published: true,
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
    published: true,
  },
];

const defaultSkills = [
  {
    id: 'skills-frontend',
    title: 'Frontend / Web',
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
    published: true,
  },
  {
    id: 'skills-backend',
    title: 'Backend / API',
    skills: ['Node.js', 'Express', 'Python', 'REST APIs'],
    published: true,
  },
  {
    id: 'skills-devops',
    title: 'Cloud & DevOps',
    skills: ['Docker', 'Linux', 'NGINX', 'CI/CD', 'VPS', 'AWS'],
    published: true,
  },
  {
    id: 'skills-databases',
    title: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB'],
    published: true,
  },
  {
    id: 'skills-systems',
    title: 'Systems',
    skills: ['Git', 'Redis', 'PM2'],
    published: true,
  },
  {
    id: 'skills-ai',
    title: 'AI / ML',
    skills: ['Python', 'TensorFlow'],
    published: true,
  },
];

const defaultExperience = [
  {
    id: 'exp-niheza',
    role: 'Technical Lead (Project-Based)',
    company: 'Niheza Solutions Ltd',
    location: 'Kigali, Rwanda',
    startDate: '2026',
    endDate: null,
    concurrent: true,
    bullets: [
      'Led backend and deployment work on client web projects alongside graduate studies',
      'Supported API design, bug triage, and release planning',
      'Built internal tools to reduce repetitive operational work',
    ],
    logo: '/Profile/niheza-logo.png',
    order: 0,
    published: true,
  },
  {
    id: 'exp-itec',
    role: 'Full-Stack Software Engineer',
    company: 'ITEC International',
    location: 'Kigali, Rwanda',
    startDate: 'Jan 2024',
    endDate: 'Mar 2026',
    concurrent: false,
    bullets: [
      'Developed backend services and APIs for ITEC’s SaaS products supporting student management, payments, and facility management systems',
      'Contributed to the API layer of ITEC Pay, a payment platform supporting multiple payment methods',
      'Provided technical support to partner companies and their developers integrating ITEC’s payment gateway',
    ],
    logo: '/Profile/itec-logo.jpeg',
    order: 1,
    published: true,
  },
  {
    id: 'exp-cua',
    role: 'Graduate Research Assistant',
    company: 'Molecular Computing Lab, The Catholic University of America',
    location: 'Washington, DC',
    startDate: 'Apr 2025',
    endDate: 'Dec 2025',
    concurrent: true,
    bullets: [
      'Built an automated evaluation framework comparing multiple open-weight LLMs on resource-constrained environments',
      'Evaluated performance trade-offs across models including Gemma, Phi-3, Mistral, TinyLlama, and LLaMA',
      'Automated model evaluation and metrics collection, reducing manual effort across repeated benchmarking experiments',
      'Analyzed model efficiency vs performance for edge-device AI deployment scenarios',
    ],
    logo: 'https://legacywww.catholic.edu/assets/images/CUA-Logo-Large.png',
    order: 2,
    published: true,
  },
  {
    id: 'exp-webacy',
    role: 'Web3 Security Data Analytics Extern',
    company: 'Webacy',
    location: 'New York, NY',
    startDate: 'Aug 2024',
    endDate: 'Oct 2024',
    concurrent: true,
    bullets: [
      'Completed a project-based externship focused on Web3 security, blockchain technologies, and data analytics',
      'Analyzed and labeled smart contract vulnerabilities to support security research and risk assessment',
      'Worked with blockchain datasets using Python and Microsoft Excel to identify patterns and generate actionable insights',
      'Collaborated with mentors and fellow externs to investigate Web3 security challenges and present technical findings',
    ],
    logo: '/Profile/webacy.png',
    order: 3,
    published: true,
  },
  {
    id: 'exp-nishkaam',
    role: 'Software Developer Intern',
    company: 'Nishkaam Innovations',
    location: 'Rajkot, India',
    startDate: 'Dec 2023',
    endDate: 'Apr 2024',
    concurrent: false,
    bullets: [
      'Contributed to 3 internal tools that automated recurring reporting tasks',
      'Built workflow and task management tools improving internal operational efficiency',
      'Collaborated with engineering small team to deliver production-ready features',
      'Contributed to debugging, API design, and system improvements',
    ],
    logo: 'https://nishkaamllp.com/assets/logo.png',
    order: 4,
    published: true,
  },
];

module.exports = {
  defaultProjects,
  defaultBlogs,
  defaultSkills,
  defaultExperience,
};

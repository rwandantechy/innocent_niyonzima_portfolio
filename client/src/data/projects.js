const projects = [
  {
    id: 'ibyapa',
    title: 'Ibyapa.com - Driving Exam Platform',
    description: 'Production platform serving 76,000+ learners with reliable exam sessions, payment processing, and continuous access across Rwanda.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'NGINX', 'Cloudflare'],
    metrics: [
      { value: '76K+', label: 'Users' },
      { value: '40K+', label: 'Transactions' },
    ],
    link: 'https://ibyapa.com',
    featured: true,
  },
  {
    id: 'ai-server',
    title: 'Containerized AI Server',
    description: 'Reproducible LLM benchmarking on resource-constrained edge devices with containerized services and secure remote access.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    tags: ['Docker', 'Raspberry Pi', 'Python', 'AI/ML'],
    metrics: [
      { value: 'ARM64', label: 'Edge Runtime' },
      { value: 'Docker', label: 'Deploys' },
    ],
    link: '#',
    featured: true,
  },
  {
    id: 'budget-planner',
    title: 'Personal Budget Planner',
    description: 'Built to reduce manual tracking errors by enforcing consistent transaction rules and dependable data handling in everyday financial workflows.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    tags: ['C#', '.NET Core', 'SQL Server'],
    metrics: [
      { value: '.NET', label: 'Backend' },
      { value: 'SQL', label: 'Data Layer' },
    ],
    link: '#',
    featured: false,
  },
  {
    id: 'nkotanyi',
    title: 'Nkotanyi Driving School Platform',
    description: 'Production school-management platform maintained through active monitoring, backend debugging, and controlled Linux deployments.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    tags: ['Node.js', 'VPS', 'DevOps', 'NGINX'],
    metrics: [
      { value: 'Live', label: 'Production' },
      { value: '24/7', label: 'Support' },
    ],
    link: 'https://nkotanyi.rw',
    featured: true,
  },
  {
    id: 'yigse',
    title: 'YIGSE NGO Website & Branding',
    description: 'Delivered a maintainable public site with straightforward content updates for a non-technical team.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    tags: ['HTML', 'CSS', 'Design', 'Branding'],
    metrics: [
      { value: 'Public', label: 'Live Site' },
      { value: 'Simple', label: 'Updates' },
    ],
    link: '#',
    featured: false,
  },
  {
    id: 'task-tracker',
    title: 'Inter-Departmental Task Tracker',
    description: 'Introduced to reduce missed operational handoffs with traceable task states and reliable status visibility.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    tags: ['Node.js', 'Express', 'MongoDB', 'Agile'],
    metrics: [
      { value: '70%', label: 'Faster Response' },
      { value: 'Realtime', label: 'Updates' },
    ],
    link: '#',
    featured: false,
  },
];

export default projects;

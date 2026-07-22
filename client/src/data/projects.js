const projects = [
  {
    id: 'ibyapa',
    title: 'Ibyapa.com - Driving Exam Platform',
    description: 'Production platform serving 80,000+ learners with reliable exam sessions, payment processing, and continuous access across Rwanda.',
    image: '/projects/ibyapa-thumbnail.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'NGINX', 'Cloudflare'],
    metrics: [
      { value: '80K+', label: 'Users' },
      { value: '99%+', label: 'Uptime' },
      { value: 'Live', label: 'Production' },
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
      { value: 'VPN', label: 'Secure Access' },
    ],
    link: null,
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
      { value: 'Static', label: 'Fast Deploys' },
      { value: 'NGO', label: 'Client Work' },
    ],
    link: null,
    featured: false,
  },
];

export default projects;

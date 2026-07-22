const experiences = [
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

export function formatExperienceDate(item) {
  if (item.date) return item.date;
  const end = item.endDate || 'Present';
  const range = `${item.startDate || ''} - ${end}`.replace(/^\s-\s/, '').trim();
  if (item.concurrent) return `${range} · Concurrent`;
  return range;
}

/** Map API/fallback experience docs to Timeline display shape. */
export function toTimelineItem(item) {
  return {
    id: item.id,
    title: item.role || item.title,
    company: item.company,
    location: item.location,
    date: formatExperienceDate(item),
    logo: item.logo,
    highlights: Array.isArray(item.bullets) ? item.bullets : (item.highlights || []),
  };
}

export default experiences;

export const detailedProjects = [
  {
    id: 1,
    title: 'Ibyapa.com - Exam Preparation Platform',
    description: 'Built to keep driving-theory exam preparation continuously available for 80,000+ learners, with backend decisions centered on stable sessions, payments, and recoverable failures in production.',
    featured: true,
    metrics: [
      { value: '80K+', label: 'Users Served' },
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Redis', 'AWS'],
    challenges: [
      'Keeping the platform responsive during peak exam-preparation traffic',
      'Handling payment errors and incomplete transactions without losing auditability',
      'Debugging unpredictable production failures with limited time windows for fixes',
      'Deploying updates safely while users remained active on the platform'
    ],
    solutions: [
      'Prioritized backend endpoints by operational risk and hardened payment and account flows first',
      'Added structured logs around critical request paths to speed up incident diagnosis',
      'Introduced recovery paths for failed payment operations and reconciliation checks',
      'Used controlled deployment steps on Linux servers to reduce avoidable production regressions'
    ],
    results: [
      'Sustained a live platform serving 80,000+ users with direct backend ownership',
      'Reduced repeated production incidents by fixing root causes instead of temporary patches',
      'Improved operational visibility during outages through better logs and error traces',
      'Maintained release continuity while supporting day-to-day production issues'
    ],
    links: {
      live: 'https://ibyapa.com',
      github: null
    }
  },
  {
    id: 2,
    title: 'Containerized Infrastructure on Edge Devices',
    description: 'Created to run model workloads reliably on constrained edge devices, with reproducible containers, secure remote access, and predictable deployment behavior.',
    featured: true,
    metrics: [
      { value: 'ARM64', label: 'Edge Runtime' },
      { value: 'Docker', label: 'Reproducible Deploys' },
      { value: 'VPN', label: 'Secure Access' }
    ],
    tech: ['Docker', 'Python', 'FastAPI', 'TensorFlow', 'Raspberry Pi', 'WireGuard VPN'],
    challenges: [
      'Limited CPU and memory budgets on Raspberry Pi hardware',
      'Need for secure remote administration without public service exposure',
      'Runtime inconsistency between local experiments and deployed environments',
      'Operational recovery when containers failed or degraded under load'
    ],
    solutions: [
      'Used multi-stage container builds to keep runtime images lean and repeatable',
      'Secured operations through WireGuard-only access and restricted surface area',
      'Defined service orchestration with Docker Compose for predictable startup order',
      'Added deployment and rollback routines to recover faster from bad releases'
    ],
    results: [
      'Stabilized model-serving behavior across repeated deployments on edge hardware',
      'Reduced manual reconfiguration by codifying environment and service setup',
      'Improved incident recovery during runtime failures through containerized rollbacks'
    ],
    links: {
      github: null
    }
  },
  {
    id: 3,
    title: 'YIGSE NGO Website',
    description: 'Delivered a public-facing NGO site with low maintenance overhead and reliable content publishing for non-technical operators.',
    featured: false,
    metrics: [
      { value: 'Public', label: 'Production Site' },
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Netlify'],
    challenges: [
      'Providing reliable access on lower-bandwidth networks',
      'Keeping content updates manageable for non-engineering teams',
      'Maintaining consistent behavior across mobile and desktop devices'
    ],
    solutions: [
      'Used a lightweight frontend structure with optimized static assets',
      'Implemented accessible semantics and predictable layout behavior',
      'Set up an update workflow that minimized operational friction'
    ],
    results: [
      'Provided a stable public information channel for the organization',
      'Reduced day-to-day maintenance burden through straightforward update patterns'
    ]
  }
];

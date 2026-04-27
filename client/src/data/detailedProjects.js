export const detailedProjects = [
  {
    id: 1,
    title: 'Ibyapa.com - Exam Preparation Platform',
    description: 'Built to keep driving-theory exam preparation continuously available for 72,000+ learners, with backend decisions centered on stable sessions, payments, and recoverable failures in production.',
    featured: true,
    metrics: [
      { value: '72K+', label: 'Users Served' },
      { value: 'Live', label: 'Production System' },
      { value: 'Ongoing', label: 'Uptime Ownership' }
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
      'Sustained a live platform serving 72,000+ users with direct backend ownership',
      'Reduced repeated production incidents by fixing root causes instead of temporary patches',
      'Improved operational visibility during outages through better logs and error traces',
      'Maintained release continuity while supporting day-to-day production issues'
    ],
    links: {
      live: 'https://ibyapa.com',
      github: null // Private repository
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
      github: null // Research project
    }
  },
  {
    id: 3,
    title: 'Budget Planner Web Application',
    description: 'Built to enforce consistent budgeting records and reduce manual tracking mistakes through reliable backend validation and persistent data rules.',
    featured: false,
    metrics: [
      { value: '.NET Core', label: 'Backend Runtime' },
      { value: 'SQL Server', label: 'Data Integrity' },
      { value: 'Tracked', label: 'Operational Events' }
    ],
    tech: ['.NET Core', 'C#', 'SQL Server', 'Entity Framework', 'Bootstrap', 'Chart.js'],
    challenges: [
      'Avoiding silent data inconsistencies in transaction and category mapping',
      'Handling updates safely when users edited related financial records',
      'Keeping reporting useful without compromising correctness of stored data'
    ],
    solutions: [
      'Used repository and service boundaries to keep business rules centralized',
      'Applied transactional updates for dependent financial operations',
      'Added authentication and audit-aware request handling for sensitive actions'
    ],
    results: [
      'Delivered a budgeting workflow with more predictable record consistency',
      'Reduced operational errors caused by manual data entry and ad-hoc edits',
      'Improved maintainability by separating validation logic from presentation'
    ]
  },
  {
    id: 4,
    title: 'Nkotanyi Driving School Platform',
    description: 'Production school platform maintained with an uptime-first approach: backend stability, log-driven debugging, and controlled deployment changes.',
    featured: true,
    metrics: [
      { value: 'Production', label: 'Live Operations' },
      { value: 'Linux VPS', label: 'Deployment Target' },
      { value: 'Log-Driven', label: 'Incident Response' }
    ],
    tech: ['PHP', 'Laravel', 'MySQL', 'Vue.js', 'NGINX', 'VPS'],
    challenges: [
      'Maintaining availability during registration spikes and high concurrent usage',
      'Diagnosing live failures affecting booking, account, and payment flows',
      'Balancing release delivery with operational stability on active systems'
    ],
    solutions: [
      'Used monitoring checks and log inspection to catch and triage incidents early',
      'Hardened deployment and server configuration on Linux/NGINX stack',
      'Applied rollback-minded release routines and backup safeguards for critical data',
      'Handled production debugging directly and shipped fixes with minimal service interruption'
    ],
    results: [
      'Kept a high-traffic platform operational through continuous production support',
      'Reduced repeated outage patterns by addressing root operational issues',
      'Improved service reliability through structured incident and deployment practices'
    ],
    links: {
      live: 'https://nkotanyi.rw'
    }
  },
  {
    id: 5,
    title: 'YIGSE NGO Website',
    description: 'Delivered a public-facing NGO site with low maintenance overhead and reliable content publishing for non-technical operators.',
    featured: false,
    metrics: [
      { value: 'Public', label: 'Production Site' },
      { value: 'Responsive', label: 'Cross-Device Use' },
      { value: 'Simple', label: 'Operational Updates' }
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
  },
  {
    id: 6,
    title: 'Task Tracking System',
    description: 'Built to reduce operational handoff failures across teams through traceable task states, backend validation, and reliable status visibility.',
    featured: false,
    metrics: [
      { value: 'Node.js', label: 'Service Layer' },
      { value: 'MongoDB', label: 'Data Store' },
      { value: 'Realtime', label: 'Status Updates' }
    ],
    tech: ['Node.js', 'Express', 'MongoDB', 'React', 'Socket.io', 'JWT'],
    challenges: [
      'Preventing conflicting updates in shared task workflows',
      'Maintaining clear audit trails for task ownership and status changes',
      'Balancing realtime updates with backend consistency guarantees'
    ],
    solutions: [
      'Implemented realtime events with backend guards to avoid invalid state transitions',
      'Added authenticated API boundaries and role-aware task operations',
      'Created reporting endpoints for operational visibility and follow-up'
    ],
    results: [
      'Improved reliability of cross-team execution by making task states explicit and traceable',
      'Reduced recurring coordination failures with clearer operational reporting'
    ]
  }
];

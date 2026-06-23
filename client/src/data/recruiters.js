import { CREDENTIALS, IMPACT_METRICS } from './metrics';
import { CONTACT_EMAIL, SOCIAL } from '../config/env';

export const RECRUITER_INFO = {
  headline: 'Everything recruiters need in one place',
  summary:
    'Software engineer with production ownership of a platform serving 76,000+ users, experience across cloud infrastructure and AI systems, and an international engineering background.',
  workAuthorization:
    'F-1 student on OPT. Eligible for STEM OPT extension. Open to roles with visa sponsorship.',
  keyAchievements: [
    'Built and operated Ibyapa.com — 76,000+ users, 40,000+ transactions, 22M+ RWF in payments',
    'Owned full-stack production system: APIs, payments, Linux servers, deployment, incident response',
    'Research assistant designing LLM benchmarking frameworks on resource-constrained edge devices',
    'Technical lead for project-based client deliveries at Niheza Solutions',
  ],
  topSkills: [
    'Node.js & Express', 'MongoDB & SQL', 'Docker & Linux', 'NGINX & Cloudflare',
    'AWS & VPS deployment', 'REST API design', 'Payment integrations', 'Production debugging',
    'Python & AI/ML', 'System architecture',
  ],
  contact: {
    email: CONTACT_EMAIL,
    linkedin: SOCIAL.LINKEDIN,
    github: SOCIAL.GITHUB,
  },
  credentials: CREDENTIALS,
  metrics: IMPACT_METRICS,
};

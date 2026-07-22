import { CREDENTIALS, IMPACT_METRICS } from './metrics';
import { CONTACT_EMAIL, SOCIAL } from '../config/env';

export const RECRUITER_INFO = {
  headline: 'Looking to hire?',
  summary:
    'Software engineer who built and runs a live platform for 80,000+ users in Rwanda. I also work on cloud infrastructure, AI systems, and have studied and worked across three continents.',
  workAuthorization:
    'F-1 student on OPT. Eligible for STEM OPT extension. Open to roles with visa sponsorship.',
  keyAchievements: [
    'Built and run Ibyapa.com for 80,000+ users in Rwanda',
    'Handle the full stack in production: APIs, payments, Linux servers, deployments, and incident fixes',
    'Research assistant building LLM benchmarks for resource-limited edge devices',
    'Technical lead on project-based client work at Niheza Solutions',
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

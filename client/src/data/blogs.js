const blogPosts = [
  {
    id: 'platform-76k-users',
    slug: 'building-platform-76000-users',
    title: 'Building a Platform Used by 76,000 Users',
    excerpt:
      'What I learned building and operating Ibyapa.com — a driving theory platform that grew from zero to 76,000+ users with real payments, real failures, and real production responsibility.',
    date: 'Jun 15, 2026',
    readTime: '10 min read',
    tags: ['Production Systems', 'Ibyapa', 'Entrepreneurship'],
    featured: true,
    content: `
## Why this platform exists

When I started building Ibyapa.com, the goal wasn't a portfolio project. Rwanda had a growing demand for driving theory exam preparation, and learners needed something reliable — not another demo app.

Today, the platform serves **76,000+ registered users** and has processed **40,000+ transactions** totaling over **22 million RWF** in payments.

## What production ownership actually means

As the primary developer, I owned everything:

- **Frontend and backend** — React client, Node.js/Express APIs, MongoDB data layer
- **Payments** — integration, reconciliation, and recovery for failed transactions
- **Infrastructure** — Linux VPS, NGINX, Cloudflare, deployment pipelines
- **Operations** — monitoring, incident response, and on-call debugging

This isn't abstract "full-stack" work. It's waking up to error logs, tracing a payment failure to a race condition, and shipping a fix before thousands of users notice.

## Architecture decisions that mattered

The stack is intentionally lean:

\`\`\`
Users → Cloudflare → NGINX → Node.js API → MongoDB + Redis
\`\`\`

**Cloudflare** handles CDN and DDoS protection. **NGINX** terminates SSL and routes traffic. **Redis** caches sessions during peak exam prep traffic. **MongoDB** stores users, exam progress, and transaction records.

The most important decision wasn't the tech stack — it was **structured logging on critical paths** before buying expensive monitoring tools.

## Challenges I didn't expect

1. **Payment reconciliation** — gateway timeouts left transactions in limbo. I built idempotent endpoints with retry logic.
2. **Peak traffic** — exam registration periods spiked concurrent sessions. Session caching and query optimization became priorities.
3. **Deployment anxiety** — pushing updates while users were actively taking practice exams required health checks and controlled rollouts.

## What I'd do differently

I'd invest in staging environments earlier. Debugging production-only issues on a live platform with paying users is stressful in ways no classroom project prepares you for.

## The takeaway

Building for 76,000 real users teaches lessons that no tutorial covers. Reliability isn't a feature — it's the product. And production ownership means being responsible when things break, not just when they work.
    `.trim(),
  },
  {
    id: 'rwanda-to-america',
    slug: 'journey-rwanda-to-graduate-school',
    title: 'My Journey from Rwanda to Graduate School in America',
    excerpt:
      'From growing up in Rwanda to studying in India and now pursuing a Master\'s in Computer Science in Washington, DC — how an international path shaped my approach to building software.',
    date: 'Jun 10, 2026',
    readTime: '8 min read',
    tags: ['Career', 'International', 'Personal'],
    featured: true,
    content: `
## Rwanda: where it started

I grew up in Rwanda with a passion for technology and problem solving. Unlike many students who build projects for grades, I wanted to build software that **real people use**.

That drive led me to create Ibyapa.com while still an undergraduate — a platform that now serves 76,000+ users in Rwanda.

## India: learning to engineer

In 2020, I moved to India to pursue a Bachelor's in Computer Engineering at Marwadi University. Living and studying across cultures taught me adaptability — and reinforced that good engineering is universal, but context matters.

I graduated in April 2024, but the most valuable experience wasn't in the classroom. It was maintaining a live production system across time zones while completing coursework.

## United States: research and growth

In 2025, I began my Master's in Computer Science at The Catholic University of America in Washington, DC. As a research assistant, I designed automated benchmarking frameworks to compare open-source language models on resource-constrained edge devices.

This combined my interests in software systems, cloud infrastructure, and artificial intelligence.

## What the journey taught me

**Building for emerging markets** requires different priorities than Silicon Valley defaults. Uptime, payment reliability, and lean infrastructure matter more than the latest framework.

**International experience** isn't a checkbox — it's a perspective. I've debugged production servers in Kigali, deployed containers in DC, and studied theory in Rajkot. Each context made me a better engineer.

## What's next

I'm seeking software engineering opportunities where I can bring production ownership, systems thinking, and an international perspective to teams building real products.
    `.trim(),
  },
  {
    id: 'production-infrastructure',
    slug: 'lessons-production-infrastructure',
    title: 'Lessons Learned Running Production Infrastructure',
    excerpt:
      'Practical lessons from operating Linux servers, NGINX, and Node.js APIs in production — the things textbooks don\'t cover about keeping systems alive.',
    date: 'Jun 5, 2026',
    readTime: '12 min read',
    tags: ['DevOps', 'Linux', 'Production'],
    featured: true,
    content: `
## Infrastructure isn't glamorous — until it breaks

Running production infrastructure on a Linux VPS taught me more about software engineering than any course. Here's what actually mattered.

## Logs are your best monitoring tool

Before spending money on APM tools, I invested in **structured logging** on critical API paths:

- Payment initiation and completion
- Authentication and session creation
- Exam session start and submission

When something broke at 2 AM, the logs told the story. Not dashboards — logs.

## NGINX configuration matters

A misconfigured reverse proxy can take down your entire API layer. Key lessons:

- Always test SSL termination separately from application logic
- Set appropriate timeout values for long-running payment requests
- Use upstream health checks before routing traffic to new deployments

## Deployment discipline

On a live platform with active users, I adopted:

1. **Backup before deploy** — database snapshots before any schema change
2. **Health check after deploy** — verify critical endpoints before announcing success
3. **Rollback plan** — know exactly how to revert before pushing

## Payment infrastructure is different

Payment flows need **idempotency**. If a client retries a request, the server must not double-charge. I learned this after a gateway timeout left transactions in inconsistent states.

The fix: idempotent payment endpoints with reconciliation jobs that catch orphaned transactions.

## Security on a budget

Not every startup needs enterprise security tooling. Practical steps that worked:

- Cloudflare for DDoS protection and SSL
- WireGuard VPN for secure server administration
- Fail2ban on SSH endpoints
- Regular security updates on the Linux base image

## The meta-lesson

Production infrastructure is a skill you build by operating real systems — not by reading about them. Every outage, every failed deployment, and every 2 AM debugging session made the next one easier to handle.
    `.trim(),
  },
  {
    id: 'benchmarking-llms',
    slug: 'benchmarking-small-language-models',
    title: 'Benchmarking Small Language Models on Edge Devices',
    excerpt:
      'How I designed automated benchmarking frameworks to compare open-source LLMs on resource-constrained Raspberry Pi hardware — and what the results revealed.',
    date: 'May 28, 2026',
    readTime: '9 min read',
    tags: ['AI', 'Edge Computing', 'Research'],
    featured: true,
    content: `
## The problem

Large language models dominate headlines, but many real-world applications run on **resource-constrained devices** — edge servers, IoT gateways, and single-board computers like the Raspberry Pi.

My research question: how do open-source small language models actually perform on this hardware?

## The benchmarking framework

I designed an automated pipeline that:

1. **Containerizes** each model in a reproducible Docker environment
2. **Runs standardized prompts** across consistent input sets
3. **Measures** inference latency, memory usage, and output quality
4. **Logs results** in a structured format for cross-model comparison

## Architecture

\`\`\`
Researcher → WireGuard VPN → Docker Compose → FastAPI → Model Runtime → Raspberry Pi (ARM64)
\`\`\`

Security mattered: models run behind a VPN with no public internet exposure. Reproducibility mattered more: every experiment uses the same container image and environment variables.

## Key findings

- **Memory is the bottleneck** — model loading often fails before inference even starts on 4GB devices
- **Quantization helps significantly** — smaller precision models trade quality for feasibility
- **Container overhead is worth it** — reproducibility across experiments outweighs the memory cost
- **Not all "small" models are equal** — parameter count doesn't predict edge performance

## What this means for practitioners

Edge AI isn't about running GPT-4 on a Raspberry Pi. It's about choosing the right model for the hardware constraint, measuring honestly, and designing systems that degrade gracefully when resources run out.

## Tools and stack

- Docker & Docker Compose for orchestration
- Python & FastAPI for the serving layer
- TensorFlow for inference
- WireGuard for secure remote access
- Structured JSON logs for experiment tracking
    `.trim(),
  },
];

export const getBlogBySlug = (slug) => blogPosts.find((p) => p.slug === slug) || null;
export default blogPosts;

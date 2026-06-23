const blogPosts = [
  {
    id: 'platform-76k-users',
    slug: 'building-platform-76000-users',
    title: 'Building a Platform Used by 76,000 Users',
    excerpt:
      'What I learned building Ibyapa.com, a driving theory platform that grew to 76,000+ users with real payments, real outages, and real responsibility when things went wrong.',
    date: 'Jun 15, 2026',
    readTime: '10 min read',
    tags: ['Production Systems', 'Ibyapa', 'Entrepreneurship'],
    featured: true,
    content: `
## Why I built it

I did not start Ibyapa.com for a class project. People in Rwanda needed a reliable way to prepare for driving theory exams, and most options were unstable or hard to use during busy periods.

Today the platform has **76,000+ registered users** and has processed **40,000+ transactions**, over **22 million RWF** in payments.

## What running it actually involves

As the main developer, I handle:

- **Frontend and backend**: React on the client, Node.js/Express APIs, MongoDB for data
- **Payments**: integration, retries, and cleanup when a transaction fails halfway
- **Servers**: Linux VPS, NGINX, Cloudflare, deployments
- **Day-to-day fixes**: reading logs, debugging live issues, keeping the site up

That last part is not glamorous. It means checking error logs when something breaks and shipping a fix before too many users notice.

## How the system is set up

The stack is simple on purpose:

\`\`\`
Users -> Cloudflare -> NGINX -> Node.js API -> MongoDB + Redis
\`\`\`

Cloudflare handles CDN and basic protection. NGINX terminates SSL and routes traffic. Redis helps with sessions when traffic spikes during exam prep. MongoDB stores users, exam progress, and payment records.

The best early decision was adding **clear logs on critical paths** before spending money on fancy monitoring tools.

## Problems I did not expect

1. **Failed payments**: the gateway would time out and leave transactions half-done. I added idempotent endpoints and a way to reconcile orphaned payments.
2. **Traffic spikes**: registration periods brought heavy concurrent use. Caching sessions and tightening slow queries helped.
3. **Deploying with users online**: pushing code while people were mid-exam meant I needed health checks and a clear rollback plan.

## What I would do differently

I would set up a proper staging environment earlier. Debugging production-only issues while real users are paying is stressful in a way no tutorial prepares you for.

## The main takeaway

76,000 users teach you things you cannot learn from a side project. Uptime matters. Payments need extra care. And when you run the system, you are on the hook when it breaks.
    `.trim(),
  },
  {
    id: 'rwanda-to-america',
    slug: 'journey-rwanda-to-graduate-school',
    title: 'My Journey from Rwanda to Graduate School in America',
    excerpt:
      'From Rwanda to India for undergrad, and now a Master\'s in Computer Science in Washington, DC. How moving countries changed the way I build software.',
    date: 'Jun 10, 2026',
    readTime: '8 min read',
    tags: ['Career', 'International', 'Personal'],
    featured: true,
    content: `
## Rwanda

I grew up in Rwanda and got into computers early. I was less interested in homework demos and more interested in software people would actually open and use.

That mindset led me to build Ibyapa.com while I was still an undergraduate. It now serves 76,000+ users back home.

## India

In 2020 I moved to India for a Bachelor's in Computer Engineering at Marwadi University. Living in a new country forces you to adapt quickly. It also showed me that good engineering principles hold up everywhere, but the constraints change.

I finished in April 2024. The most useful experience was not a single course. It was keeping a live production system running across time zones while still in school.

## United States

In 2025 I started my Master's in Computer Science at The Catholic University of America in Washington, DC. I also work as a research assistant, building tools to compare open-source language models on hardware with tight memory and CPU limits.

That work sits close to what I already care about: software systems, servers, and AI that has to run in real conditions, not just on a powerful laptop.

## What the moves taught me

Building for Rwanda taught me that uptime and payment reliability matter more than chasing the latest framework.

Working in three countries is not a resume trick. It is just context. I have debugged servers in Kigali, deployed containers in DC, and studied in Rajkot. Each place added something.

## What is next

I am looking for software engineering roles where I can keep building real products and learning on the job.
    `.trim(),
  },
  {
    id: 'production-infrastructure',
    slug: 'lessons-production-infrastructure',
    title: 'Lessons Learned Running Production Infrastructure',
    excerpt:
      'Plain notes from running Linux servers, NGINX, and Node.js APIs in production. The stuff textbooks skip.',
    date: 'Jun 5, 2026',
    readTime: '12 min read',
    tags: ['DevOps', 'Linux', 'Production'],
    featured: true,
    content: `
## It is boring until it breaks

Running a Linux VPS in production taught me more than most courses. A few things that actually helped:

## Logs first

Before buying APM tools, I added **structured logs** on the paths that mattered:

- Payment start and finish
- Login and session creation
- Exam session start and submit

When something failed at 2 AM, the answer was usually in the logs, not a dashboard.

## NGINX matters

A bad reverse proxy config can take down your whole API. A few lessons:

- Test SSL termination separately from app logic
- Set timeouts that match slow payment requests
- Check upstream health before sending traffic to a new deploy

## How I deploy

On a live site with active users I got into a simple routine:

1. **Backup first** before any schema change
2. **Health check after deploy** on the endpoints that matter
3. **Know the rollback** before you push

## Payments are different

If a client retries a request, the server must not charge twice. I learned that after gateway timeouts left payments in a messy state.

The fix was idempotent payment endpoints plus a small reconciliation job for stuck transactions.

## Security on a small budget

You do not need enterprise tooling on day one. What helped:

- Cloudflare for basic protection and SSL
- WireGuard VPN for admin access to servers
- fail2ban on SSH
- Regular security updates on the base Linux image

## Bottom line

You learn infrastructure by running real systems, breaking them, and fixing them. Each outage made the next one a little less scary.
    `.trim(),
  },
  {
    id: 'benchmarking-llms',
    slug: 'benchmarking-small-language-models',
    title: 'Benchmarking Small Language Models on Edge Devices',
    excerpt:
      'How I built a simple framework to compare open-source LLMs on a Raspberry Pi, and what I found.',
    date: 'May 28, 2026',
    readTime: '9 min read',
    tags: ['AI', 'Edge Computing', 'Research'],
    featured: true,
    content: `
## The question

Big models get the headlines, but plenty of real work runs on **small devices**: edge boxes, IoT gateways, Raspberry Pi boards.

I wanted to know how open-source small language models actually perform on that kind of hardware.

## What I built

A small automated pipeline that:

1. **Packages** each model in Docker so runs are repeatable
2. **Runs the same prompts** across models
3. **Measures** latency, memory use, and output quality
4. **Saves results** in a consistent format for comparison

## Setup

\`\`\`
Researcher -> WireGuard VPN -> Docker Compose -> FastAPI -> Model -> Raspberry Pi (ARM64)
\`\`\`

Models sit behind a VPN with no public exposure. Every run uses the same container image and env vars so results are comparable.

## What stood out

- **Memory is usually the limit**. Models often fail at load time on 4GB boards before inference even starts.
- **Quantization helps a lot**. Smaller precision trades some quality for something that actually fits.
- **Containers are worth the overhead** when you need someone else to reproduce your numbers.
- **Parameter count is not enough** to predict edge performance.

## What that means in practice

Edge AI is not about running the biggest model you can find. It is about picking something that fits the hardware, measuring honestly, and designing for failure when resources run out.

## Tools I used

Docker and Docker Compose, Python and FastAPI, TensorFlow for inference, WireGuard for access, and JSON logs to track experiments.
    `.trim(),
  },
];

export const getBlogBySlug = (slug) => blogPosts.find((p) => p.slug === slug) || null;
export default blogPosts;

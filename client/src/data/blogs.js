const blogPosts = [
  {
    id: 'post-quantum-2029',
    slug: 'keeping-up-with-the-2029-quantum-deadline',
    title: 'Keeping Up with the 2029 Quantum Deadline',
    excerpt:
      'Google moved its post-quantum cryptography timeline to 2029. Here is what that means for people who ship production systems, not just read security papers.',
    date: 'Jul 22, 2026',
    readTime: '8 min read',
    tags: ['Security', 'Cryptography', 'Infrastructure'],
    featured: true,
    published: true,
    content: `
## A faster shift than expected

As software engineers, we are used to moving targets. Frameworks change, dependencies update, and the "right" architecture keeps shifting. Every so often the change sits lower than the app layer.

That is what is happening with internet encryption.

Google recently said it is accelerating the move of its global infrastructure to Post-Quantum Cryptography (PQC) by 2029. When a company that size pulls a security timeline forward by years, it is worth paying attention even if you are not writing crypto libraries yourself.

## Why the timeline moved

For a long time, quantum computers breaking RSA and ECC felt like a 2030s or 2040s problem. Two things changed that:

- **Harvest now, decrypt later.** Attackers do not need a quantum computer today. They can store encrypted traffic now and decrypt it later. Data protected with older standards can already be treated as future-vulnerable.
- **Better estimates of the work.** Recent research suggests some classical algorithms may fall with fewer qubits than older models assumed. The "safe later" window got shorter.

## What is already shipping

This is not only whitepapers. Google, Cloudflare, and others are putting lattice-based cryptography into real systems - especially ML-KEM (formerly Kyber) and ML-DSA.

You will see it in browser handshakes, cloud key management, and hardware roots of trust. Packet sizes change. Handshake cost changes. Hardware utilization changes. That is live engineering, not a future slide deck.

If you already put Cloudflare in front of a Node.js API the way I do for production work, you will feel some of this through TLS and edge defaults before you rewrite application crypto yourself.

## Crypto-agility matters more than one algorithm

The practical lesson is not "memorize every PQC acronym." It is design for crypto-agility.

Swapping encryption is rarely a one-line bump in \`package.json\`. Hardcoded algorithms, old database encryption paths, and third-party APIs do not move on the same schedule. If the crypto choice is welded into business logic, the upgrade becomes a multi-year rewrite instead of a controlled cutover.

When I design systems now, I try to assume the cryptographic primitives underneath will need to change without rewriting the product around them. Keep the crypto behind clear boundaries. Prefer libraries and platforms that can rotate algorithms. Treat long-lived encrypted data as a special case, because HNDL makes retention decisions a security decision too.

## What I am watching next

I am not pretending to be a cryptographer. I am a developer who keeps production systems online and wants those systems to age honestly.

The 2029 date is Google's. The need to leave room for stronger cryptography is shared by anyone storing user data, payments, or sessions that should still be private years from now.
    `.trim(),
  },
  {
    id: 'platform-80k-users',
    slug: 'building-platform-80000-users',
    title: 'Building a Platform Used by 80,000 Users',
    excerpt:
      'Ibyapa.com started as a practical need in Rwanda. Years later it has 80,000+ users, and I am still the person who gets the call when something breaks.',
    date: 'Jun 15, 2026',
    readTime: '10 min read',
    tags: ['Production Systems', 'Ibyapa', 'Entrepreneurship'],
    featured: true,
    content: `
## How it started

I built Ibyapa.com because people around me needed a steadier way to prepare for driving theory exams. A lot of what existed then felt slow, unreliable, or hard to use when traffic went up. I did not treat it like a portfolio piece. I treated it like something people would depend on.

It still runs. There are more than 80,000 registered users, and most weeks I am still the one watching logs, patching payment issues, and shipping fixes.

## What my job actually looks like

On paper the stack is familiar: React on the front, Node.js and Express for APIs, MongoDB for data. In practice the work is messier.

Payments fail halfway. Sessions pile up during busy exam weeks. A deploy that looked fine on my machine can make a slow endpoint worse for everyone. When that happens, I am usually the person digging through logs and deciding whether to roll back or patch forward.

I also run the servers: Linux VPS boxes, NGINX, Cloudflare, Redis when sessions get heavy. None of that is exotic. It just has to keep working while people are studying late at night.

## The setup I settled on

I kept the path short on purpose:

\`\`\`
Users -> Cloudflare -> NGINX -> Node.js API -> MongoDB + Redis
\`\`\`

Cloudflare sits in front. NGINX handles SSL and routing. Redis absorbs session pressure when registrations spike. MongoDB holds accounts, exam progress, and payment records.

One early habit saved me a lot of guessing: logging the important moments clearly - payment start and finish, login, exam start and submit. Before I had nice dashboards, those logs were how I found out what actually broke.

## The failures that stuck with me

Payment timeouts were the worst. The gateway would hang, the client would retry, and I would end up with half-finished transactions. I had to make payment endpoints safe to retry and add a small reconciliation path for the ones that got stuck.

Traffic spikes were less dramatic but just as real. When lots of people registered at once, the slow queries showed up fast. Caching sessions and cleaning up the worst queries helped more than rewriting the whole app.

Deployments also got harder once the site had active exams. I stopped pushing casually. Backup first if the schema changes. Hit the health checks after release. Know the rollback before you need it.

## If I started again

I would set up a proper staging environment earlier. Fixing production-only bugs while people are paying is a particular kind of stress. You learn from it, but I would rather learn some of those lessons off to the side.

## Still running it

The number I care about is not "80,000 users" as a headline. It is that those people expect the site to open when they sit down to study. That changes how you write code. You get careful about payments, careful about deploys, and honest about how little sleep a broken production night can cost.
    `.trim(),
  },
  {
    id: 'rwanda-to-america',
    slug: 'journey-rwanda-to-graduate-school',
    title: 'My Journey from Rwanda to Graduate School in America',
    excerpt:
      'Rwanda, then India for undergrad, now a Master\'s in Computer Science in Washington, DC. A short account of how I got here and what stayed the same.',
    date: 'Jun 10, 2026',
    readTime: '8 min read',
    tags: ['Career', 'International', 'Personal'],
    featured: false,
    content: `
## Rwanda

I grew up in Rwanda. Computers caught me early, mostly because I liked making things people would open again the next day. School projects that disappeared after grading never felt as interesting as something someone might actually use.

That is how Ibyapa.com started. I was still an undergrad when I began building it. It now serves tens of thousands of learners back home, and I still help keep it online.

What the About page cannot fit is the texture of that work: answering a message from a learner who could not pay, watching a payment gateway hang on a busy night, deciding whether to roll back a deploy at midnight. Those moments shaped how I write software more than any single course did.

## India

In 2020 I moved to India for a Bachelor's in Computer Engineering at Marwadi University. New country, new routines, a lot of figuring things out as I went. I finished in April 2024.

The courses mattered, but so did the quieter work: keeping a live product running while I was in class, sometimes across awkward time zones. Some weeks I studied during the day and patched production at night. That made the degree feel connected to something outside campus.

## United States

In 2025 I began a Master's in Computer Science at The Catholic University of America in Washington, DC. I also work as a research assistant on tools for comparing open-source language models on hardware with tight memory and CPU limits - Raspberry Pi boards and similar machines.

That research sits close to what I already care about. I like systems that have to fit real limits, not just demos on a strong laptop.

## What stayed with me

Moving did not rewrite my personality. It mostly changed the scenery around the same habits: ship something useful, keep it working, and learn from the parts that fail.

I have fixed servers while thinking about Kigali users, studied in Rajkot, and now work in DC. The places are different. The preference for software that has to survive contact with real people is not.

## Looking ahead

I am looking for software engineering roles where I can keep building products that matter in production, and keep getting better at the systems work around them.
    `.trim(),
  },
  {
    id: 'production-infrastructure',
    slug: 'lessons-production-infrastructure',
    title: 'Lessons Learned Running Production Infrastructure',
    excerpt:
      'Notes from keeping Linux servers, NGINX, and Node.js APIs alive for a real product. Mostly unglamorous, occasionally stressful.',
    date: 'Jun 5, 2026',
    readTime: '12 min read',
    tags: ['DevOps', 'Linux', 'Production'],
    featured: true,
    content: `
## Quiet until it is not

Most days, production infrastructure is boring. That is good. The interesting nights are the ones where something fails and you need a clear trail of what happened.

Running a Linux VPS for a live product taught me more than a lot of tidy lab setups ever did. Here is what I keep coming back to.

## Logs before fancy tools

I started with structured logs on the paths that hurt when they break:

- Payment start and finish
- Login and session creation
- Exam session start and submit

When something failed late at night, I usually found the answer in those lines, not in a polished dashboard I had not bought yet.

## NGINX can save you or sink you

A reverse proxy mistake can make a healthy app look dead. A few habits helped:

- Test SSL termination on its own before blaming the API
- Give slow payment requests timeouts that match reality
- Check upstream health before sending traffic to a new release

None of that is clever. It just stops you from guessing under pressure.

## A deploy routine that calmed me down

Once the site had active users, I stopped improvising releases. The sequence got short and repeatable:

1. Backup before schema changes
2. Deploy
3. Hit the health checks that matter
4. Keep a rollback ready before you need it

Knowing the rollback ahead of time sounds obvious. It feels different when people are mid-exam.

## Payments need extra caution

If a client retries after a timeout, the server should not charge twice. I learned that the hard way after gateway hangs left messy half-states.

Idempotent payment endpoints and a small reconciliation job for stuck transactions made those nights shorter.

## Security without a huge budget

I did not start with enterprise tooling. What helped early on:

- Cloudflare for basic protection and SSL
- WireGuard for admin access instead of leaving services open
- fail2ban on SSH
- Regular updates on the base Linux image

Enough to raise the floor while I kept shipping product work.

## After enough outages

You get less dramatic about failures and more practical. Check the logs. Narrow the blast radius. Fix the root cause when you can. Each rough night made the next one a little more familiar, which is about as close to comfort as production gets.
    `.trim(),
  },
  {
    id: 'benchmarking-llms',
    slug: 'benchmarking-small-language-models',
    title: 'Benchmarking Small Language Models on Edge Devices',
    excerpt:
      'I needed a fair way to compare small open-source models on a Raspberry Pi. Here is the setup I used and what actually limited performance.',
    date: 'May 28, 2026',
    readTime: '9 min read',
    tags: ['AI', 'Edge Computing', 'Research'],
    featured: true,
    content: `
## Why bother

Large models get most of the attention. A lot of useful work still has to live on smaller machines: edge boxes, gateways, Raspberry Pi boards with limited RAM.

I wanted numbers I could trust for open-source small language models on that kind of hardware - not vibes from a laptop with plenty of headroom.

## The small pipeline

I put together a simple automated path:

1. Package each model in Docker so the environment stays the same
2. Run the same prompts across models
3. Record latency, memory use, and a rough read on output quality
4. Save results in one format so comparisons do not turn into a spreadsheet mess

## How the pieces connect

\`\`\`
Researcher -> WireGuard VPN -> Docker Compose -> FastAPI -> Model -> Raspberry Pi (ARM64)
\`\`\`

Access goes through a VPN. Nothing needs to sit on the public internet. Each run uses the same image and environment variables, which makes the comparisons less unfair.

## What I kept noticing

Memory usually failed first. On 4GB boards, some models never got past load time. Inference never even started.

Quantization helped more than almost anything else. Smaller precision costs some quality, but it is often the difference between "runs" and "does not fit."

Containers added a little overhead, and they were still worth it. When someone else needs to repeat your numbers, a shared image beats a long README of machine-specific steps.

Parameter count alone did not predict edge performance well. Two models that look similar on paper can behave very differently once RAM and CPU are tight.

## How I think about edge AI now

I stopped asking which model is biggest. The useful question is which one fits the board, stays stable under the workload, and fails in a way you can detect.

## Tools in the mix

Docker and Docker Compose, Python and FastAPI, TensorFlow for inference, WireGuard for access, and JSON logs so experiment history does not live only in my head.
    `.trim(),
  },
];

export const getBlogBySlug = (slug) => blogPosts.find((p) => p.slug === slug) || null;
export default blogPosts;

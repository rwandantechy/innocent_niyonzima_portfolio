import React, { useEffect, useState } from 'react';
import { FaGithub, FaCodeBranch, FaStar, FaBook } from 'react-icons/fa';
import { SOCIAL } from '../config/env';

const GITHUB_USER = (() => {
  try {
    const url = SOCIAL.GITHUB || '';
    const match = url.match(/github\.com\/([^/]+)/);
    return match?.[1] || 'Rwandantechy';
  } catch {
    return 'Rwandantechy';
  }
})();

const SHORT_SHA = (sha) => (sha ? sha.slice(0, 7) : '');

const eventLabel = (event) => {
  const fullRepo = event.repo?.name || 'repo';
  const repo = fullRepo.replace(`${GITHUB_USER}/`, '');

  switch (event.type) {
    case 'PushEvent': {
      const commits = event.payload?.commits || [];
      const first = commits[0];
      const message = first?.message?.split('\n')[0]?.trim();
      if (message) return `${repo}: ${message}`;
      if (commits.length > 1) return `Pushed ${commits.length} commits to ${repo}`;
      return `Pushed to ${repo}${first?.sha ? ` (${SHORT_SHA(first.sha)})` : ''}`;
    }
    case 'CreateEvent':
      return `Created ${event.payload?.ref_type || 'resource'} in ${repo}`;
    case 'WatchEvent':
      return `Starred ${repo}`;
    case 'ForkEvent':
      return `Forked ${repo}`;
    case 'IssuesEvent':
      return `Issue ${event.payload?.action || 'update'} in ${repo}`;
    case 'PullRequestEvent': {
      const action = event.payload?.action || 'updated';
      const title = event.payload?.pull_request?.title;
      return title ? `PR ${action}: ${title}` : `PR ${action} in ${repo}`;
    }
    default:
      return `${event.type.replace(/Event$/, '')} in ${repo}`;
  }
};

function pickDistinctEvents(events, limit = 5) {
  const seen = new Set();
  const picked = [];

  for (const event of events) {
    const label = eventLabel(event);
    if (seen.has(label)) continue;
    seen.add(label);
    picked.push({ ...event, _label: label });
    if (picked.length >= limit) break;
  }

  return picked;
}

const FALLBACK_HIGHLIGHTS = [
  { id: 'h1', _label: 'Portfolio: production SPA deploys and case studies' },
  { id: 'h2', _label: 'Ibyapa.com: ongoing backend and infrastructure ownership' },
  { id: 'h3', _label: 'Edge AI: containerized LLM benchmarking on Raspberry Pi' },
];

export default function GitHubActivity() {
  const [profile, setProfile] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [profileRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`),
          fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=30`),
        ]);
        if (!cancelled && profileRes.ok) {
          setProfile(await profileRes.json());
        }
        if (!cancelled && eventsRes.ok) {
          const data = await eventsRes.json();
          const list = Array.isArray(data) ? data : [];
          setEvents(pickDistinctEvents(list, 5));
        }
      } catch {
        // GitHub API may rate-limit; section degrades gracefully
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const feed = events.length > 0 ? events : (!loading ? FALLBACK_HIGHLIGHTS : []);

  return (
    <section className="github-activity card">
      <div className="section-header">
        <FaGithub className="section-icon" />
        <h3>GitHub Activity</h3>
      </div>

      {loading && <p className="muted">Loading GitHub profile...</p>}

      {!loading && profile && (
        <div className="github-stats">
          <div className="github-stat">
            <FaBook />
            <span><strong>{profile.public_repos}</strong> repos</span>
          </div>
          <div className="github-stat">
            <FaCodeBranch />
            <span><strong>{profile.followers}</strong> followers</span>
          </div>
          {profile.bio && <p className="muted github-bio">{profile.bio}</p>}
        </div>
      )}

      {feed.length > 0 && (
        <ul className="github-events">
          {feed.map((event) => (
            <li key={event.id}>
              <FaStar className="github-event-icon" />
              <span>{event._label || eventLabel(event)}</span>
            </li>
          ))}
        </ul>
      )}

      <a
        href={SOCIAL.GITHUB}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-secondary github-profile-link"
      >
        <FaGithub style={{ marginRight: 8 }} />
        View GitHub Profile
      </a>
    </section>
  );
}

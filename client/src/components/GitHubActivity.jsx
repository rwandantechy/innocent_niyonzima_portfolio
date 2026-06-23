import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaCodeBranch, FaStar, FaBook } from 'react-icons/fa';
import { SOCIAL } from '../config/env';

const GITHUB_USER = (() => {
  try {
    const url = SOCIAL.GITHUB || '';
    const match = url.match(/github\.com\/([^/]+)/);
    return match?.[1] || 'Innocentus8';
  } catch {
    return 'Innocentus8';
  }
})();

const eventLabel = (event) => {
  const repo = event.repo?.name?.replace(`${GITHUB_USER}/`, '') || 'repo';
  switch (event.type) {
    case 'PushEvent':
      return `Pushed to ${repo}`;
    case 'CreateEvent':
      return `Created ${event.payload?.ref_type || 'resource'} in ${repo}`;
    case 'WatchEvent':
      return `Starred ${repo}`;
    case 'ForkEvent':
      return `Forked ${repo}`;
    case 'IssuesEvent':
      return `Issue activity in ${repo}`;
    case 'PullRequestEvent':
      return `PR activity in ${repo}`;
    default:
      return `Activity in ${repo}`;
  }
};

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
          fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=5`),
        ]);
        if (!cancelled && profileRes.ok) {
          setProfile(await profileRes.json());
        }
        if (!cancelled && eventsRes.ok) {
          const data = await eventsRes.json();
          setEvents(Array.isArray(data) ? data.slice(0, 5) : []);
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

      {events.length > 0 && (
        <ul className="github-events">
          {events.map((event) => (
            <motion.li
              key={`${event.id}-${event.type}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <FaStar className="github-event-icon" />
              <span>{eventLabel(event)}</span>
            </motion.li>
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

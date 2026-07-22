import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppProvider';
import { API_URL } from '../../config/env';
import {
  FaFolderOpen,
  FaBlog,
  FaTools,
  FaSyncAlt,
  FaBriefcase,
  FaExclamationTriangle,
  FaCheckCircle,
  FaPlus,
  FaArrowRight,
  FaServer,
  FaEye,
  FaPen,
} from 'react-icons/fa';

function splitCounts(items = []) {
  const published = items.filter((item) => item.published).length;
  return {
    total: items.length,
    published,
    drafts: items.length - published,
    featured: items.filter((item) => item.featured).length,
  };
}

function percent(part, whole) {
  if (!whole) return 0;
  return Math.round((part / whole) * 100);
}

function CollectionCard({ title, to, icon: Icon, total, published, drafts }) {
  return (
    <Link to={to} className="dash-stat">
      <div className="dash-stat-top">
        <span className="dash-stat-label">{title}</span>
        <Icon className="dash-stat-icon" />
      </div>
      <div className="dash-stat-value">{total}</div>
      <div className="dash-stat-meta">
        <span className={`dash-dot ${published > 0 ? 'is-live' : 'is-muted'}`} />
        {total === 0 ? 'Empty' : `${published} live · ${drafts} draft${drafts === 1 ? '' : 's'}`}
      </div>
      <span className="dash-stat-go">
        Open <FaArrowRight />
      </span>
    </Link>
  );
}

export default function AdminDashboard() {
  const {
    adminProjects = [],
    adminBlogs = [],
    adminSkills = [],
    adminExperience = [],
    refreshData,
    fetchAdminContent,
  } = useApp();

  const [msg, setMsg] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiOk, setApiOk] = useState(null);
  const [refreshedAt, setRefreshedAt] = useState(null);

  const load = async () => {
    const healthUrl = `${API_URL || ''}/api/health`;
    try {
      const healthRes = await fetch(healthUrl, { method: 'GET' });
      setApiOk(healthRes.ok);
    } catch {
      setApiOk(false);
    }
    await fetchAdminContent?.();
    setRefreshedAt(new Date());
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        await load();
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const projects = adminProjects;
  const blogs = adminBlogs;
  const skills = adminSkills;
  const experience = adminExperience;

  const counts = useMemo(
    () => ({
      projects: splitCounts(projects),
      blogs: splitCounts(blogs),
      skills: splitCounts(skills),
      experience: splitCounts(experience),
    }),
    [projects, blogs, skills, experience]
  );

  const totalItems =
    counts.projects.total + counts.blogs.total + counts.skills.total + counts.experience.total;

  const publishedItems =
    counts.projects.published +
    counts.blogs.published +
    counts.skills.published +
    counts.experience.published;

  const publishReady = percent(publishedItems, totalItems);

  const healthItems = useMemo(() => {
    const items = [];

    projects.forEach((p) => {
      if (!p.published) return;
      if (!p.tech?.length) {
        items.push({ text: `"${p.title}" missing tech stack`, to: '/admin/projects' });
      }
      if (!p.description) {
        items.push({ text: `"${p.title}" missing description`, to: '/admin/projects' });
      }
    });

    blogs.forEach((b) => {
      if (!b.published) return;
      if (!b.tags?.length) {
        items.push({ text: `"${b.title}" has no tags`, to: '/admin/blogs' });
      }
    });

    experience.forEach((e) => {
      if (!e.published) return;
      if (!e.bullets?.length) {
        items.push({ text: `"${e.role}" has no bullets`, to: '/admin/experience' });
      }
    });

    skills.forEach((s) => {
      if (!s.published) return;
      if (!s.skills?.length) {
        items.push({ text: `"${s.title}" has no skills`, to: '/admin/skills' });
      }
    });

    return items;
  }, [projects, blogs, experience, skills]);

  const recentItems = useMemo(() => {
    const list = [
      ...projects.slice(0, 2).map((p) => ({
        id: `p-${p.id}`,
        kind: 'Project',
        title: p.title,
        status: p.published ? 'Live' : 'Draft',
        to: '/admin/projects',
      })),
      ...blogs.slice(0, 2).map((b) => ({
        id: `b-${b.id}`,
        kind: 'Blog',
        title: b.title,
        status: b.published ? 'Live' : 'Draft',
        to: '/admin/blogs',
      })),
      ...experience.slice(0, 2).map((e) => ({
        id: `e-${e.id}`,
        kind: 'Role',
        title: e.role,
        status: e.published ? 'Live' : 'Draft',
        to: '/admin/experience',
      })),
    ];
    return list.slice(0, 6);
  }, [projects, blogs, experience]);

  const refreshContent = async () => {
    setIsRefreshing(true);
    try {
      await refreshData();
      await load();
      setMsg('Synced with latest content');
    } finally {
      setIsRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="dash-loading">
        <div className="dash-loading-pulse" />
        <p>Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="dash">
      <header className="dash-toolbar">
        <div className={`dash-api ${apiOk ? 'is-up' : 'is-down'}`}>
          <FaServer />
          <span>{apiOk ? 'API online' : 'API offline · fallbacks'}</span>
        </div>
        <div className="dash-toolbar-right">
          {refreshedAt && (
            <span className="dash-updated">
              Updated {refreshedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <button
            type="button"
            className="dash-refresh"
            onClick={refreshContent}
            disabled={isRefreshing}
          >
            <FaSyncAlt className={isRefreshing ? 'is-spinning' : ''} />
            {isRefreshing ? 'Refreshing' : 'Refresh'}
          </button>
        </div>
      </header>

      {totalItems === 0 ? (
        <section className="dash-empty">
          <h3>No content yet</h3>
          <p>
            Create a project, post, or role to populate this dashboard. The public site can still use
            static fallbacks.
          </p>
          <div className="dash-empty-actions">
            <Link to="/admin/projects" className="btn">
              <FaPlus /> Add a project
            </Link>
            <Link to="/admin/blogs" className="btn btn-secondary">
              <FaPlus /> Write a post
            </Link>
          </div>
        </section>
      ) : (
        <div className="dash-grid">
          <section className="dash-summary">
            <div className="dash-ready">
              <div className="dash-ready-ring" style={{ '--ready': publishReady }}>
                <strong>{publishReady}%</strong>
              </div>
              <div>
                <h3>Publish readiness</h3>
                <p>
                  {publishedItems}/{totalItems} live
                  {healthItems.length ? ` · ${healthItems.length} warnings` : ' · no warnings'}
                </p>
              </div>
            </div>
            <nav className="dash-actions" aria-label="Quick actions">
              <Link to="/admin/projects"><FaPlus /> Project</Link>
              <Link to="/admin/blogs"><FaPen /> Post</Link>
              <Link to="/admin/experience"><FaBriefcase /> Role</Link>
              <a href="/" target="_blank" rel="noopener noreferrer"><FaEye /> Site</a>
            </nav>
          </section>

          <section className="dash-stats">
            <CollectionCard title="Projects" to="/admin/projects" icon={FaFolderOpen} {...counts.projects} />
            <CollectionCard title="Writing" to="/admin/blogs" icon={FaBlog} {...counts.blogs} />
            <CollectionCard title="Skills" to="/admin/skills" icon={FaTools} {...counts.skills} />
            <CollectionCard title="Experience" to="/admin/experience" icon={FaBriefcase} {...counts.experience} />
          </section>

          <section className="dash-side">
            <article className="dash-box">
              <div className="dash-box-head">
                <h3>Health</h3>
                <span>{healthItems.length ? `${healthItems.length}` : 'OK'}</span>
              </div>
              {healthItems.length === 0 ? (
                <div className="dash-ok">
                  <FaCheckCircle />
                  <p>Published entries look complete.</p>
                </div>
              ) : (
                <ul className="dash-warns">
                  {healthItems.slice(0, 4).map((item) => (
                    <li key={item.text}>
                      <FaExclamationTriangle />
                      <Link to={item.to}>{item.text}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </article>

            <article className="dash-box">
              <div className="dash-box-head">
                <h3>Visibility</h3>
              </div>
              <ul className="dash-metrics">
                <li>
                  <span>Featured projects</span>
                  <strong>{counts.projects.featured}/{counts.projects.total}</strong>
                </li>
                <li>
                  <span>Featured posts</span>
                  <strong>{counts.blogs.featured}/{counts.blogs.total}</strong>
                </li>
                <li>
                  <span>Experience live</span>
                  <strong>{percent(counts.experience.published, counts.experience.total)}%</strong>
                </li>
                <li>
                  <span>Skills live</span>
                  <strong>{percent(counts.skills.published, counts.skills.total)}%</strong>
                </li>
              </ul>
            </article>
          </section>

          <section className="dash-box dash-library">
            <div className="dash-box-head">
              <h3>Recent</h3>
              <span>{recentItems.length}</span>
            </div>
            <div className="dash-list">
              {recentItems.map((item) => (
                <Link key={item.id} to={item.to} className="dash-list-row">
                  <span className="dash-list-kind">{item.kind}</span>
                  <span className="dash-list-title">{item.title}</span>
                  <span className={`dash-list-status ${item.status === 'Live' ? 'is-live' : ''}`}>
                    {item.status}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}

      {msg && <div className="admin-toast muted">{msg}</div>}
    </div>
  );
}

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

function CollectionCard({ title, to, icon: Icon, total, published, drafts, accent }) {
  const ratio = percent(published, total);
  return (
    <Link to={to} className="dash-collection">
      <div className="dash-collection-top">
        <span className={`dash-collection-icon dash-collection-icon--${accent}`}>
          <Icon />
        </span>
        <FaArrowRight className="dash-collection-arrow" />
      </div>
      <div className="dash-collection-label">{title}</div>
      <div className="dash-collection-value">{total}</div>
      <div className="dash-collection-bar" aria-hidden="true">
        <span style={{ width: `${ratio}%` }} />
      </div>
      <div className="dash-collection-meta">
        <span>{published} live</span>
        <span>{drafts} draft{drafts === 1 ? '' : 's'}</span>
      </div>
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
        items.push({ level: 'warn', text: `"${p.title}" missing tech stack`, to: '/admin/projects' });
      }
      if (!p.description) {
        items.push({ level: 'warn', text: `"${p.title}" missing description`, to: '/admin/projects' });
      }
    });

    blogs.forEach((b) => {
      if (!b.published) return;
      if (!b.tags?.length) {
        items.push({ level: 'warn', text: `"${b.title}" has no tags`, to: '/admin/blogs' });
      }
    });

    experience.forEach((e) => {
      if (!e.published) return;
      if (!e.bullets?.length) {
        items.push({ level: 'warn', text: `"${e.role}" has no bullets`, to: '/admin/experience' });
      }
    });

    skills.forEach((s) => {
      if (!s.published) return;
      if (!s.skills?.length) {
        items.push({ level: 'warn', text: `"${s.title}" has no skills`, to: '/admin/skills' });
      }
    });

    return items;
  }, [projects, blogs, experience, skills]);

  const recentItems = useMemo(() => {
    const list = [
      ...projects.slice(0, 3).map((p) => ({
        id: `p-${p.id}`,
        kind: 'Project',
        title: p.title,
        status: p.published ? 'Published' : 'Draft',
        to: '/admin/projects',
      })),
      ...blogs.slice(0, 3).map((b) => ({
        id: `b-${b.id}`,
        kind: 'Blog',
        title: b.title,
        status: b.published ? 'Published' : 'Draft',
        to: '/admin/blogs',
      })),
      ...experience.slice(0, 2).map((e) => ({
        id: `e-${e.id}`,
        kind: 'Experience',
        title: e.role,
        status: e.published ? 'Published' : 'Draft',
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
        <p>Loading command center...</p>
      </div>
    );
  }

  return (
    <div className="dash">
      <header className="dash-header">
        <div>
          <p className="dash-kicker">Portfolio CMS</p>
          <h2 className="dash-heading">Publishing command center</h2>
          <p className="dash-lede">
            Track drafts, live content, and gaps before recruiters see them.
          </p>
        </div>
        <div className="dash-header-actions">
          <div className={`dash-api-pill ${apiOk ? 'is-up' : 'is-down'}`}>
            <FaServer />
            <span>{apiOk ? 'API online' : 'API offline · using fallbacks'}</span>
          </div>
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
          <div className="dash-empty-copy">
            <p className="dash-kicker">Fresh workspace</p>
            <h3>Start with one strong piece of content</h3>
            <p>
              The public site can still use static fallbacks. This admin stays empty until you create
              or sync database content.
            </p>
            <div className="dash-empty-actions">
              <Link to="/admin/projects" className="btn">
                <FaPlus /> Add a project
              </Link>
              <Link to="/admin/blogs" className="btn btn-secondary">
                <FaPlus /> Write a post
              </Link>
              <Link to="/admin/experience" className="btn btn-secondary">
                <FaPlus /> Add experience
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="dash-score-row">
            <article className="dash-score">
              <div className="dash-score-ring" style={{ '--ready': `${publishReady}` }}>
                <strong>{publishReady}%</strong>
                <span>live</span>
              </div>
              <div>
                <h3>Publish readiness</h3>
                <p>
                  {publishedItems} of {totalItems} entries are public.
                  {healthItems.length
                    ? ` ${healthItems.length} issue${healthItems.length === 1 ? '' : 's'} need attention.`
                    : ' No structural warnings on published items.'}
                </p>
              </div>
            </article>

            <div className="dash-quick">
              <Link to="/admin/projects" className="dash-quick-item">
                <FaPlus />
                <span>New project</span>
              </Link>
              <Link to="/admin/blogs" className="dash-quick-item">
                <FaPen />
                <span>New post</span>
              </Link>
              <Link to="/admin/experience" className="dash-quick-item">
                <FaBriefcase />
                <span>Edit roles</span>
              </Link>
              <a href="/" target="_blank" rel="noopener noreferrer" className="dash-quick-item">
                <FaEye />
                <span>View site</span>
              </a>
            </div>
          </section>

          <section className="dash-collections">
            <CollectionCard title="Projects" to="/admin/projects" icon={FaFolderOpen} accent="amber" {...counts.projects} />
            <CollectionCard title="Writing" to="/admin/blogs" icon={FaBlog} accent="slate" {...counts.blogs} />
            <CollectionCard title="Skills" to="/admin/skills" icon={FaTools} accent="teal" {...counts.skills} />
            <CollectionCard title="Experience" to="/admin/experience" icon={FaBriefcase} accent="ink" {...counts.experience} />
          </section>

          <section className="dash-panels">
            <article className="dash-panel">
              <div className="dash-panel-head">
                <h3>Content health</h3>
                <span className="dash-panel-badge">
                  {healthItems.length ? `${healthItems.length} warnings` : 'Clean'}
                </span>
              </div>
              {healthItems.length === 0 ? (
                <div className="dash-health-ok">
                  <FaCheckCircle />
                  <div>
                    <strong>All clear</strong>
                    <p>Published entries have the fields recruiters expect.</p>
                  </div>
                </div>
              ) : (
                <ul className="dash-health-list">
                  {healthItems.map((item) => (
                    <li key={item.text}>
                      <FaExclamationTriangle />
                      <Link to={item.to}>{item.text}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </article>

            <article className="dash-panel">
              <div className="dash-panel-head">
                <h3>Visibility</h3>
              </div>
              <div className="dash-visibility">
                <div>
                  <span>Featured projects</span>
                  <strong>
                    {counts.projects.featured}/{counts.projects.total}
                  </strong>
                  <div className="dash-mini-bar">
                    <i style={{ width: `${percent(counts.projects.featured, counts.projects.total)}%` }} />
                  </div>
                </div>
                <div>
                  <span>Featured posts</span>
                  <strong>
                    {counts.blogs.featured}/{counts.blogs.total}
                  </strong>
                  <div className="dash-mini-bar">
                    <i style={{ width: `${percent(counts.blogs.featured, counts.blogs.total)}%` }} />
                  </div>
                </div>
                <div>
                  <span>Experience live</span>
                  <strong>{percent(counts.experience.published, counts.experience.total)}%</strong>
                  <div className="dash-mini-bar">
                    <i style={{ width: `${percent(counts.experience.published, counts.experience.total)}%` }} />
                  </div>
                </div>
                <div>
                  <span>Skills live</span>
                  <strong>{percent(counts.skills.published, counts.skills.total)}%</strong>
                  <div className="dash-mini-bar">
                    <i style={{ width: `${percent(counts.skills.published, counts.skills.total)}%` }} />
                  </div>
                </div>
              </div>
            </article>

            <article className="dash-panel dash-panel--wide">
              <div className="dash-panel-head">
                <h3>Library snapshot</h3>
                {refreshedAt && (
                  <span className="dash-panel-meta">
                    Updated {refreshedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
              <div className="dash-recent">
                {recentItems.map((item) => (
                  <Link key={item.id} to={item.to} className="dash-recent-row">
                    <span className="dash-recent-kind">{item.kind}</span>
                    <span className="dash-recent-title">{item.title}</span>
                    <span className={`dash-recent-status ${item.status === 'Published' ? 'is-live' : ''}`}>
                      {item.status}
                    </span>
                  </Link>
                ))}
              </div>
            </article>
          </section>
        </>
      )}

      {msg && <div className="admin-toast muted">{msg}</div>}
    </div>
  );
}

import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppProvider';
import {
  FaFolderOpen,
  FaBlog,
  FaTools,
  FaSyncAlt,
  FaBriefcase,
  FaExclamationTriangle,
  FaCheckCircle,
  FaPlus,
} from 'react-icons/fa';

function StatCard({ title, total, published, drafts, to, icon: Icon }) {
  const tone = published > 0 ? 'ok' : drafts > 0 ? 'warn' : total === 0 ? 'empty' : 'neutral';
  return (
    <Link to={to} className={`admin-stat-card admin-stat-card--${tone}`}>
      <div className="admin-stat-card-top">
        <span className="admin-stat-card-title">{title}</span>
        <Icon className="admin-stat-card-icon" />
      </div>
      <div className="admin-stat-card-value">{total}</div>
      <div className="admin-stat-card-meta">
        <span className={`admin-status-dot admin-status-dot--${tone}`} />
        {total === 0
          ? 'No entries yet'
          : `${published} published · ${drafts} draft${drafts === 1 ? '' : 's'}`}
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

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        await fetchAdminContent?.();
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

  const counts = useMemo(() => {
    const split = (items, isPublished = (i) => i.published) => {
      const published = items.filter(isPublished).length;
      return { total: items.length, published, drafts: items.length - published };
    };
    return {
      projects: split(projects),
      blogs: split(blogs),
      skills: split(skills),
      experience: split(experience),
    };
  }, [projects, blogs, skills, experience]);

  const totalItems =
    counts.projects.total + counts.blogs.total + counts.skills.total + counts.experience.total;

  const healthItems = useMemo(() => {
    const items = [];

    projects.forEach((p) => {
      if (!p.published) return;
      if (!p.tech || p.tech.length === 0) {
        items.push({
          level: 'warn',
          text: `Project "${p.title}" is missing a tech stack`,
          to: '/admin/projects',
        });
      }
      if (!p.description) {
        items.push({
          level: 'warn',
          text: `Project "${p.title}" is missing a description`,
          to: '/admin/projects',
        });
      }
    });

    blogs.forEach((b) => {
      if (!b.published) return;
      if (!b.tags || b.tags.length === 0) {
        items.push({
          level: 'warn',
          text: `Blog "${b.title}" has no tags`,
          to: '/admin/blogs',
        });
      }
    });

    experience.forEach((e) => {
      if (!e.published) return;
      if (!e.bullets || e.bullets.length === 0) {
        items.push({
          level: 'warn',
          text: `Experience "${e.role}" has no bullets`,
          to: '/admin/experience',
        });
      }
    });

    skills.forEach((s) => {
      if (!s.published) return;
      if (!s.skills || s.skills.length === 0) {
        items.push({
          level: 'warn',
          text: `Skill category "${s.title}" has no skills`,
          to: '/admin/skills',
        });
      }
    });

    if (totalItems > 0 && items.length === 0) {
      items.push({
        level: 'ok',
        text: 'All published entries have required fields',
        to: null,
      });
    }

    return items;
  }, [projects, blogs, experience, skills, totalItems]);

  const refreshContent = async () => {
    setIsRefreshing(true);
    try {
      await refreshData();
      setMsg('Dashboard updated');
    } finally {
      setIsRefreshing(false);
    }
  };

  if (loading) {
    return <p className="muted">Loading dashboard...</p>;
  }

  return (
    <>
      <div className="admin-page-header">
        <div />
        <button
          type="button"
          className="btn-outline admin-refresh-btn"
          onClick={refreshContent}
          disabled={isRefreshing}
        >
          <FaSyncAlt />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {totalItems === 0 ? (
        <div className="card admin-card admin-empty-state">
          <h2>No content yet</h2>
          <p className="muted">
            Your database is empty (or the admin API is unreachable). Add a first entry to get started.
            Static fallbacks still keep the public site filled.
          </p>
          <div className="admin-empty-actions">
            <Link to="/admin/projects" className="btn">
              <FaPlus /> Add your first project
            </Link>
            <Link to="/admin/blogs" className="btn btn-secondary">
              <FaPlus /> Write your first post
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="admin-stats-grid admin-stats-grid--4">
            <StatCard
              title="Projects"
              to="/admin/projects"
              icon={FaFolderOpen}
              {...counts.projects}
            />
            <StatCard
              title="Blogs"
              to="/admin/blogs"
              icon={FaBlog}
              {...counts.blogs}
            />
            <StatCard
              title="Skills"
              to="/admin/skills"
              icon={FaTools}
              {...counts.skills}
            />
            <StatCard
              title="Experience"
              to="/admin/experience"
              icon={FaBriefcase}
              {...counts.experience}
            />
          </div>

          <div className="admin-grid admin-grid--spacious">
            <div className="card admin-card">
              <h3>Content health</h3>
              <ul className="admin-health-list">
                {healthItems.map((item) => (
                  <li key={item.text} className={`admin-health-item admin-health-item--${item.level}`}>
                    {item.level === 'ok' ? <FaCheckCircle /> : <FaExclamationTriangle />}
                    {item.to ? <Link to={item.to}>{item.text}</Link> : <span>{item.text}</span>}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card admin-card">
              <h3>Visibility snapshot</h3>
              <div className="admin-kpi-list">
                <div className="admin-kpi-row">
                  <span>Projects featured</span>
                  <strong>
                    {projects.filter((p) => p.featured).length} of {projects.length}
                  </strong>
                </div>
                <div className="admin-kpi-row">
                  <span>Blogs featured</span>
                  <strong>
                    {blogs.filter((b) => b.featured).length} of {blogs.length}
                  </strong>
                </div>
                <div className="admin-kpi-row">
                  <span>Experience published</span>
                  <strong>
                    {counts.experience.total === 0
                      ? '0%'
                      : `${Math.round((counts.experience.published / counts.experience.total) * 100)}%`}
                  </strong>
                </div>
                <div className="admin-kpi-row">
                  <span>Skills published</span>
                  <strong>
                    {counts.skills.total === 0
                      ? '0%'
                      : `${Math.round((counts.skills.published / counts.skills.total) * 100)}%`}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {msg && <div className="admin-toast muted">{msg}</div>}
    </>
  );
}

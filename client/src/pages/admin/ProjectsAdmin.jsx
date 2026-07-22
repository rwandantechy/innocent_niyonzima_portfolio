import React, { useEffect, useMemo, useState } from 'react';
import { FaPlus, FaTrashAlt, FaTimes } from 'react-icons/fa';
import { useApp } from '../../context/AppProvider';

function parseList(value) {
  return value
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function ProjectsAdmin() {
  const {
    adminProjects = [],
    createProject,
    deleteProject,
    fetchAdminContent,
  } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tech, setTech] = useState('');
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);
  const [filter, setFilter] = useState('all');
  const [composerOpen, setComposerOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAdminContent?.();
  }, []);

  const techPreview = useMemo(() => parseList(tech), [tech]);

  const counts = useMemo(() => {
    const publishedCount = adminProjects.filter((p) => p.published).length;
    return {
      all: adminProjects.length,
      published: publishedCount,
      drafts: adminProjects.length - publishedCount,
      featured: adminProjects.filter((p) => p.featured).length,
    };
  }, [adminProjects]);

  const visible = useMemo(() => {
    if (filter === 'published') return adminProjects.filter((p) => p.published);
    if (filter === 'drafts') return adminProjects.filter((p) => !p.published);
    if (filter === 'featured') return adminProjects.filter((p) => p.featured);
    return adminProjects;
  }, [adminProjects, filter]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTech('');
    setFeatured(false);
    setPublished(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      await createProject({
        title: title.trim(),
        description: description.trim(),
        featured,
        published,
        tech: parseList(tech),
        metrics: [],
        challenges: [],
        solutions: [],
        results: [],
        links: {},
      });
      setMsg('Project created');
      resetForm();
      setComposerOpen(false);
    } catch (err) {
      setMsg(err.message || 'Create failed');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteProject(id);
      setMsg('Project deleted');
    } catch (err) {
      setMsg(err.message || 'Delete failed');
    }
  };

  return (
    <div className="cms cms--stack">
      <div className="cms-bar">
        <div className="cms-filters" role="tablist" aria-label="Filter projects">
          {[
            { id: 'all', label: 'All', count: counts.all },
            { id: 'published', label: 'Live', count: counts.published },
            { id: 'drafts', label: 'Drafts', count: counts.drafts },
            { id: 'featured', label: 'Featured', count: counts.featured },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={filter === tab.id}
              className={`cms-filter ${filter === tab.id ? 'is-active' : ''}`}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
              <span>{tab.count}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="cms-primary-btn"
          onClick={() => setComposerOpen((open) => !open)}
        >
          {composerOpen ? <FaTimes /> : <FaPlus />}
          {composerOpen ? 'Close' : 'New project'}
        </button>
      </div>

      {composerOpen && (
        <section className="cms-panel cms-composer-panel">
          <div className="cms-panel-head">
            <div>
              <h3>New project</h3>
              <p>Title, story, and stack. Metrics can come later.</p>
            </div>
          </div>
          <form className="cms-form cms-form--grid" onSubmit={onSubmit}>
            <label className="cms-field cms-field--full">
              <span>Title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Project name"
                required
                autoFocus
              />
            </label>
            <label className="cms-field cms-field--full">
              <span>Description</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What you built, for whom, and why it mattered"
                rows={4}
                required
              />
            </label>
            <label className="cms-field">
              <span>Tech stack</span>
              <input
                value={tech}
                onChange={(e) => setTech(e.target.value)}
                placeholder="React, Node, MongoDB"
                required
              />
              {techPreview.length > 0 && (
                <div className="cms-chips">
                  {techPreview.map((item) => (
                    <span key={item} className="cms-chip">{item}</span>
                  ))}
                </div>
              )}
            </label>
            <div className="cms-toggles cms-toggles--inline">
              <label className={`cms-switch ${published ? 'is-on' : ''}`}>
                <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
                <span className="cms-switch-track" aria-hidden="true" />
                <span className="cms-switch-copy"><strong>Published</strong></span>
              </label>
              <label className={`cms-switch ${featured ? 'is-on' : ''}`}>
                <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
                <span className="cms-switch-track" aria-hidden="true" />
                <span className="cms-switch-copy"><strong>Featured</strong></span>
              </label>
            </div>
            <div className="cms-form-actions cms-field--full">
              <button type="submit" className="cms-submit" disabled={saving}>
                <FaPlus />
                {saving ? 'Saving…' : published ? 'Publish project' : 'Save draft'}
              </button>
              <button type="button" className="cms-ghost-btn" onClick={() => { resetForm(); setComposerOpen(false); }}>
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="cms-panel cms-library-panel">
        <div className="cms-panel-head">
          <div>
            <h3>Library</h3>
            <p>
              {visible.length} project{visible.length === 1 ? '' : 's'}
              {filter !== 'all' ? ` · ${filter}` : ''}
            </p>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="cms-empty">
            <strong>No projects in this view</strong>
            <p>Create one to start the portfolio library.</p>
            {!composerOpen && (
              <button type="button" className="cms-primary-btn" onClick={() => setComposerOpen(true)}>
                <FaPlus /> New project
              </button>
            )}
          </div>
        ) : (
          <div className="cms-table" role="list">
            {visible.map((project) => (
              <article key={project.id} className="cms-row" role="listitem">
                <div className="cms-row-main">
                  <div className="cms-row-badges">
                    <span className={`cms-status ${project.published ? 'is-live' : 'is-draft'}`}>
                      {project.published ? 'Live' : 'Draft'}
                    </span>
                    {project.featured && <span className="cms-status is-featured">Featured</span>}
                  </div>
                  <h4>{project.title}</h4>
                  {project.description && (
                    <p className="cms-card-excerpt">
                      {project.description.slice(0, 160)}
                      {project.description.length > 160 ? '…' : ''}
                    </p>
                  )}
                  <div className="cms-chips">
                    {(project.tech || []).slice(0, 6).map((item) => (
                      <span key={item} className="cms-chip">{item}</span>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  className="cms-icon-btn"
                  aria-label={`Delete ${project.title}`}
                  onClick={() => onDelete(project.id)}
                >
                  <FaTrashAlt />
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      {msg && <div className="admin-toast muted">{msg}</div>}
    </div>
  );
}

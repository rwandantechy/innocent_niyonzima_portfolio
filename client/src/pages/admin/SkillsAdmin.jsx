import React, { useEffect, useMemo, useState } from 'react';
import { FaPlus, FaTrashAlt, FaTimes, FaSave } from 'react-icons/fa';
import { useApp } from '../../context/AppProvider';

function parseList(value) {
  return value
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function SkillsAdmin() {
  const {
    adminSkills = [],
    createSkill,
    updateSkill,
    deleteSkill,
    fetchAdminContent,
  } = useApp();

  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [skillsText, setSkillsText] = useState('');
  const [published, setPublished] = useState(false);
  const [filter, setFilter] = useState('all');
  const [composerOpen, setComposerOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAdminContent?.();
  }, []);

  const skillPreview = useMemo(() => parseList(skillsText), [skillsText]);

  const counts = useMemo(() => {
    const publishedCount = adminSkills.filter((s) => s.published).length;
    return {
      all: adminSkills.length,
      published: publishedCount,
      drafts: adminSkills.length - publishedCount,
    };
  }, [adminSkills]);

  const visible = useMemo(() => {
    if (filter === 'published') return adminSkills.filter((s) => s.published);
    if (filter === 'drafts') return adminSkills.filter((s) => !s.published);
    return adminSkills;
  }, [adminSkills, filter]);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setSkillsText('');
    setPublished(false);
  };

  const onEdit = (category) => {
    setEditingId(category.id);
    setTitle(category.title || '');
    setSkillsText((category.skills || []).join(', '));
    setPublished(Boolean(category.published));
    setComposerOpen(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);

    const payload = {
      title: title.trim(),
      skills: parseList(skillsText),
      published,
    };

    try {
      if (editingId) {
        await updateSkill(editingId, payload);
        setMsg('Category updated');
      } else {
        await createSkill(payload);
        setMsg('Category created');
      }
      resetForm();
      setComposerOpen(false);
    } catch (err) {
      setMsg(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteSkill(id);
      setMsg('Category deleted');
      if (editingId === id) {
        resetForm();
        setComposerOpen(false);
      }
    } catch (err) {
      setMsg(err.message || 'Delete failed');
    }
  };

  return (
    <div className="cms cms--stack">
      <div className="cms-bar">
        <div className="cms-filters" role="tablist" aria-label="Filter skill categories">
          {[
            { id: 'all', label: 'All', count: counts.all },
            { id: 'published', label: 'Live', count: counts.published },
            { id: 'drafts', label: 'Drafts', count: counts.drafts },
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
          onClick={() => {
            if (composerOpen && !editingId) {
              setComposerOpen(false);
              return;
            }
            resetForm();
            setComposerOpen(true);
          }}
        >
          {composerOpen && !editingId ? <FaTimes /> : <FaPlus />}
          {composerOpen && !editingId ? 'Close' : 'New category'}
        </button>
      </div>

      {composerOpen && (
        <section className="cms-panel cms-composer-panel">
          <div className="cms-panel-head">
            <div>
              <h3>{editingId ? 'Edit category' : 'New category'}</h3>
              <p>
                {editingId
                  ? 'Update the category name, skills, and visibility.'
                  : 'One theme, several concrete skills.'}
              </p>
            </div>
          </div>
          <form className="cms-form cms-form--grid" onSubmit={onSubmit}>
            <label className="cms-field">
              <span>Category</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Backend Systems"
                required
                autoFocus
              />
            </label>
            <label className="cms-field">
              <span>Skills</span>
              <input
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                placeholder="Node.js, PostgreSQL, Redis"
                required
              />
              {skillPreview.length > 0 && (
                <div className="cms-chips">
                  {skillPreview.map((item) => (
                    <span key={item} className="cms-chip">{item}</span>
                  ))}
                </div>
              )}
            </label>
            <div className="cms-toggles cms-toggles--inline cms-field--full">
              <label className={`cms-switch ${published ? 'is-on' : ''}`}>
                <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
                <span className="cms-switch-track" aria-hidden="true" />
                <span className="cms-switch-copy"><strong>Published</strong></span>
              </label>
            </div>
            <div className="cms-form-actions cms-field--full">
              <button type="submit" className="cms-submit" disabled={saving}>
                {editingId ? <FaSave /> : <FaPlus />}
                {saving ? 'Saving…' : editingId ? 'Update category' : 'Add category'}
              </button>
              <button
                type="button"
                className="cms-ghost-btn"
                onClick={() => {
                  resetForm();
                  setComposerOpen(false);
                }}
              >
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
              {visible.length} categor{visible.length === 1 ? 'y' : 'ies'}
              {filter !== 'all' ? ` · ${filter}` : ''}
            </p>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="cms-empty">
            <strong>No categories yet</strong>
            <p>Add a group to start the skills map.</p>
            {!composerOpen && (
              <button type="button" className="cms-primary-btn" onClick={() => setComposerOpen(true)}>
                <FaPlus /> New category
              </button>
            )}
          </div>
        ) : (
          <div className="cms-table" role="list">
            {visible.map((category) => (
              <article
                key={category.id}
                className={`cms-row ${editingId === category.id ? 'is-editing' : ''}`}
                role="listitem"
              >
                <div className="cms-row-main">
                  <div className="cms-row-badges">
                    <span className={`cms-status ${category.published ? 'is-live' : 'is-draft'}`}>
                      {category.published ? 'Live' : 'Draft'}
                    </span>
                    <span className="cms-status is-muted">
                      {(category.skills || []).length} skills
                    </span>
                  </div>
                  <h4>{category.title}</h4>
                  <div className="cms-chips">
                    {(category.skills || []).length === 0 ? (
                      <span className="cms-chip is-muted">Empty category</span>
                    ) : (
                      (category.skills || []).map((item) => (
                        <span key={item} className="cms-chip">{item}</span>
                      ))
                    )}
                  </div>
                </div>
                <div className="cms-row-actions">
                  <button type="button" className="cms-ghost-btn" onClick={() => onEdit(category)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="cms-icon-btn"
                    aria-label={`Delete ${category.title}`}
                    onClick={() => onDelete(category.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {msg && <div className="admin-toast muted">{msg}</div>}
    </div>
  );
}

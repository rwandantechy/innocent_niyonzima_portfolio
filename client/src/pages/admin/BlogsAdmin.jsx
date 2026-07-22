import React, { useEffect, useMemo, useState } from 'react';
import { FaPlus, FaTrashAlt, FaTimes } from 'react-icons/fa';
import { useApp } from '../../context/AppProvider';

function parseTags(value) {
  return value
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function BlogsAdmin() {
  const { adminBlogs = [], createBlog, deleteBlog, fetchAdminContent } = useApp();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [filter, setFilter] = useState('all');
  const [composerOpen, setComposerOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAdminContent?.();
  }, []);

  const tagPreview = useMemo(() => parseTags(tags), [tags]);

  const counts = useMemo(() => {
    const publishedCount = adminBlogs.filter((b) => b.published).length;
    return {
      all: adminBlogs.length,
      published: publishedCount,
      drafts: adminBlogs.length - publishedCount,
    };
  }, [adminBlogs]);

  const visible = useMemo(() => {
    if (filter === 'published') return adminBlogs.filter((b) => b.published);
    if (filter === 'drafts') return adminBlogs.filter((b) => !b.published);
    return adminBlogs;
  }, [adminBlogs, filter]);

  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setTags('');
    setPublished(false);
    setFeatured(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      await createBlog({
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: excerpt.trim(),
        tags: parseTags(tags),
        published,
        featured,
      });
      setMsg('Post created');
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
      await deleteBlog(id);
      setMsg('Post deleted');
    } catch (err) {
      setMsg(err.message || 'Delete failed');
    }
  };

  return (
    <div className="cms cms--stack">
      <div className="cms-bar">
        <div className="cms-filters" role="tablist" aria-label="Filter posts">
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
          onClick={() => setComposerOpen((open) => !open)}
        >
          {composerOpen ? <FaTimes /> : <FaPlus />}
          {composerOpen ? 'Close' : 'New post'}
        </button>
      </div>

      {composerOpen && (
        <section className="cms-panel cms-composer-panel">
          <div className="cms-panel-head">
            <div>
              <h3>New post</h3>
              <p>Write a clear headline and a short excerpt. Publish when ready.</p>
            </div>
          </div>
          <form className="cms-form cms-form--grid" onSubmit={onSubmit}>
            <label className="cms-field cms-field--full">
              <span>Title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="A clear, specific headline"
                required
                autoFocus
              />
            </label>
            <label className="cms-field cms-field--full">
              <span>Excerpt</span>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="2–4 sentences that make someone want to read more"
                rows={5}
                required
              />
            </label>
            <label className="cms-field cms-field--full">
              <span>Tags</span>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="AI, Systems, Career"
              />
              {tagPreview.length > 0 && (
                <div className="cms-chips">
                  {tagPreview.map((tag) => (
                    <span key={tag} className="cms-chip">{tag}</span>
                  ))}
                </div>
              )}
            </label>
            <div className="cms-toggles cms-toggles--inline">
              <label className={`cms-switch ${published ? 'is-on' : ''}`}>
                <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
                <span className="cms-switch-track" aria-hidden="true" />
                <span className="cms-switch-copy">
                  <strong>Published</strong>
                </span>
              </label>
              <label className={`cms-switch ${featured ? 'is-on' : ''}`}>
                <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
                <span className="cms-switch-track" aria-hidden="true" />
                <span className="cms-switch-copy">
                  <strong>Featured</strong>
                </span>
              </label>
            </div>
            <div className="cms-form-actions cms-field--full">
              <button type="submit" className="cms-submit" disabled={saving}>
                <FaPlus />
                {saving ? 'Saving…' : published ? 'Publish post' : 'Save draft'}
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
              {visible.length} post{visible.length === 1 ? '' : 's'}
              {filter !== 'all' ? ` · ${filter}` : ''}
            </p>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="cms-empty">
            <strong>Nothing here yet</strong>
            <p>
              {filter === 'drafts'
                ? 'No drafts in this view.'
                : filter === 'published'
                  ? 'No live posts yet.'
                  : 'Create your first post to fill the library.'}
            </p>
            {!composerOpen && (
              <button type="button" className="cms-primary-btn" onClick={() => setComposerOpen(true)}>
                <FaPlus /> New post
              </button>
            )}
          </div>
        ) : (
          <div className="cms-table" role="list">
            {visible.map((blog) => (
              <article key={blog.id} className="cms-row" role="listitem">
                <div className="cms-row-main">
                  <div className="cms-row-badges">
                    <span className={`cms-status ${blog.published ? 'is-live' : 'is-draft'}`}>
                      {blog.published ? 'Live' : 'Draft'}
                    </span>
                    {blog.featured && <span className="cms-status is-featured">Featured</span>}
                  </div>
                  <h4>{blog.title}</h4>
                  {(blog.excerpt || blog.content) && (
                    <p className="cms-card-excerpt">
                      {(blog.excerpt || blog.content).slice(0, 160)}
                      {(blog.excerpt || blog.content).length > 160 ? '…' : ''}
                    </p>
                  )}
                  <div className="cms-chips">
                    {(blog.tags || []).length === 0 ? (
                      <span className="cms-chip is-muted">No tags</span>
                    ) : (
                      (blog.tags || []).slice(0, 5).map((tag) => (
                        <span key={tag} className="cms-chip">{tag}</span>
                      ))
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  className="cms-icon-btn"
                  aria-label={`Delete ${blog.title}`}
                  onClick={() => onDelete(blog.id)}
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

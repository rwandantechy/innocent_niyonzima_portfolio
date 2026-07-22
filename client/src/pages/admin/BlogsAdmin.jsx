import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useApp } from '../../context/AppProvider';

export default function BlogsAdmin() {
  const { adminBlogs = [], createBlog, deleteBlog, fetchAdminContent } = useApp();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    fetchAdminContent?.();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBlog({
        title,
        excerpt,
        content: excerpt,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        published,
      });
      setMsg('Blog created');
      setTitle('');
      setExcerpt('');
      setTags('');
      setPublished(false);
    } catch (err) {
      setMsg(err.message || 'Create failed');
    }
  };

  return (
    <>
      <div className="admin-grid">
        <div className="card admin-card">
          <h3>Create Blog</h3>
          <form className="admin-form" onSubmit={onSubmit}>
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Excerpt / content" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required />
            <input placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
            <label className="admin-checkbox">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
              <span>Published</span>
            </label>
            <button type="submit">Create Blog</button>
          </form>
        </div>
        <div className="card admin-card">
          <h3>Existing ({adminBlogs.length})</h3>
          <div className="admin-list">
            {adminBlogs.length === 0 && <p className="muted">No blogs yet.</p>}
            {adminBlogs.map((blog) => (
              <div key={blog.id} className="admin-list-item">
                <div>
                  <p className="admin-item-title">{blog.title}</p>
                  <p className="muted admin-item-sub">
                    {(blog.tags || []).join(', ') || 'No tags'}
                    {blog.published ? ' · Published' : ' · Draft'}
                  </p>
                </div>
                <button type="button" className="admin-danger-btn" onClick={() => deleteBlog(blog.id).then(() => setMsg('Deleted')).catch((err) => setMsg(err.message))}>
                  <FaTrashAlt />
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {msg && <div className="admin-toast muted">{msg}</div>}
    </>
  );
}

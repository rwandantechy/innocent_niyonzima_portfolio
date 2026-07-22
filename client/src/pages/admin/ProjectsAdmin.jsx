import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useApp } from '../../context/AppProvider';

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
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    fetchAdminContent?.();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject({
        title,
        description,
        featured,
        published,
        tech: tech.split(',').map((t) => t.trim()).filter(Boolean),
        metrics: [],
        challenges: [],
        solutions: [],
        results: [],
        links: {},
      });
      setMsg('Project created');
      setTitle('');
      setDescription('');
      setTech('');
      setFeatured(false);
      setPublished(false);
    } catch (err) {
      setMsg(err.message || 'Create failed');
    }
  };

  return (
    <>
      <div className="admin-grid">
        <div className="card admin-card">
          <h3>Create Project</h3>
          <form className="admin-form" onSubmit={onSubmit}>
            <input placeholder="Project title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input placeholder="Tech stack (comma separated)" value={tech} onChange={(e) => setTech(e.target.value)} required />
            <label className="admin-checkbox">
              <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
              <span>Featured</span>
            </label>
            <label className="admin-checkbox">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
              <span>Published</span>
            </label>
            <button type="submit">Create Project</button>
          </form>
        </div>

        <div className="card admin-card">
          <h3>Existing ({adminProjects.length})</h3>
          <div className="admin-list">
            {adminProjects.length === 0 && <p className="muted">No projects yet.</p>}
            {adminProjects.map((project) => (
              <div key={project.id} className="admin-list-item">
                <div>
                  <p className="admin-item-title">{project.title}</p>
                  <p className="muted admin-item-sub">
                    {project.featured ? 'Featured' : 'Standard'}
                    {project.published ? ' · Published' : ' · Draft'}
                  </p>
                </div>
                <button type="button" className="admin-danger-btn" onClick={() => deleteProject(project.id).then(() => setMsg('Deleted')).catch((err) => setMsg(err.message))}>
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

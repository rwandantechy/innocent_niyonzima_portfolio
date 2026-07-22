import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useApp } from '../../context/AppProvider';

export default function SkillsAdmin() {
  const { adminSkills = [], createSkill, deleteSkill, fetchAdminContent } = useApp();
  const [title, setTitle] = useState('');
  const [skillsText, setSkillsText] = useState('');
  const [published, setPublished] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    fetchAdminContent?.();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSkill({
        title,
        skills: skillsText.split(',').map((t) => t.trim()).filter(Boolean),
        published,
      });
      setMsg('Skill category created');
      setTitle('');
      setSkillsText('');
      setPublished(false);
    } catch (err) {
      setMsg(err.message || 'Create failed');
    }
  };

  return (
    <>
      <div className="admin-grid">
        <div className="card admin-card">
          <h3>Create Skill Category</h3>
          <form className="admin-form" onSubmit={onSubmit}>
            <input placeholder="Category title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input placeholder="Skills (comma separated)" value={skillsText} onChange={(e) => setSkillsText(e.target.value)} required />
            <label className="admin-checkbox">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
              <span>Published</span>
            </label>
            <button type="submit">Create Category</button>
          </form>
        </div>
        <div className="card admin-card">
          <h3>Existing ({adminSkills.length})</h3>
          <div className="admin-list">
            {adminSkills.length === 0 && <p className="muted">No skill categories yet.</p>}
            {adminSkills.map((category) => (
              <div key={category.id} className="admin-list-item">
                <div>
                  <p className="admin-item-title">{category.title}</p>
                  <p className="muted admin-item-sub">
                    {(category.skills || []).length} skills
                    {category.published ? ' · Published' : ' · Draft'}
                  </p>
                </div>
                <button type="button" className="admin-danger-btn" onClick={() => deleteSkill(category.id).then(() => setMsg('Deleted')).catch((err) => setMsg(err.message))}>
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

import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppProvider';
import {
  FaFolderOpen,
  FaBlog,
  FaTools,
  FaSyncAlt,
  FaTrashAlt,
  FaChartLine,
  FaThLarge,
  FaBullseye,
  FaTags,
  FaClock,
  FaFire,
  FaBriefcase,
  FaExclamationTriangle,
} from 'react-icons/fa';

function Stat({ title, value, icon: Icon }) {
  return (
    <div className="admin-stat">
      <div className="admin-stat-top">
        <span className="admin-stat-title">{title}</span>
        <Icon className="admin-stat-icon" />
      </div>
      <div className="admin-stat-value">{value}</div>
    </div>
  );
}

export default function AdminDashboard() {
  const {
    adminProjects = [],
    adminBlogs = [],
    adminSkills = [],
    adminExperience = [],
    createProject,
    createBlog,
    createSkill,
    deleteProject,
    deleteBlog,
    deleteSkill,
    refreshData,
    fetchAdminContent,
  } = useApp();

  const [activePanel, setActivePanel] = useState('dashboard');
  const [activeManager, setActiveManager] = useState('projects');

  const [pTitle, setPTitle] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [pTech, setPTech] = useState('');
  const [pFeatured, setPFeatured] = useState(false);
  const [pPublished, setPPublished] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogTags, setBlogTags] = useState('');
  const [blogPublished, setBlogPublished] = useState(false);
  const [skillTitle, setSkillTitle] = useState('');
  const [skillItems, setSkillItems] = useState('');
  const [skillPublished, setSkillPublished] = useState(false);
  const [msg, setMsg] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [rangeFilter, setRangeFilter] = useState('month');

  useEffect(() => {
    fetchAdminContent?.();
  }, []);

  const projects = adminProjects;
  const blogs = adminBlogs;
  const skills = adminSkills;

  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured).length,
    [projects]
  );
  const featuredBlogs = useMemo(
    () => blogs.filter((blog) => blog.featured).length,
    [blogs]
  );
  const totalSkills = useMemo(
    () => skills.reduce((count, category) => count + (category.skills || []).length, 0),
    [skills]
  );
  const uniqueBlogTags = useMemo(() => {
    const set = new Set();
    blogs.forEach((blog) => (blog.tags || []).forEach((tag) => set.add(tag)));
    return set.size;
  }, [blogs]);
  const avgTagsPerBlog = useMemo(() => {
    if (!blogs.length) return 0;
    const total = blogs.reduce((sum, blog) => sum + (blog.tags || []).length, 0);
    return (total / blogs.length).toFixed(1);
  }, [blogs]);
  const contentVelocity = useMemo(() => {
    if (!blogs.length) return 'Low';
    if (blogs.length >= 8) return 'High';
    if (blogs.length >= 4) return 'Medium';
    return 'Low';
  }, [blogs]);

  const warnings = useMemo(() => {
    const list = [];
    projects
      .filter((p) => p.published)
      .forEach((p) => {
        if (!p.tech || p.tech.length === 0) {
          list.push(`Project "${p.title}" is published without a tech stack`);
        }
        if (!p.description) {
          list.push(`Project "${p.title}" is published without a description`);
        }
      });
    adminExperience
      .filter((e) => e.published)
      .forEach((e) => {
        if (!e.bullets || e.bullets.length === 0) {
          list.push(`Experience "${e.role}" is published without bullets`);
        }
      });
    skills
      .filter((s) => s.published)
      .forEach((s) => {
        if (!s.skills || s.skills.length === 0) {
          list.push(`Skill category "${s.title}" is published with no skills`);
        }
      });
    return list;
  }, [projects, adminExperience, skills]);

  const submitProject = async (e) => {
    e.preventDefault();
    try {
      const tech = pTech.split(',').map((item) => item.trim()).filter(Boolean);
      await createProject({
        title: pTitle,
        description: pDesc,
        featured: pFeatured,
        published: pPublished,
        tech,
        metrics: [],
        challenges: [],
        solutions: [],
        results: [],
        links: {},
      });
      setMsg('Project created');
      setPTitle('');
      setPDesc('');
      setPTech('');
      setPFeatured(false);
      setPPublished(false);
    } catch (err) {
      setMsg(err.message || 'Create project failed');
    }
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    try {
      const tags = blogTags.split(',').map((item) => item.trim()).filter(Boolean);
      await createBlog({
        title: blogTitle,
        excerpt: blogExcerpt,
        content: blogExcerpt,
        tags,
        published: blogPublished,
      });
      setMsg('Blog created');
      setBlogTitle('');
      setBlogExcerpt('');
      setBlogTags('');
      setBlogPublished(false);
    } catch (err) {
      setMsg(err.message || 'Create blog failed');
    }
  };

  const submitSkills = async (e) => {
    e.preventDefault();
    try {
      const list = skillItems.split(',').map((item) => item.trim()).filter(Boolean);
      await createSkill({ title: skillTitle, skills: list, published: skillPublished });
      setMsg('Skill category created');
      setSkillTitle('');
      setSkillItems('');
      setSkillPublished(false);
    } catch (err) {
      setMsg(err.message || 'Create skill failed');
    }
  };

  const removeProject = async (id) => {
    try {
      await deleteProject(id);
      setMsg('Project deleted');
    } catch (err) {
      setMsg(err.message || 'Delete project failed');
    }
  };

  const removeBlog = async (id) => {
    try {
      await deleteBlog(id);
      setMsg('Blog deleted');
    } catch (err) {
      setMsg(err.message || 'Delete blog failed');
    }
  };

  const removeSkill = async (id) => {
    try {
      await deleteSkill(id);
      setMsg('Skill category deleted');
    } catch (err) {
      setMsg(err.message || 'Delete skill failed');
    }
  };

  const refreshContent = async () => {
    setIsRefreshing(true);
    try {
      await refreshData();
      setMsg('Dashboard updated');
    } finally {
      setIsRefreshing(false);
    }
  };

  const managerTabs = [
    { id: 'projects', label: 'Projects', icon: FaFolderOpen },
    { id: 'blogs', label: 'Blogs', icon: FaBlog },
    { id: 'skills', label: 'Skills', icon: FaTools },
  ];

  const localNav = [
    { id: 'dashboard', label: 'Overview', icon: FaThLarge },
    { id: 'management', label: 'Management', icon: FaTools },
    { id: 'analytics', label: 'Analytics', icon: FaChartLine },
  ];
  const rangeOptions = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This week' },
    { id: 'month', label: 'This month' },
    { id: 'year', label: 'This year' },
  ];

  return (
    <>
      <div className="admin-topbar" style={{ marginBottom: '1rem', paddingLeft: 0 }}>
        <div className="admin-tabs">
          {localNav.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`admin-tab-btn ${activePanel === id ? 'active' : ''}`}
              onClick={() => setActivePanel(id)}
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>
        <button className="btn-outline admin-refresh-btn" onClick={refreshContent} disabled={isRefreshing}>
          <FaSyncAlt />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {activePanel === 'dashboard' && (
        <>
          <div className="admin-hero">
            <div>
              <h2 className="admin-title">Analytics dashboard</h2>
              <p className="muted admin-subtitle">Overview of your content and publishing activity</p>
            </div>
            <Link to="/admin/experience" className="admin-hero-chip">
              <FaBriefcase style={{ marginRight: 6 }} />
              Manage experience
            </Link>
          </div>

          <div className="admin-range-bar">
            {rangeOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`admin-range-btn ${rangeFilter === opt.id ? 'active' : ''}`}
                onClick={() => setRangeFilter(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="admin-stats-grid">
            <Stat title="Projects" value={projects.length} icon={FaFolderOpen} />
            <Stat title="Blogs" value={blogs.length} icon={FaBlog} />
            <Stat title="Skills" value={totalSkills} icon={FaTools} />
            <Stat title="Experience" value={adminExperience.length} icon={FaBriefcase} />
          </div>

          {warnings.length > 0 && (
            <div className="card admin-card" style={{ marginBottom: '1.25rem' }}>
              <h3>
                <FaExclamationTriangle style={{ marginRight: 8, color: 'var(--color-primary)' }} />
                Publishing warnings
              </h3>
              <ul className="admin-guidance-list">
                {warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="admin-grid admin-grid--spacious">
            <div className="card admin-card">
              <h3>Visibility Snapshot</h3>
              <div className="admin-kpi-list">
                <div className="admin-kpi-row">
                  <span>Featured projects</span>
                  <strong>{featuredProjects}</strong>
                </div>
                <div className="admin-kpi-row">
                  <span>Featured blog posts</span>
                  <strong>{featuredBlogs}</strong>
                </div>
                <div className="admin-kpi-row">
                  <span>Published experience</span>
                  <strong>{adminExperience.filter((e) => e.published).length}</strong>
                </div>
              </div>
            </div>

            <div className="card admin-card">
              <h3>Recommended Next Step</h3>
              <div className="admin-insight">
                <FaBullseye className="admin-insight-icon" />
                <p className="muted">
                  Keep drafts unpublished until required fields pass validation. Use Experience for concurrent roles.
                </p>
              </div>
            </div>
          </div>

          <div className="admin-mini-analytics">
            <div className="admin-mini-card">
              <div className="admin-mini-card-top">
                <span>Avg Tags per Blog</span>
                <FaTags />
              </div>
              <strong>{avgTagsPerBlog}</strong>
            </div>
            <div className="admin-mini-card">
              <div className="admin-mini-card-top">
                <span>Publishing Velocity</span>
                <FaClock />
              </div>
              <strong>{contentVelocity}</strong>
            </div>
            <div className="admin-mini-card">
              <div className="admin-mini-card-top">
                <span>Priority Area</span>
                <FaFire />
              </div>
              <strong>{uniqueBlogTags < 6 ? 'Expand topics' : 'Keep momentum'}</strong>
            </div>
          </div>
        </>
      )}

      {activePanel === 'management' && (
        <>
          <div className="admin-hero">
            <div>
              <h2 className="admin-title">Content Management</h2>
              <p className="muted admin-subtitle">Create, update, and clean up portfolio content.</p>
            </div>
          </div>
          <div className="admin-tabs">
            {managerTabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                className={`admin-tab-btn ${activeManager === id ? 'active' : ''}`}
                onClick={() => setActiveManager(id)}
              >
                <Icon />
                {label}
              </button>
            ))}
          </div>

          {activeManager === 'projects' && (
            <div className="admin-grid">
              <div className="card admin-card">
                <h3>Create Project</h3>
                <form className="admin-form" onSubmit={submitProject}>
                  <input placeholder="Project title" value={pTitle} onChange={(e) => setPTitle(e.target.value)} required />
                  <textarea placeholder="Project description" value={pDesc} onChange={(e) => setPDesc(e.target.value)} required />
                  <input placeholder="Tech stack (comma separated)" value={pTech} onChange={(e) => setPTech(e.target.value)} required />
                  <label className="admin-checkbox">
                    <input type="checkbox" checked={pFeatured} onChange={(e) => setPFeatured(e.target.checked)} />
                    <span>Mark as featured</span>
                  </label>
                  <label className="admin-checkbox">
                    <input type="checkbox" checked={pPublished} onChange={(e) => setPPublished(e.target.checked)} />
                    <span>Published on public site</span>
                  </label>
                  <button type="submit">Create Project</button>
                </form>
              </div>

              <div className="card admin-card">
                <h3>Existing Projects</h3>
                <div className="admin-list">
                  {projects.length === 0 && <p className="muted">No projects yet.</p>}
                  {projects.map((project) => (
                    <div key={project.id} className="admin-list-item">
                      <div>
                        <p className="admin-item-title">{project.title}</p>
                        <p className="muted admin-item-sub">
                          {project.featured ? 'Featured' : 'Standard'}
                          {project.published ? ' · Published' : ' · Draft'}
                        </p>
                      </div>
                      <button type="button" className="admin-danger-btn" onClick={() => removeProject(project.id)}>
                        <FaTrashAlt />
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeManager === 'blogs' && (
            <div className="admin-grid">
              <div className="card admin-card">
                <h3>Create Blog</h3>
                <form className="admin-form" onSubmit={submitBlog}>
                  <input placeholder="Blog title" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} required />
                  <textarea placeholder="Excerpt / content" value={blogExcerpt} onChange={(e) => setBlogExcerpt(e.target.value)} required />
                  <input placeholder="Tags (comma separated)" value={blogTags} onChange={(e) => setBlogTags(e.target.value)} />
                  <label className="admin-checkbox">
                    <input type="checkbox" checked={blogPublished} onChange={(e) => setBlogPublished(e.target.checked)} />
                    <span>Published on public site</span>
                  </label>
                  <button type="submit">Create Blog</button>
                </form>
              </div>

              <div className="card admin-card">
                <h3>Existing Blogs</h3>
                <div className="admin-list">
                  {blogs.length === 0 && <p className="muted">No blogs yet.</p>}
                  {blogs.map((blog) => (
                    <div key={blog.id} className="admin-list-item">
                      <div>
                        <p className="admin-item-title">{blog.title}</p>
                        <p className="muted admin-item-sub">
                          {(blog.tags || []).join(', ') || 'No tags'}
                          {blog.published ? ' · Published' : ' · Draft'}
                        </p>
                      </div>
                      <button type="button" className="admin-danger-btn" onClick={() => removeBlog(blog.id)}>
                        <FaTrashAlt />
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeManager === 'skills' && (
            <div className="admin-grid">
              <div className="card admin-card">
                <h3>Create Skill Category</h3>
                <form className="admin-form" onSubmit={submitSkills}>
                  <input placeholder="Category title (e.g. Backend)" value={skillTitle} onChange={(e) => setSkillTitle(e.target.value)} required />
                  <input placeholder="Skills (comma separated)" value={skillItems} onChange={(e) => setSkillItems(e.target.value)} required />
                  <label className="admin-checkbox">
                    <input type="checkbox" checked={skillPublished} onChange={(e) => setSkillPublished(e.target.checked)} />
                    <span>Published on public site</span>
                  </label>
                  <button type="submit">Create Skill Category</button>
                </form>
              </div>

              <div className="card admin-card">
                <h3>Existing Categories</h3>
                <div className="admin-list">
                  {skills.length === 0 && <p className="muted">No skill categories yet.</p>}
                  {skills.map((skillCategory) => (
                    <div key={skillCategory.id} className="admin-list-item">
                      <div>
                        <p className="admin-item-title">{skillCategory.title}</p>
                        <p className="muted admin-item-sub">
                          {(skillCategory.skills || []).length} skills
                          {skillCategory.published ? ' · Published' : ' · Draft'}
                        </p>
                      </div>
                      <button type="button" className="admin-danger-btn" onClick={() => removeSkill(skillCategory.id)}>
                        <FaTrashAlt />
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {activePanel === 'analytics' && (
        <div className="admin-grid admin-grid--spacious">
          <div className="card admin-card">
            <h3>Content Coverage</h3>
            <div className="admin-kpi-list">
              <div className="admin-kpi-row">
                <span><FaFolderOpen /> Project entries</span>
                <strong>{projects.length}</strong>
              </div>
              <div className="admin-kpi-row">
                <span><FaBlog /> Blog entries</span>
                <strong>{blogs.length}</strong>
              </div>
              <div className="admin-kpi-row">
                <span><FaBriefcase /> Experience entries</span>
                <strong>{adminExperience.length}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {msg && <div className="admin-toast muted">{msg}</div>}
    </>
  );
}

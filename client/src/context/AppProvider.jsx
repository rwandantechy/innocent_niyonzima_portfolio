import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_URL } from '../config/env';
import { detailedProjects as staticProjects } from '../data/detailedProjects';
import staticBlogs from '../data/blogs';
import staticSkills from '../data/skills';
import staticExperience, { toTimelineItem } from '../data/experiences';

const AppContext = createContext(null);

export function useApp() {
  return useContext(AppContext);
}

export default function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [projectsList, setProjectsList] = useState([]);
  const [blogsList, setBlogsList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [adminProjects, setAdminProjects] = useState([]);
  const [adminBlogs, setAdminBlogs] = useState([]);
  const [adminSkills, setAdminSkills] = useState([]);
  const [adminExperience, setAdminExperience] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [loadingSkills, setLoadingSkills] = useState(false);
  const [loadingExperience, setLoadingExperience] = useState(false);
  const [error, setError] = useState(null);

  const apiBase = `${API_URL}/api`;

  const parseTags = (tags) => {
    if (Array.isArray(tags)) return tags;
    if (typeof tags === 'string') return tags.split(',').map((tag) => tag.trim()).filter(Boolean);
    return [];
  };

  const normalizeProject = (project) => ({
    id: project.id != null ? String(project.id) : `${Date.now()}`,
    title: project.title || 'Untitled Project',
    description: project.description || '',
    featured: Boolean(project.featured),
    published: project.published === undefined ? true : Boolean(project.published),
    metrics: Array.isArray(project.metrics) ? project.metrics : [],
    tech: Array.isArray(project.tech) ? project.tech : parseTags(project.tags),
    challenges: Array.isArray(project.challenges) ? project.challenges : [],
    solutions: Array.isArray(project.solutions) ? project.solutions : [],
    results: Array.isArray(project.results) ? project.results : [],
    links: project.links && typeof project.links === 'object' ? project.links : {},
  });

  const staticProjectFallback = staticProjects.map((p, idx) =>
    normalizeProject({
      ...p,
      id: ['ibyapa', 'ai-server', 'yigse'][idx] || p.id,
      published: true,
    })
  );

  const normalizeBlog = (blog) => ({
    id: blog.id || `${Date.now()}`,
    slug: blog.slug || '',
    title: blog.title || 'Untitled',
    excerpt: blog.excerpt || (blog.content ? `${blog.content.slice(0, 140)}...` : ''),
    content: blog.content || '',
    date: blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : (blog.date || ''),
    readTime: blog.readTime || '5 min read',
    tags: parseTags(blog.tags),
    featured: Boolean(blog.featured),
    published: blog.published === undefined ? true : Boolean(blog.published),
  });

  const normalizeSkills = (skill) => ({
    id: skill.id || `${Date.now()}`,
    title: skill.title || 'Untitled Category',
    skills: parseTags(skill.skills),
    published: skill.published === undefined ? true : Boolean(skill.published),
  });

  const normalizeExperience = (item) => ({
    id: item.id || `${Date.now()}`,
    role: item.role || item.title || '',
    company: item.company || '',
    location: item.location || '',
    startDate: item.startDate || '',
    endDate: item.endDate === undefined ? null : item.endDate,
    concurrent: Boolean(item.concurrent),
    bullets: Array.isArray(item.bullets) ? item.bullets : (item.highlights || []),
    logo: item.logo || '',
    order: item.order === undefined ? 0 : Number(item.order),
    published: item.published === undefined ? true : Boolean(item.published),
  });

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await fetch(`${apiBase}/projects`);
      if (!res.ok) throw new Error('Failed to load projects');
      const data = await res.json();
      const normalized = Array.isArray(data) ? data.map(normalizeProject) : [];
      setProjectsList(normalized.length > 0 ? normalized : staticProjectFallback);
    } catch (err) {
      setProjectsList(staticProjectFallback);
      setError(err.message);
    } finally {
      setLoadingProjects(false);
    }
  };

  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const res = await fetch(`${apiBase}/blogs`);
      if (!res.ok) throw new Error('Failed to load blogs');
      const data = await res.json();
      const normalized = Array.isArray(data) ? data.map(normalizeBlog) : [];
      setBlogsList(normalized.length > 0 ? normalized : staticBlogs.map(normalizeBlog));
    } catch (err) {
      setBlogsList(staticBlogs.map(normalizeBlog));
      setError(err.message);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const fetchSkills = async () => {
    setLoadingSkills(true);
    try {
      const res = await fetch(`${apiBase}/skills`);
      if (!res.ok) throw new Error('Failed to load skills');
      const data = await res.json();
      const normalized = Array.isArray(data) ? data.map(normalizeSkills) : [];
      setSkillsList(normalized.length > 0 ? normalized : staticSkills.map(normalizeSkills));
    } catch (err) {
      setSkillsList(staticSkills.map(normalizeSkills));
      setError(err.message);
    } finally {
      setLoadingSkills(false);
    }
  };

  const fetchExperience = async () => {
    setLoadingExperience(true);
    try {
      const res = await fetch(`${apiBase}/experience`);
      if (!res.ok) throw new Error('Failed to load experience');
      const data = await res.json();
      const normalized = Array.isArray(data) ? data.map(normalizeExperience) : [];
      setExperienceList(
        normalized.length > 0
          ? normalized
          : staticExperience.map(normalizeExperience)
      );
    } catch (err) {
      setExperienceList(staticExperience.map(normalizeExperience));
      setError(err.message);
    } finally {
      setLoadingExperience(false);
    }
  };

  const fetchAdminContent = async () => {
    try {
      const [pRes, bRes, sRes, eRes] = await Promise.all([
        fetch(`${apiBase}/admin/projects`),
        fetch(`${apiBase}/admin/blogs`),
        fetch(`${apiBase}/admin/skills`),
        fetch(`${apiBase}/admin/experience`),
      ]);

      if (pRes.ok) {
        const projects = (await pRes.json()).map(normalizeProject);
        setAdminProjects(projects.length > 0 ? projects : staticProjectFallback);
      } else {
        setAdminProjects(staticProjectFallback);
      }

      if (bRes.ok) {
        const blogs = (await bRes.json()).map(normalizeBlog);
        setAdminBlogs(blogs.length > 0 ? blogs : staticBlogs.map(normalizeBlog));
      } else {
        setAdminBlogs(staticBlogs.map(normalizeBlog));
      }

      if (sRes.ok) {
        const skills = (await sRes.json()).map(normalizeSkills);
        setAdminSkills(skills.length > 0 ? skills : staticSkills.map(normalizeSkills));
      } else {
        setAdminSkills(staticSkills.map(normalizeSkills));
      }

      if (eRes.ok) {
        const exp = (await eRes.json()).map(normalizeExperience);
        setAdminExperience(exp.length > 0 ? exp : staticExperience.map(normalizeExperience));
      } else {
        setAdminExperience(staticExperience.map(normalizeExperience));
      }
    } catch (err) {
      setAdminProjects(staticProjectFallback);
      setAdminBlogs(staticBlogs.map(normalizeBlog));
      setAdminSkills(staticSkills.map(normalizeSkills));
      setAdminExperience(staticExperience.map(normalizeExperience));
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchBlogs();
    fetchSkills();
    fetchExperience();
  }, []);

  const parseErrorMessage = async (res) => {
    try {
      const data = await res.json();
      if (data?.details?.length) return `${data.error}: ${data.details.join('; ')}`;
      return data?.error || data?.message || `Request failed: ${res.status}`;
    } catch {
      return `Request failed: ${res.status}`;
    }
  };

  const request = async (path, method, payload) => {
    const res = await fetch(`${apiBase}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: payload ? JSON.stringify(payload) : undefined,
    });
    if (!res.ok) {
      throw new Error(await parseErrorMessage(res));
    }
    if (res.status === 204) return null;
    return res.json();
  };

  const createProject = async (payload) => {
    await request('/admin/projects', 'POST', payload);
    await Promise.all([fetchProjects(), fetchAdminContent()]);
  };

  const updateProject = async (id, payload) => {
    await request(`/admin/projects/${id}`, 'PUT', payload);
    await Promise.all([fetchProjects(), fetchAdminContent()]);
  };

  const createBlog = async (payload) => {
    await request('/admin/blogs', 'POST', payload);
    await Promise.all([fetchBlogs(), fetchAdminContent()]);
  };

  const updateBlog = async (id, payload) => {
    await request(`/admin/blogs/${id}`, 'PUT', payload);
    await Promise.all([fetchBlogs(), fetchAdminContent()]);
  };

  const createSkill = async (payload) => {
    await request('/admin/skills', 'POST', payload);
    await Promise.all([fetchSkills(), fetchAdminContent()]);
  };

  const updateSkill = async (id, payload) => {
    await request(`/admin/skills/${id}`, 'PUT', payload);
    await Promise.all([fetchSkills(), fetchAdminContent()]);
  };

  const createExperience = async (payload) => {
    await request('/admin/experience', 'POST', payload);
    await Promise.all([fetchExperience(), fetchAdminContent()]);
  };

  const updateExperience = async (id, payload) => {
    await request(`/admin/experience/${id}`, 'PUT', payload);
    await Promise.all([fetchExperience(), fetchAdminContent()]);
  };

  const reorderExperience = async (orderedIds) => {
    const items = await request('/admin/experience/reorder', 'PUT', { orderedIds });
    const normalized = Array.isArray(items) ? items.map(normalizeExperience) : [];
    setAdminExperience(normalized);
    await fetchExperience();
    return normalized;
  };

  const deleteProject = async (id) => {
    await request(`/admin/projects/${id}`, 'DELETE');
    await Promise.all([fetchProjects(), fetchAdminContent()]);
  };

  const deleteBlog = async (id) => {
    await request(`/admin/blogs/${id}`, 'DELETE');
    await Promise.all([fetchBlogs(), fetchAdminContent()]);
  };

  const deleteSkill = async (id) => {
    await request(`/admin/skills/${id}`, 'DELETE');
    await Promise.all([fetchSkills(), fetchAdminContent()]);
  };

  const deleteExperience = async (id) => {
    await request(`/admin/experience/${id}`, 'DELETE');
    await Promise.all([fetchExperience(), fetchAdminContent()]);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    projects: projectsList,
    blogs: blogsList,
    skills: skillsList,
    experience: experienceList,
    timelineExperience: experienceList.map(toTimelineItem),
    adminProjects,
    adminBlogs,
    adminSkills,
    adminExperience,
    loadingProjects,
    loadingBlogs,
    loadingSkills,
    loadingExperience,
    error,
    createProject,
    updateProject,
    createBlog,
    updateBlog,
    createSkill,
    updateSkill,
    createExperience,
    updateExperience,
    reorderExperience,
    deleteProject,
    deleteBlog,
    deleteSkill,
    deleteExperience,
    fetchAdminContent,
    refreshData: async () => {
      await Promise.all([
        fetchProjects(),
        fetchBlogs(),
        fetchSkills(),
        fetchExperience(),
        fetchAdminContent(),
      ]);
    },
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

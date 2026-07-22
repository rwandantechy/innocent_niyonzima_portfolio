import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_URL } from '../config/env';
import { detailedProjects as staticProjects } from '../data/detailedProjects';
import staticBlogs from '../data/blogs';

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
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [loadingSkills, setLoadingSkills] = useState(false);
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
      id: ['ibyapa', 'ai-server', 'budget-planner', 'yigse', 'task-tracker'][idx] || p.id,
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
    featured: Boolean(blog.featured)
  });

  const normalizeSkills = (skill) => ({
    id: skill.id || `${Date.now()}`,
    title: skill.title || 'Untitled Category',
    skills: parseTags(skill.skills)
  });

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await fetch(`${apiBase}/projects`);
      if (!res.ok) throw new Error('Failed to load projects');
      const data = await res.json();
      const normalized = Array.isArray(data) ? data.map(normalizeProject) : [];
      setProjectsList(normalized);
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
      setBlogsList(normalized);
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
      setSkillsList(normalized);
    } catch (err) {
      setSkillsList([]);
      setError(err.message);
    } finally {
      setLoadingSkills(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchBlogs();
    fetchSkills();
  }, []);

  const request = async (path, method, payload) => {
    const res = await fetch(`${apiBase}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: payload ? JSON.stringify(payload) : undefined
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Request failed: ${res.status}`);
    }
    if (res.status === 204) return null;
    return res.json();
  };

  const createProject = async (payload) => {
    await request('/projects', 'POST', payload);
    await fetchProjects();
  };

  const createBlog = async (payload) => {
    await request('/blogs', 'POST', payload);
    await fetchBlogs();
  };

  const createSkill = async (payload) => {
    await request('/skills', 'POST', payload);
    await fetchSkills();
  };

  const deleteProject = async (id) => {
    await request(`/projects/${id}`, 'DELETE');
    await fetchProjects();
  };

  const deleteBlog = async (id) => {
    await request(`/blogs/${id}`, 'DELETE');
    await fetchBlogs();
  };

  const deleteSkill = async (id) => {
    await request(`/skills/${id}`, 'DELETE');
    await fetchSkills();
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
    loadingProjects,
    loadingBlogs,
    loadingSkills,
    error,
    createProject,
    createBlog,
    createSkill,
    deleteProject,
    deleteBlog,
    deleteSkill,
    refreshData: async () => {
      await Promise.all([fetchProjects(), fetchBlogs(), fetchSkills()]);
    },
    logout
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

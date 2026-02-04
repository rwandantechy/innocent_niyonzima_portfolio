import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function useApp() {
  return useContext(AppContext);
}

export default function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [error, setError] = useState(null);

  const apiBase = import.meta.env.VITE_API_URL || '';

  const fetchProjects = useCallback(async () => {
    setLoadingProjects(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/api/projects`);
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setProjects(data);
      setLoadingProjects(false);
      return data;
    } catch (err) {
      setError(err);
      setLoadingProjects(false);
      return null;
    }
  }, [apiBase]);

  const register = async ({ name, email, password }) => {
    const res = await fetch(`${apiBase}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (!res.ok) throw new Error('Register failed');
    const { user: u, token: t } = await res.json();
    setUser(u);
    setToken(t);
    return { user: u, token: t };
  };

  const login = async ({ email, password }) => {
    const res = await fetch(`${apiBase}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Login failed');
    const { user: u, token: t } = await res.json();
    setUser(u);
    setToken(t);
    return { user: u, token: t };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const authHeaders = () => (token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' });

  const createProject = async (payload) => {
    const res = await fetch(`${apiBase}/api/projects`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Create project failed');
    const created = await res.json();
    setProjects(prev => [created, ...prev]);
    return created;
  };

  const createBlog = async (payload) => {
    const res = await fetch(`${apiBase}/api/blogs`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Create blog failed');
    const created = await res.json();
    return created;
  };

  useEffect(() => {
    // try fetching projects on mount
    fetchProjects();
  }, [fetchProjects]);

  const value = {
    user,
    token,
    projects,
    loadingProjects,
    error,
    fetchProjects,
    register,
    login,
    logout
    , createProject, createBlog
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  FaThLarge,
  FaBriefcase,
  FaFolderOpen,
  FaBlog,
  FaTools,
  FaAward,
  FaCog,
  FaSignOutAlt,
  FaExternalLinkAlt,
} from 'react-icons/fa';

const contentNav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: FaThLarge, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FaFolderOpen },
  { to: '/admin/blogs', label: 'Writing', icon: FaBlog },
  { to: '/admin/skills', label: 'Skills', icon: FaTools },
  { to: '/admin/experience', label: 'Experience', icon: FaBriefcase },
  { to: '/admin/certifications', label: 'Certifications', icon: FaAward, soon: true },
  { to: '/admin/site-settings', label: 'Site Settings', icon: FaCog, soon: true },
];

const pageCopy = {
  '/admin/dashboard': {
    title: 'Dashboard',
    sub: '',
  },
  '/admin/projects': {
    title: 'Projects',
    sub: 'Case studies and featured work',
  },
  '/admin/blogs': {
    title: 'Writing',
    sub: 'Long-form posts and drafts',
  },
  '/admin/skills': {
    title: 'Skills',
    sub: 'Skill categories shown on Resume and About',
  },
  '/admin/experience': {
    title: 'Experience',
    sub: 'Roles, concurrent flags, and display order',
  },
};

export default function AdminLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const copy = pageCopy[pathname] || { title: 'Admin', sub: '' };

  return (
    <section className="admin-shell admin-shell-v2">
      <div className="admin-layout-v2">
        <aside className="admin-sidebar">
          <div className="admin-brand">
            <div className="admin-brand-logo">IN</div>
            <div>
              <p className="admin-brand-name">Innocent</p>
              <p className="admin-brand-role">Content Ops</p>
            </div>
          </div>

          <div className="admin-sidebar-section">
            <div className="admin-sidebar-title">Workspace</div>
            <nav className="admin-sidebar-nav">
              {contentNav.map(({ to, label, icon: Icon, end, soon }) => (
                <NavLink
                  key={to}
                  to={soon ? '#' : to}
                  end={end}
                  className={({ isActive }) =>
                    `admin-sidebar-item ${isActive && !soon ? 'active' : ''} ${soon ? 'is-disabled' : ''}`
                  }
                  onClick={(e) => {
                    if (soon) e.preventDefault();
                  }}
                  title={soon ? 'Coming next' : undefined}
                >
                  <Icon />
                  <span>{label}</span>
                  {soon && <span className="admin-nav-soon">Soon</span>}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="admin-sidebar-section admin-sidebar-section--footer">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-sidebar-item"
            >
              <FaExternalLinkAlt />
              <span>Open site</span>
            </a>
            <button
              type="button"
              className="admin-sidebar-item"
              onClick={() => navigate('/admin/login')}
            >
              <FaSignOutAlt />
              <span>Exit</span>
            </button>
          </div>
        </aside>

        <div className="admin-main">
          <div className="admin-topbar">
            <div>
              <h1 className="admin-topbar-title">{copy.title}</h1>
              {copy.sub && <p className="admin-topbar-sub">{copy.sub}</p>}
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </section>
  );
}

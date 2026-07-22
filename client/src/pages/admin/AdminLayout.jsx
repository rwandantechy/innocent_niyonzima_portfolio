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
    sub: 'Publishing overview',
  },
  '/admin/projects': {
    title: 'Projects',
    sub: 'Case studies and featured work',
  },
  '/admin/blogs': {
    title: 'Writing',
    sub: 'Posts and drafts',
  },
  '/admin/skills': {
    title: 'Skills',
    sub: 'Categories on About and Resume',
  },
  '/admin/experience': {
    title: 'Experience',
    sub: 'Roles and display order',
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
              {contentNav.map(({ to, label, icon: Icon, end, soon }) =>
                soon ? (
                  <span key={to} className="admin-sidebar-item is-disabled" title="Coming next">
                    <Icon />
                    <span>{label}</span>
                    <span className="admin-nav-soon">Soon</span>
                  </span>
                ) : (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `admin-sidebar-item ${isActive ? 'active' : ''}`
                    }
                  >
                    <Icon />
                    <span>{label}</span>
                  </NavLink>
                )
              )}
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
          <header className="admin-topbar">
            <div>
              <h1 className="admin-topbar-title">{copy.title}</h1>
              {copy.sub && <p className="admin-topbar-sub">{copy.sub}</p>}
            </div>
          </header>
          <div className="admin-content">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}

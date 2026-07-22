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
} from 'react-icons/fa';

const contentNav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: FaThLarge, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FaFolderOpen },
  { to: '/admin/blogs', label: 'Blogs', icon: FaBlog },
  { to: '/admin/skills', label: 'Skills', icon: FaTools },
  { to: '/admin/experience', label: 'Experience', icon: FaBriefcase },
  { to: '/admin/certifications', label: 'Certifications', icon: FaAward, soon: true },
  { to: '/admin/site-settings', label: 'Site Settings', icon: FaCog, soon: true },
];

const pageTitles = {
  '/admin/dashboard': 'Dashboard',
  '/admin/projects': 'Projects',
  '/admin/blogs': 'Blogs',
  '/admin/skills': 'Skills',
  '/admin/experience': 'Experience',
  '/admin/certifications': 'Certifications',
  '/admin/site-settings': 'Site Settings',
};

export default function AdminLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = pageTitles[pathname] || 'Admin';

  return (
    <section className="admin-shell admin-shell-v2">
      <div className="admin-layout-v2">
        <aside className="admin-sidebar">
          <div className="admin-brand">
            <div className="admin-brand-logo">IN</div>
            <div>
              <p className="admin-brand-name">Innocent</p>
              <p className="admin-brand-role">Admin</p>
            </div>
          </div>

          <div className="admin-sidebar-section">
            <div className="admin-sidebar-title">Content</div>
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
            <div className="admin-sidebar-title">Account</div>
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
              <h1 className="admin-topbar-title">{title}</h1>
              {pathname === '/admin/dashboard' && (
                <p className="admin-topbar-sub">Content overview and publishing activity</p>
              )}
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </section>
  );
}

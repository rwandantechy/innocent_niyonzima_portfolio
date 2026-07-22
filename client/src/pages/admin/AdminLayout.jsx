import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaThLarge, FaBriefcase, FaSignOutAlt } from 'react-icons/fa';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: FaThLarge, end: true },
  { to: '/admin/experience', label: 'Experience', icon: FaBriefcase },
];

export default function AdminLayout() {
  const navigate = useNavigate();

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
          <div className="admin-sidebar-title">Content</div>
          <nav className="admin-sidebar-nav">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `admin-sidebar-item ${isActive ? 'active' : ''}`}
              >
                <Icon />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            className="admin-sidebar-item"
            style={{ marginTop: 'auto' }}
            onClick={() => navigate('/admin/login')}
          >
            <FaSignOutAlt />
            <span>Exit</span>
          </button>
        </aside>

        <div className="admin-main">
          <div className="admin-topbar">
            <div className="admin-topbar-title">Admin panel</div>
            <div className="admin-topbar-actions">
              <div className="admin-avatar">A</div>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </section>
  );
}

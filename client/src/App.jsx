import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Blogs = lazy(() => import('./pages/Blogs'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ExperienceAdmin = lazy(() => import('./pages/admin/ExperienceAdmin'));
const ProjectCaseStudy = lazy(() => import('./pages/ProjectCaseStudy'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Now = lazy(() => import('./pages/Now'));
const Uses = lazy(() => import('./pages/Uses'));
const Resume = lazy(() => import('./pages/Resume'));
const Recruiters = lazy(() => import('./pages/Recruiters'));

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="route-loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/now" element={<Now />} />
          <Route path="/uses" element={<Uses />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/recruiters" element={<Recruiters />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="experience" element={<ExperienceAdmin />} />
          </Route>
        </Routes>
      </Suspense>
    </Layout>
  );
}

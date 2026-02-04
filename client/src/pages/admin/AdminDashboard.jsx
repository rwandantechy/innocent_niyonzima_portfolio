import React, { useState } from 'react';
import { useApp } from '../../context/AppProvider';

function Stat({title,value}){
  return (
    <div className="card" style={{padding:16}}>
      <div className="muted" style={{fontSize:12}}>{title}</div>
      <div style={{fontSize:28,fontWeight:700}}>{value}</div>
    </div>
  )
}

export default function AdminDashboard(){
  const projects = 12;
  const users = 341;
  const messages = 7;
  
  // admin actions from App context
  const { createProject, createBlog } = useApp();

  const [pTitle, setPTitle] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [msg, setMsg] = useState(null);

  const submitProject = async (e) => {
    e.preventDefault();
    try {
      await createProject({ title: pTitle, description: pDesc, tags: [] });
      setMsg('Project created');
      setPTitle(''); setPDesc('');
    } catch (err) { setMsg('Create project failed'); }
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    try {
      await createBlog({ title: blogTitle, content: blogContent, tags: [] });
      setMsg('Blog created');
      setBlogTitle(''); setBlogContent('');
    } catch (err) { setMsg('Create blog failed'); }
  };


  return (
    <section className="container">
      <h2 style={{color:'var(--color-text)'}}>Admin Dashboard</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginTop:12}}>
        <Stat title="Projects" value={projects} />
        <Stat title="Users" value={users} />
        <Stat title="Messages" value={messages} />
      </div>

      <div style={{marginTop:20}}>
        <div className="card">
          <h3>Recent activity</h3>
          <ul style={{marginTop:8}}>
            <li className="muted">No real data — this is a placeholder.</li>
            <li className="muted">Integrate backend later to show activity logs and metrics.</li>
          </ul>
        </div>
      </div>
      
      <div style={{marginTop:20, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
        <div className="card">
          <h3>Create Project</h3>
          <form onSubmit={submitProject}>
            <input placeholder="Title" value={pTitle} onChange={e=>setPTitle(e.target.value)} />
            <textarea placeholder="Description" value={pDesc} onChange={e=>setPDesc(e.target.value)} />
            <button type="submit">Create</button>
          </form>
        </div>

        <div className="card">
          <h3>Create Blog</h3>
          <form onSubmit={submitBlog}>
            <input placeholder="Title" value={blogTitle} onChange={e=>setBlogTitle(e.target.value)} />
            <textarea placeholder="Content" value={blogContent} onChange={e=>setBlogContent(e.target.value)} />
            <button type="submit">Create</button>
          </form>
        </div>
      </div>

      {msg && <div style={{marginTop:12}} className="muted">{msg}</div>}
    </section>
  )
}

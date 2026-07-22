import React, { useEffect, useMemo, useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaGripVertical, FaTrashAlt, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import { useApp } from '../../context/AppProvider';

const emptyForm = {
  role: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  concurrent: false,
  bulletsText: '',
  logo: '',
  published: false,
};

function SortableRow({ item, onEdit, onDelete, isActive }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`cms-row ${isActive ? 'is-editing' : ''}`}
      role="listitem"
    >
      <button
        type="button"
        className="cms-drag"
        aria-label="Drag to reorder"
        {...attributes}
        {...listeners}
      >
        <FaGripVertical />
      </button>
      <div className="cms-row-main">
        <div className="cms-row-badges">
          <span className={`cms-status ${item.published ? 'is-live' : 'is-draft'}`}>
            {item.published ? 'Live' : 'Draft'}
          </span>
          {item.concurrent && <span className="cms-status is-muted">Concurrent</span>}
        </div>
        <h4>{item.role}</h4>
        <p className="cms-card-excerpt">
          {item.company}
          {item.location ? ` · ${item.location}` : ''}
          {item.startDate
            ? ` · ${item.startDate}${item.endDate ? ` – ${item.endDate}` : ' – Present'}`
            : ''}
        </p>
        {(item.bullets || []).length > 0 && (
          <p className="cms-card-meta">{item.bullets.length} bullets</p>
        )}
      </div>
      <div className="cms-row-actions">
        <button type="button" className="cms-ghost-btn" onClick={() => onEdit(item)}>
          Edit
        </button>
        <button
          type="button"
          className="cms-icon-btn"
          aria-label={`Delete ${item.role}`}
          onClick={() => onDelete(item.id)}
        >
          <FaTrashAlt />
        </button>
      </div>
    </article>
  );
}

export default function ExperienceAdmin() {
  const {
    adminExperience = [],
    createExperience,
    updateExperience,
    deleteExperience,
    reorderExperience,
    fetchAdminContent,
  } = useApp();

  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [composerOpen, setComposerOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAdminContent?.();
  }, []);

  useEffect(() => {
    setItems([...adminExperience].sort((a, b) => (a.order || 0) - (b.order || 0)));
  }, [adminExperience]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const counts = useMemo(() => {
    const publishedCount = items.filter((i) => i.published).length;
    return {
      all: items.length,
      published: publishedCount,
      drafts: items.length - publishedCount,
    };
  }, [items]);

  const visible = useMemo(() => {
    if (filter === 'published') return items.filter((i) => i.published);
    if (filter === 'drafts') return items.filter((i) => !i.published);
    return items;
  }, [items, filter]);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const onEdit = (item) => {
    setEditingId(item.id);
    setComposerOpen(true);
    setForm({
      role: item.role || '',
      company: item.company || '',
      location: item.location || '',
      startDate: item.startDate || '',
      endDate: item.endDate || '',
      concurrent: Boolean(item.concurrent),
      bulletsText: (item.bullets || []).join('\n'),
      logo: item.logo || '',
      published: Boolean(item.published),
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    const payload = {
      role: form.role.trim(),
      company: form.company.trim(),
      location: form.location.trim(),
      startDate: form.startDate.trim(),
      endDate: form.endDate.trim() ? form.endDate.trim() : null,
      concurrent: form.concurrent,
      bullets: form.bulletsText.split('\n').map((line) => line.trim()).filter(Boolean),
      logo: form.logo.trim(),
      published: form.published,
    };

    try {
      if (editingId) {
        await updateExperience(editingId, payload);
        setMsg('Experience updated');
      } else {
        await createExperience(payload);
        setMsg('Experience created');
      }
      resetForm();
      setComposerOpen(false);
    } catch (err) {
      setMsg(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteExperience(id);
      setMsg('Experience deleted');
      if (editingId === id) {
        resetForm();
        setComposerOpen(false);
      }
    } catch (err) {
      setMsg(err.message || 'Delete failed');
    }
  };

  const onDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const next = arrayMove(items, oldIndex, newIndex);
    setItems(next);
    try {
      await reorderExperience(next.map((item) => item.id));
      setMsg('Order saved');
    } catch (err) {
      setMsg(err.message || 'Reorder failed');
      setItems([...adminExperience].sort((a, b) => (a.order || 0) - (b.order || 0)));
    }
  };

  return (
    <div className="cms cms--stack">
      <div className="cms-bar">
        <div className="cms-filters" role="tablist" aria-label="Filter experience">
          {[
            { id: 'all', label: 'All', count: counts.all },
            { id: 'published', label: 'Live', count: counts.published },
            { id: 'drafts', label: 'Drafts', count: counts.drafts },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={filter === tab.id}
              className={`cms-filter ${filter === tab.id ? 'is-active' : ''}`}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
              <span>{tab.count}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="cms-primary-btn"
          onClick={() => {
            if (composerOpen && !editingId) {
              setComposerOpen(false);
              return;
            }
            resetForm();
            setComposerOpen(true);
          }}
        >
          {composerOpen && !editingId ? <FaTimes /> : <FaPlus />}
          {composerOpen && !editingId ? 'Close' : 'New role'}
        </button>
      </div>

      {composerOpen && (
        <section className="cms-panel cms-composer-panel">
          <div className="cms-panel-head">
            <div>
              <h3>{editingId ? 'Edit role' : 'New role'}</h3>
              <p>Drag the timeline to set public display order.</p>
            </div>
          </div>
          <form className="cms-form cms-form--grid" onSubmit={onSubmit}>
            <label className="cms-field">
              <span>Role</span>
              <input
                value={form.role}
                onChange={(e) => setField('role', e.target.value)}
                placeholder="Software Engineer"
                required
                autoFocus
              />
            </label>
            <label className="cms-field">
              <span>Company</span>
              <input
                value={form.company}
                onChange={(e) => setField('company', e.target.value)}
                placeholder="Company name"
                required
              />
            </label>
            <label className="cms-field">
              <span>Location</span>
              <input
                value={form.location}
                onChange={(e) => setField('location', e.target.value)}
                placeholder="City, Country or Remote"
                required
              />
            </label>
            <div className="cms-field-row cms-field--full">
              <label className="cms-field">
                <span>Start</span>
                <input
                  value={form.startDate}
                  onChange={(e) => setField('startDate', e.target.value)}
                  placeholder="Jan 2024"
                  required
                />
              </label>
              <label className="cms-field">
                <span>End</span>
                <input
                  value={form.endDate}
                  onChange={(e) => setField('endDate', e.target.value)}
                  placeholder="Blank = Present"
                />
              </label>
            </div>
            <label className="cms-field cms-field--full">
              <span>Bullets</span>
              <textarea
                value={form.bulletsText}
                onChange={(e) => setField('bulletsText', e.target.value)}
                placeholder="One impact line per row"
                rows={4}
                required
              />
            </label>
            <label className="cms-field">
              <span>Logo URL</span>
              <input
                value={form.logo}
                onChange={(e) => setField('logo', e.target.value)}
                placeholder="Optional"
              />
            </label>
            <div className="cms-toggles cms-toggles--inline">
              <label className={`cms-switch ${form.concurrent ? 'is-on' : ''}`}>
                <input
                  type="checkbox"
                  checked={form.concurrent}
                  onChange={(e) => setField('concurrent', e.target.checked)}
                />
                <span className="cms-switch-track" aria-hidden="true" />
                <span className="cms-switch-copy"><strong>Concurrent</strong></span>
              </label>
              <label className={`cms-switch ${form.published ? 'is-on' : ''}`}>
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setField('published', e.target.checked)}
                />
                <span className="cms-switch-track" aria-hidden="true" />
                <span className="cms-switch-copy"><strong>Published</strong></span>
              </label>
            </div>
            <div className="cms-form-actions cms-field--full">
              <button type="submit" className="cms-submit" disabled={saving}>
                {editingId ? <FaSave /> : <FaPlus />}
                {saving ? 'Saving…' : editingId ? 'Update role' : 'Add role'}
              </button>
              <button
                type="button"
                className="cms-ghost-btn"
                onClick={() => {
                  resetForm();
                  setComposerOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="cms-panel cms-library-panel">
        <div className="cms-panel-head">
          <div>
            <h3>Timeline</h3>
            <p>
              Drag handles to reorder · {visible.length} shown
              {filter !== 'all' ? ' · switch to All to reorder everything' : ''}
            </p>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="cms-empty">
            <strong>No roles in this view</strong>
            <p>Add a role or switch the filter.</p>
            {!composerOpen && (
              <button type="button" className="cms-primary-btn" onClick={() => setComposerOpen(true)}>
                <FaPlus /> New role
              </button>
            )}
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={visible.map((item) => item.id)} strategy={verticalListSortingStrategy}>
              <div className="cms-table" role="list">
                {visible.map((item) => (
                  <SortableRow
                    key={item.id}
                    item={item}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isActive={editingId === item.id}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </section>

      {msg && <div className="admin-toast muted">{msg}</div>}
    </div>
  );
}

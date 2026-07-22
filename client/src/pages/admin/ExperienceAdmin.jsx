import React, { useEffect, useState } from 'react';
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
import { FaGripVertical, FaTrashAlt, FaPlus, FaSave } from 'react-icons/fa';
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

function SortableRow({ item, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="admin-list-item admin-sortable-item">
      <button type="button" className="admin-drag-handle" aria-label="Drag to reorder" {...attributes} {...listeners}>
        <FaGripVertical />
      </button>
      <div className="admin-sortable-body">
        <p className="admin-item-title">{item.role}</p>
        <p className="muted admin-item-sub">
          {item.company}
          {item.concurrent ? ' · Concurrent' : ''}
          {item.published ? ' · Published' : ' · Draft'}
        </p>
      </div>
      <div className="admin-list-actions">
        <button type="button" className="btn-outline" onClick={() => onEdit(item)}>
          Edit
        </button>
        <button type="button" className="admin-danger-btn" onClick={() => onDelete(item.id)}>
          <FaTrashAlt />
          Delete
        </button>
      </div>
    </div>
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

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const onEdit = (item) => {
    setEditingId(item.id);
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
      if (editingId === id) resetForm();
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
    <>
      <p className="muted" style={{ marginBottom: '1rem' }}>
        Drag to reorder. Unpublished roles stay off the public site.
      </p>

      <div className="admin-grid">
        <div className="card admin-card">
          <h3>{editingId ? 'Edit Experience' : 'Create Experience'}</h3>
          <form className="admin-form" onSubmit={onSubmit}>
            <input
              placeholder="Role / title"
              value={form.role}
              onChange={(e) => setField('role', e.target.value)}
              required
            />
            <input
              placeholder="Company"
              value={form.company}
              onChange={(e) => setField('company', e.target.value)}
              required
            />
            <input
              placeholder="Location"
              value={form.location}
              onChange={(e) => setField('location', e.target.value)}
              required
            />
            <div className="admin-form-row">
              <input
                placeholder="Start date (e.g. Jan 2024)"
                value={form.startDate}
                onChange={(e) => setField('startDate', e.target.value)}
                required
              />
              <input
                placeholder="End date (blank = Present)"
                value={form.endDate}
                onChange={(e) => setField('endDate', e.target.value)}
              />
            </div>
            <textarea
              placeholder="Bullets (one per line)"
              value={form.bulletsText}
              onChange={(e) => setField('bulletsText', e.target.value)}
              required
              rows={5}
            />
            <input
              placeholder="Logo URL (optional)"
              value={form.logo}
              onChange={(e) => setField('logo', e.target.value)}
            />
            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={form.concurrent}
                onChange={(e) => setField('concurrent', e.target.checked)}
              />
              <span>Concurrent with another role</span>
            </label>
            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setField('published', e.target.checked)}
              />
              <span>Published on public site</span>
            </label>
            <div className="admin-form-actions">
              <button type="submit" disabled={saving}>
                {editingId ? <FaSave /> : <FaPlus />}
                {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </button>
              {editingId && (
                <button type="button" className="btn-outline" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="card admin-card">
          <h3>Roles ({items.length})</h3>
          <p className="muted" style={{ marginBottom: '0.75rem' }}>
            Drag the handle to change display order.
          </p>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
              <div className="admin-list">
                {items.length === 0 && <p className="muted">No experience entries yet.</p>}
                {items.map((item) => (
                  <SortableRow
                    key={item.id}
                    item={item}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {msg && <div className="admin-toast muted">{msg}</div>}
    </>
  );
}

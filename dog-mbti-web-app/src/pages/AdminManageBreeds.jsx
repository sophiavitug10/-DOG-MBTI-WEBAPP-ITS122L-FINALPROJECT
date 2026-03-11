import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import {
  createAdminBreed,
  deleteAdminBreed,
  fetchAdminBreeds,
  updateAdminBreed
} from '../services/adminService';
import '../styles/AdminPages.css';

const AdminManageBreeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', mbti: '', energy: 'Low', care: '' });

  useEffect(() => {
    const loadBreeds = async () => {
      setError('');
      setIsLoading(true);

      try {
        const rows = await fetchAdminBreeds();

        setBreeds(
          rows.map((row) => ({
            id: row.id,
            name: row.name,
            mbti: row.mbti_type,
            energy: row.energy_level || 'Medium',
            care: row.care_notes || ''
          }))
        );
      } catch (err) {
        setError(err.message || 'Failed to load breeds.');
      } finally {
        setIsLoading(false);
      }
    };

    loadBreeds();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ name: '', mbti: '', energy: 'Low', care: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      name: formData.name.trim(),
      mbti_type: formData.mbti.trim().toUpperCase(),
      energy_level: formData.energy,
      care_notes: formData.care.trim()
    };

    try {
      if (editingId) {
        const updated = await updateAdminBreed(editingId, payload);
        setBreeds(
          breeds.map((breed) =>
            breed.id === editingId
              ? {
                  id: updated.id,
                  name: updated.name,
                  mbti: updated.mbti_type,
                  energy: updated.energy_level || 'Medium',
                  care: updated.care_notes || ''
                }
              : breed
          )
        );
      } else {
        const created = await createAdminBreed(payload);
        setBreeds([
          {
            id: created.id,
            name: created.name,
            mbti: created.mbti_type,
            energy: created.energy_level || 'Medium',
            care: created.care_notes || ''
          },
          ...breeds
        ]);
      }

      resetForm();
    } catch (err) {
      setError(err.message || 'Failed to save breed.');
    }
  };

  const handleEdit = (breed) => {
    setEditingId(breed.id);
    setShowForm(true);
    setFormData({
      name: breed.name,
      mbti: breed.mbti,
      energy: breed.energy,
      care: breed.care
    });
  };

  const handleDelete = async (id) => {
    setError('');
    try {
      await deleteAdminBreed(id);
      setBreeds(breeds.filter((breed) => breed.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete breed.');
    }
  };

  return (
    <AdminLayout>
      <div className="admin-hero">
        <h2>Manage Dog Breeds</h2>
        <p>Create and curate the breeds shown in Pawsonality.</p>
      </div>

      <div className="admin-actions admin-actions-row">
        <button className="admin-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add New Breed'}
        </button>
      </div>

      {error && <p className="admin-error">{error}</p>}

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <h3>{editingId ? 'Edit Breed' : 'Add Breed Details'}</h3>
          <input required type="text" name="name" placeholder="Breed Name" value={formData.name} onChange={handleInputChange} className="admin-input" />
          <input required type="text" name="mbti" placeholder="MBTI (e.g. ENFP)" value={formData.mbti} onChange={handleInputChange} className="admin-input" />
          
          <select name="energy" value={formData.energy} onChange={handleInputChange} className="admin-select">
            <option value="Low">Low Energy</option>
            <option value="Medium">Medium Energy</option>
            <option value="High">High Energy</option>
          </select>

          <textarea required name="care" placeholder="Care Needs & Description" value={formData.care} onChange={handleInputChange} className="admin-textarea" />
          
          <button type="submit" className="admin-btn-success">{editingId ? 'Update Breed' : 'Save Breed'}</button>
        </form>
      )}

      <div className="admin-table-wrap">
        {isLoading ? (
          <p className="admin-empty">Loading breeds...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Breed Name</th>
                <th>MBTI Match</th>
                <th>Energy Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {breeds.map((breed) => (
                <tr key={breed.id}>
                  <td><strong>{breed.name}</strong></td>
                  <td>{breed.mbti}</td>
                  <td>{breed.energy}</td>
                  <td>
                    <div className="admin-row-actions">
                      <button className="admin-btn-alt" onClick={() => handleEdit(breed)}>Edit</button>
                      <button className="admin-btn-danger" onClick={() => handleDelete(breed.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminManageBreeds;
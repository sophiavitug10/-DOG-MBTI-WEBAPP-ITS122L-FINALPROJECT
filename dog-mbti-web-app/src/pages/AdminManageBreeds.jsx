import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPages.css';

const AdminManageBreeds = () => {
  // Mock data highlighting lesser-known breeds!
  const [breeds, setBreeds] = useState([
    { id: 1, name: 'Basenji', mbti: 'ISTP', energy: 'High', care: 'Low grooming, needs mental stimulation' },
    { id: 2, name: 'Lagotto Romagnolo', mbti: 'ENFJ', energy: 'Medium', care: 'High grooming, very affectionate' }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', mbti: '', energy: 'Low', care: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBreed = { ...formData, id: Date.now() };
    setBreeds([...breeds, newBreed]);
    setFormData({ name: '', mbti: '', energy: 'Low', care: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setBreeds(breeds.filter(breed => breed.id !== id));
  };

  return (
    <div className="admin-main">
      <div className="admin-hero">
        <h2>Manage Dog Breeds</h2>
        <p>Create and curate the breeds shown in Pawsonality.</p>
      </div>

      <div className="admin-actions" style={{ display: 'flex', gap: '10px' }}>
        <Link to="/admin" className="admin-link" style={{ background: '#2f3b49', color: '#fff' }}>Back to Dashboard</Link>
        <button className="admin-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : '+ Add New Breed'}
      </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <h3>Add Breed Details</h3>
          <input required type="text" name="name" placeholder="Breed Name" value={formData.name} onChange={handleInputChange} className="admin-input" />
          <input required type="text" name="mbti" placeholder="MBTI (e.g. ENFP)" value={formData.mbti} onChange={handleInputChange} className="admin-input" />
          
          <select name="energy" value={formData.energy} onChange={handleInputChange} className="admin-select">
            <option value="Low">Low Energy</option>
            <option value="Medium">Medium Energy</option>
            <option value="High">High Energy</option>
          </select>

          <textarea required name="care" placeholder="Care Needs & Description" value={formData.care} onChange={handleInputChange} className="admin-textarea" />
          
          <div className="admin-tag">Image upload placeholder</div>
          
          <button type="submit" className="admin-btn-success">Save Breed</button>
        </form>
      )}

      <div className="admin-table-wrap">
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
                  <button className="admin-btn-alt" onClick={() => alert('Edit clicked! (Implement for final)')}>Edit</button>
                  <button className="admin-btn-danger" onClick={() => handleDelete(breed.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AdminManageBreeds;
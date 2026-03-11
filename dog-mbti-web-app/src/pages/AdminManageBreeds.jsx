//admin manage breed page for the admin to view, add, edit, and delete the dog breeds
import React, { useState } from 'react';

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
    // Create a fake ID for the demo
    const newBreed = { ...formData, id: Date.now() };
    setBreeds([...breeds, newBreed]);
    setFormData({ name: '', mbti: '', energy: 'Low', care: '' }); // Reset form
    setShowForm(false); // Hide form
  };

  const handleDelete = (id) => {
    setBreeds(breeds.filter(breed => breed.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2>Manage Dog Breeds</h2>
      <button style={styles.button} onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : '+ Add New Breed'}
      </button>

      {/* ADD BREED FORM */}
      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3>Add Breed Details</h3>
          <input required type="text" name="name" placeholder="Breed Name" value={formData.name} onChange={handleInputChange} style={styles.input} />
          <input required type="text" name="mbti" placeholder="MBTI (e.g. ENFP)" value={formData.mbti} onChange={handleInputChange} style={styles.input} />
          
          <select name="energy" value={formData.energy} onChange={handleInputChange} style={styles.input}>
            <option value="Low">Low Energy</option>
            <option value="Medium">Medium Energy</option>
            <option value="High">High Energy</option>
          </select>

          <textarea required name="care" placeholder="Care Needs & Description" value={formData.care} onChange={handleInputChange} style={{...styles.input, height: '60px'}} />
          
          <div style={styles.imagePlaceholder}>📷 Click to upload image (Mock)</div>
          
          <button type="submit" style={styles.submitButton}>Save Breed</button>
        </form>
      )}

      {/* DATA TABLE */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th>Breed Name</th>
            <th>MBTI Match</th>
            <th>Energy Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {breeds.map((breed) => (
            <tr key={breed.id} style={styles.tableRow}>
              <td><strong>{breed.name}</strong></td>
              <td>{breed.mbti}</td>
              <td>{breed.energy}</td>
              <td>
                <button style={styles.editBtn} onClick={() => alert('Edit clicked! (Implement for final)')}>Edit</button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(breed.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Reusable styles
const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  button: { padding: '10px 15px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' },
  submitButton: { padding: '10px 15px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' },
  input: { padding: '10px', border: '1px solid #ccc', borderRadius: '4px' },
  imagePlaceholder: { padding: '20px', border: '2px dashed #ccc', textAlign: 'center', color: '#7f8c8d', cursor: 'pointer', backgroundColor: '#ecf0f1' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  tableHeader: { backgroundColor: '#2c3e50', color: 'white', textAlign: 'left', padding: '10px' },
  tableRow: { borderBottom: '1px solid #ddd' },
  editBtn: { marginRight: '10px', padding: '5px 10px', backgroundColor: '#f1c40f', border: 'none', cursor: 'pointer', borderRadius: '3px' },
  deleteBtn: { padding: '5px 10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px' }
};

export default AdminManageBreeds;
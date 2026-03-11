import React, { useState } from 'react';

const AdminManageQuestions = () => {
  const [questions, setQuestions] = useState([
    { 
      id: 1, 
      text: 'When at the dog park, your ideal dog...', 
      traitPair: 'E vs I',
      optionA: 'Plays with every dog', traitA: 'Extroversion (E)',
      optionB: 'Stays by my side', traitB: 'Introversion (I)'
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ text: '', traitPair: 'E vs I', optionA: '', traitA: 'E', optionB: '', traitB: 'I' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestions([...questions, { ...formData, id: Date.now() }]);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2>Manage Quiz Questions</h2>
      <button style={styles.button} onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : '+ Add New Question'}
      </button>

      {/* ADD QUESTION FORM */}
      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input required type="text" name="text" placeholder="Question Text (e.g., What is your weekend routine?)" value={formData.text} onChange={handleInputChange} style={styles.input} />
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <h4>Option A</h4>
              <input required type="text" name="optionA" placeholder="Answer A text" onChange={handleInputChange} style={{...styles.input, width: '90%'}} />
            </div>
            <div style={{ flex: 1 }}>
              <h4>Option B</h4>
              <input required type="text" name="optionB" placeholder="Answer B text" onChange={handleInputChange} style={{...styles.input, width: '90%'}} />
            </div>
          </div>

          <button type="submit" style={styles.submitButton}>Save Question</button>
        </form>
      )}

      {/* DATA TABLE */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={{ padding: '10px' }}>Question</th>
            <th style={{ padding: '10px' }}>Target Traits</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id} style={styles.tableRow}>
              <td style={{ padding: '10px' }}><strong>{q.text}</strong><br/>
                <small>A: {q.optionA} | B: {q.optionB}</small>
              </td>
              <td style={{ padding: '10px' }}>{q.traitPair}</td>
              <td style={{ padding: '10px' }}>
                <button style={styles.deleteBtn} onClick={() => handleDelete(q.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Reusing the same styles block from ManageBreeds to keep it consistent!
const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  button: { padding: '10px 15px', backgroundColor: '#9b59b6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' },
  submitButton: { padding: '10px 15px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' },
  input: { padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '5px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  tableHeader: { backgroundColor: '#2c3e50', color: 'white', textAlign: 'left' },
  tableRow: { borderBottom: '1px solid #ddd' },
  deleteBtn: { padding: '5px 10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px' }
};

export default AdminManageQuestions;
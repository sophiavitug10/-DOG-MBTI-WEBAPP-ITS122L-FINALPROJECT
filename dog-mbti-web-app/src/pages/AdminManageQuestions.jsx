import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPages.css';

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
    <div className="admin-main">
      <div className="admin-hero">
        <h2>Manage Quiz Questions</h2>
        <p>Add and maintain MBTI mapping questions for the quiz engine.</p>
      </div>

      <div className="admin-actions" style={{ display: 'flex', gap: '10px' }}>
        <Link to="/admin" className="admin-link" style={{ background: '#2f3b49', color: '#fff' }}>Back to Dashboard</Link>
        <button className="admin-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : '+ Add New Question'}
      </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <input required type="text" name="text" placeholder="Question Text (e.g., What is your weekend routine?)" value={formData.text} onChange={handleInputChange} className="admin-input" />
          
          <div className="admin-form-grid">
            <div>
              <h4>Option A</h4>
              <input required type="text" name="optionA" placeholder="Answer A text" onChange={handleInputChange} className="admin-input" />
            </div>
            <div>
              <h4>Option B</h4>
              <input required type="text" name="optionB" placeholder="Answer B text" onChange={handleInputChange} className="admin-input" />
            </div>
          </div>

          <button type="submit" className="admin-btn-success">Save Question</button>
        </form>
      )}

      <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Target Traits</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td><strong>{q.text}</strong><br/>
                <small>A: {q.optionA} | B: {q.optionB}</small>
              </td>
              <td>{q.traitPair}</td>
              <td>
                <button className="admin-btn-danger" onClick={() => handleDelete(q.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AdminManageQuestions;
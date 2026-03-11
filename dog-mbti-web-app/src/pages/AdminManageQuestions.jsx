import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { createAdminQuestion, deleteAdminQuestion, fetchAdminQuestions } from '../services/adminService';
import '../styles/AdminPages.css';

const AdminManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ text: '', traitPair: 'E vs I', optionA: '', traitA: 'E', optionB: '', traitB: 'I' });

  useEffect(() => {
    const loadQuestions = async () => {
      setError('');
      setIsLoading(true);
      try {
        const rows = await fetchAdminQuestions();
        setQuestions(
          rows.map((row) => ({
            id: row.id,
            text: row.question_text,
            traitPair: row.trait_pair,
            optionA: row.option_a,
            traitA: row.trait_a,
            optionB: row.option_b,
            traitB: row.trait_b
          }))
        );
      } catch (err) {
        setError(err.message || 'Failed to load questions.');
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const created = await createAdminQuestion({
        question_text: formData.text.trim(),
        trait_pair: formData.traitPair,
        option_a: formData.optionA.trim(),
        trait_a: formData.traitA,
        option_b: formData.optionB.trim(),
        trait_b: formData.traitB
      });

      setQuestions([
        {
          id: created.id,
          text: created.question_text,
          traitPair: created.trait_pair,
          optionA: created.option_a,
          traitA: created.trait_a,
          optionB: created.option_b,
          traitB: created.trait_b
        },
        ...questions
      ]);
      setShowForm(false);
      setFormData({ text: '', traitPair: 'E vs I', optionA: '', traitA: 'E', optionB: '', traitB: 'I' });
    } catch (err) {
      setError(err.message || 'Failed to save question.');
    }
  };

  const handleDelete = async (id) => {
    setError('');
    try {
      await deleteAdminQuestion(id);
      setQuestions(questions.filter((q) => q.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete question.');
    }
  };

  return (
    <AdminLayout>
      <div className="admin-hero">
        <h2>Manage Quiz Questions</h2>
        <p>Add and maintain MBTI mapping questions for the quiz engine.</p>
      </div>

      <div className="admin-actions admin-actions-row">
        <button className="admin-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add New Question'}
        </button>
      </div>

      {error && <p className="admin-error">{error}</p>}

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
        {isLoading ? (
          <p className="admin-empty">Loading questions...</p>
        ) : (
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
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminManageQuestions;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useQuiz } from '../context/QuizContext';
import { getMBTIDescription } from '../utils/mbtiCalculator';
import '../styles/ResultsPage.css';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { resultHistory, removeResult } = useQuiz();

  const handleRemoveResult = async (id) => {
    try {
      await removeResult(id);
    } catch (error) {
      window.alert(error.message || 'Failed to remove result.');
    }
  };

  if (!resultHistory || resultHistory.length === 0) {
    return (
      <>
        <NavBar />
        <div className="page-container">
          <div className="no-results">
            <h1>No Quiz Results Found</h1>
            <p>Complete a quiz to generate your first result.</p>
            <button onClick={() => navigate('/quiz')} className="cta-button">
              Take the Quiz
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="page-container results-container">
        <div className="results-header">
          <h1>Your Quiz Results</h1>
          <p className="results-subtitle">Each container is one submission. Open to view full answers and recommended breed.</p>
        </div>

        <div className="result-list-grid">
          {resultHistory.map((result) => (
            <div key={result.id} className="result-summary-card">
              <p className="result-summary-date">{new Date(result.completedAt).toLocaleString()}</p>
              <h3>{result.mbtiType}</h3>
              <p className="result-summary-desc">{getMBTIDescription(result.mbtiType)}</p>
              <p className="result-summary-breed">Recommended Breed: {result.compatibleBreed?.name || 'Unknown'}</p>

              <div className="result-summary-actions">
                <button className="open-result-btn" onClick={() => navigate(`/results/${result.id}`)}>
                  Open Result
                </button>
                <button className="remove-result-btn" onClick={() => handleRemoveResult(result.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="results-actions">
          <button onClick={() => navigate('/quiz')} className="retake-btn">
            New Submission
          </button>
          <button onClick={() => navigate('/breeds')} className="explore-breeds-btn">
            Explore All Breeds
          </button>
        </div>
      </div>
    </>
  );
}

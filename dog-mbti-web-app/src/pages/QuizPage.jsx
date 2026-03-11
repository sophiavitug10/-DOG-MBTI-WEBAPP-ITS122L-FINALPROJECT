import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { quizQuestions } from '../data/questions';
import { processDogMBTIQuiz } from '../utils/mbtiCalculator';
import { useQuiz } from '../context/QuizContext';
import '../styles/QuizPage.css';

export default function QuizPage() {
  const navigate = useNavigate();
  const { submitQuiz } = useQuiz();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showProgress, setShowProgress] = useState(true);

  const handleAnswerSelect = (value) => {
    const newAnswer = {
      questionId: quizQuestions[currentQuestion].id,
      value: value
    };
    
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed
      completeQuiz(updatedAnswers);
    }
  };

  const completeQuiz = (finalAnswers) => {
    // Process quiz results
    const result = processDogMBTIQuiz(finalAnswers);
    
    // Store in context
    submitQuiz(finalAnswers, result.mbtiType, result.compatibleBreed, result.traitScores);
    
    // Navigate to results
    navigate('/results');
  };

  const handleSkipQuestion = () => {
    // Skip to next question without answering
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleGoBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <>
      <NavBar />
      <div className="page-container">
        <div className="quiz-container">
          <div className="quiz-header">
            <h1>Dog MBTI Quiz</h1>
            <p className="quiz-subtitle">Discover your perfect dog match!</p>
          </div>

          {/* Progress Bar */}
          <div className="progress-section">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-text">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </div>
          </div>

          {/* Question Card */}
          <div className="question-card">
            <h2 className="question-text">{question.question}</h2>
            
            <div className="options-container">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  className="option-button"
                  onClick={() => handleAnswerSelect(option.value)}
                >
                  <span className="option-radio"></span>
                  <span className="option-text">{option.text}</span>
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="quiz-navigation">
              <button
                className="nav-button back-btn"
                onClick={handleGoBack}
                disabled={currentQuestion === 0}
              >
                ← Back
              </button>
              
              <div className="nav-info">
                {currentQuestion > 0 && (
                  <span className="answered-count">
                    {currentQuestion} answer{currentQuestion !== 1 ? 's' : ''} recorded
                  </span>
                )}
              </div>

              {currentQuestion === quizQuestions.length - 1 && answers.length === currentQuestion + 1 && (
                <button
                  className="nav-button submit-btn"
                  onClick={() => completeQuiz(answers)}
                >
                  See Results →
                </button>
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className="quiz-info">
            <h3>About This Quiz</h3>
            <p>
              This quiz uses the Myers-Briggs Type Indicator (MBTI) to determine your personality type,
              and matches you with a dog breed that complements your personality and lifestyle.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

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
  const [interactionError, setInteractionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswerSelect = (value) => {
    const newAnswer = {
      questionId: quizQuestions[currentQuestion].id,
      value
    };

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = newAnswer;
    setAnswers(updatedAnswers);
    setInteractionError('');
  };

  const completeQuiz = async (finalAnswers) => {
    setIsSubmitting(true);

    try {
      const result = processDogMBTIQuiz(finalAnswers);
      const saved = await submitQuiz(finalAnswers, result.mbtiType, result.compatibleBreed, result.traitScores);
      navigate(`/results/${saved.id}`);
    } catch (error) {
      setInteractionError(error.message || 'Failed to submit quiz. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (!answers[currentQuestion]) {
      setInteractionError('Select an answer before moving to the next question.');
      return;
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setInteractionError('');
    }
  };

  const handleGoBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setInteractionError('');
    }
  };

  const handleSubmitQuiz = () => {
    const allAnswered = answers.filter(Boolean);
    if (allAnswered.length !== quizQuestions.length) {
      setInteractionError('Please answer all questions before submitting.');
      return;
    }
    completeQuiz(allAnswered);
  };

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const selectedValue = answers[currentQuestion]?.value;
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

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
                  className={`option-button ${selectedValue === option.value ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(option.value)}
                >
                  <span className="option-radio"></span>
                  <span className="option-text">{option.text}</span>
                </button>
              ))}
            </div>

            {interactionError && <p className="interaction-error">{interactionError}</p>}

            <div className="quiz-navigation">
              <button
                className="nav-button back-btn"
                onClick={handleGoBack}
                disabled={currentQuestion === 0}
              >
                ← Back
              </button>
              
              <div className="nav-info"></div>

              {!isLastQuestion ? (
                <button className="nav-button submit-btn" onClick={handleNext}>
                  Next →
                </button>
              ) : (
                <button
                  className="nav-button submit-btn"
                  onClick={handleSubmitQuiz}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Quiz →'}
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

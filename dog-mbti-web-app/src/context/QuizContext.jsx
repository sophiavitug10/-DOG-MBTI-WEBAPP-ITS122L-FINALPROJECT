import React, { createContext, useState, useContext } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizResults, setQuizResults] = useState(null);
  const [answers, setAnswers] = useState([]);

  const submitQuiz = (answers, mbtiType, compatibleBreed, traitScores) => {
    setQuizResults({
      answers,
      mbtiType,
      compatibleBreed,
      traitScores,
      completedAt: new Date()
    });
    setAnswers(answers);
  };

  const resetQuiz = () => {
    setQuizResults(null);
    setAnswers([]);
  };

  return (
    <QuizContext.Provider value={{ quizResults, setQuizResults, answers, setAnswers, submitQuiz, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider');
  }
  return context;
};

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getBreedByName } from '../data/breeds';
import { createQuizResult, deleteQuizResult, fetchQuizResults } from '../services/dbService';

const QuizContext = createContext();
const HISTORY_KEY = 'pawsonality_result_history';

const loadHistory = () => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveHistory = (history) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const QuizProvider = ({ children }) => {
  const { user } = useAuth();
  const [quizResults, setQuizResults] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [resultHistory, setResultHistory] = useState(loadHistory());

  useEffect(() => {
    const loadRemoteResults = async () => {
      if (!user?.id) {
        return;
      }

      try {
        const rows = await fetchQuizResults({ userId: user.id });
        const mapped = rows.map((row) => {
          const mappedBreed = getBreedByName(row.compatible_breed) || { name: row.compatible_breed };

          return {
            id: row.id,
            answers: Array.isArray(row.answers) ? row.answers : [],
            mbtiType: row.mbti_type,
            compatibleBreed: mappedBreed,
            traitScores: row.trait_scores || {},
            completedAt: row.completed_at
          };
        });

        setResultHistory(mapped);
        saveHistory(mapped);
        setQuizResults(mapped[0] || null);
      } catch {
        // Keep local history as fallback if Supabase query fails.
      }
    };

    loadRemoteResults();
  }, [user?.id]);

  const submitQuiz = async (answers, mbtiType, compatibleBreed, traitScores) => {
    if (user?.id) {
      const saved = await createQuizResult({
        userId: user.id,
        mbtiType,
        compatibleBreed: compatibleBreed?.name || compatibleBreed || 'Unknown',
        traitScores,
        answers
      });

      const resultRecord = {
        id: saved.id,
        answers: Array.isArray(saved.answers) ? saved.answers : answers,
        mbtiType: saved.mbti_type,
        compatibleBreed: getBreedByName(saved.compatible_breed) || { name: saved.compatible_breed },
        traitScores: saved.trait_scores || traitScores,
        completedAt: saved.completed_at
      };

      setQuizResults(resultRecord);
      setAnswers(resultRecord.answers);

      const updatedHistory = [resultRecord, ...resultHistory];
      setResultHistory(updatedHistory);
      saveHistory(updatedHistory);

      return resultRecord;
    }

    const resultRecord = {
      id: Date.now().toString(),
      answers,
      mbtiType,
      compatibleBreed,
      traitScores,
      completedAt: new Date()
    };

    setQuizResults(resultRecord);
    setAnswers(answers);

    const updatedHistory = [resultRecord, ...resultHistory];
    setResultHistory(updatedHistory);
    saveHistory(updatedHistory);

    return resultRecord;
  };

  const getResultById = (id) => resultHistory.find((result) => result.id === id) || null;

  const removeResult = async (id) => {
    if (user?.id) {
      await deleteQuizResult({ resultId: id, userId: user.id });
    }

    const updatedHistory = resultHistory.filter((result) => String(result.id) !== String(id));
    setResultHistory(updatedHistory);
    saveHistory(updatedHistory);

    if (String(quizResults?.id) === String(id)) {
      setQuizResults(updatedHistory[0] || null);
    }
  };

  const resetQuiz = () => {
    setQuizResults(null);
    setAnswers([]);
  };

  return (
    <QuizContext.Provider
      value={{
        quizResults,
        setQuizResults,
        answers,
        setAnswers,
        submitQuiz,
        resetQuiz,
        resultHistory,
        getResultById,
        removeResult
      }}
    >
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

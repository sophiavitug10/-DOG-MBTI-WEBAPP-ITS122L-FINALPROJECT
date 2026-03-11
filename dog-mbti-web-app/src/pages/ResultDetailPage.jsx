import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import NavBar from '../components/NavBar';
import { useQuiz } from '../context/QuizContext';
import { getMBTIDescription } from '../utils/mbtiCalculator';
import { getTraitScores, quizQuestions } from '../data/questions';
import '../styles/ResultDetailPage.css';

import GoldenRetriever from '../assets/Golden_Retriever.png';
import GermanShepherd from '../assets/German_Shepherd.png';
import Labrador from '../assets/Labrador.png';
import Husky from '../assets/Husky.png';
import Dobermann from '../assets/Dobermann.png';
import FrenchBulldog from '../assets/French_Bulldog.png';
import Pug from '../assets/Pug.png';
import BorderCollie from '../assets/Border_Collie.png';
import KingCharles from '../assets/King_Charles.png';

const imageMap = {
  'Golden_Retriever.png': GoldenRetriever,
  'German_Shepherd.png': GermanShepherd,
  'Labrador.png': Labrador,
  'Husky.png': Husky,
  'Dobermann.png': Dobermann,
  'French_Bulldog.png': FrenchBulldog,
  'Pug.png': Pug,
  'Border_Collie.png': BorderCollie,
  'King_Charles.png': KingCharles
};

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ResultDetailPage() {
  const navigate = useNavigate();
  const { resultId } = useParams();
  const { getResultById } = useQuiz();

  const result = getResultById(resultId);

  if (!result) {
    return (
      <>
        <NavBar />
        <div className="page-container">
          <div className="no-results">
            <h1>Result Not Found</h1>
            <p>This result may have been removed.</p>
            <button onClick={() => navigate('/results')} className="cta-button">Back to Results</button>
          </div>
        </div>
      </>
    );
  }

  const baseTraitScores = result.traitScores || {
    extroversion: 0,
    introversion: 0,
    sensing: 0,
    intuition: 0,
    thinking: 0,
    feeling: 0,
    judging: 0,
    perceiving: 0
  };

  const hasStoredValues = Object.values(baseTraitScores).some((value) => Number(value) > 0);
  const traitScores = hasStoredValues
    ? baseTraitScores
    : getTraitScores(Array.isArray(result.answers) ? result.answers : []);

  const traitValueItems = [
    { label: 'Extroversion (E)', value: traitScores.extroversion || 0 },
    { label: 'Introversion (I)', value: traitScores.introversion || 0 },
    { label: 'Sensing (S)', value: traitScores.sensing || 0 },
    { label: 'Intuition (N)', value: traitScores.intuition || 0 },
    { label: 'Thinking (T)', value: traitScores.thinking || 0 },
    { label: 'Feeling (F)', value: traitScores.feeling || 0 },
    { label: 'Judging (J)', value: traitScores.judging || 0 },
    { label: 'Perceiving (P)', value: traitScores.perceiving || 0 }
  ];

  const chartData = {
    labels: ['Extroversion', 'Introversion', 'Sensing', 'Intuition', 'Thinking', 'Feeling', 'Judging', 'Perceiving'],
    datasets: [
      {
        label: 'Your MBTI Scores',
        data: [
          traitScores.extroversion || 0,
          traitScores.introversion || 0,
          traitScores.sensing || 0,
          traitScores.intuition || 0,
          traitScores.thinking || 0,
          traitScores.feeling || 0,
          traitScores.judging || 0,
          traitScores.perceiving || 0
        ],
        backgroundColor: ['#ff8d2a', '#ea4e32', '#2f3b49', '#5d6a79', '#cf7b20', '#ac3d2e', '#40607f', '#7a8ba0']
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Personality Breakdown' }
    },
    scales: { y: { beginAtZero: true, max: 8 } }
  };

  const answerDetails = quizQuestions
    .map((question) => {
      const found = result.answers.find((answer) => answer.questionId === question.id);
      if (!found) {
        return null;
      }
      const option = question.options.find((item) => item.value === found.value);
      return {
        questionId: question.id,
        questionText: question.question,
        selectedText: option?.text || found.value
      };
    })
    .filter(Boolean);

  return (
    <>
      <NavBar />
      <div className="page-container results-container">
        <div className="results-header">
          <h1>Quiz Result Detail</h1>
          <p className="results-subtitle">{new Date(result.completedAt).toLocaleString()}</p>
        </div>

        <div className="mbti-result-card">
          <div className="mbti-type-display">
            <h2>Your MBTI Type: <span className="mbti-value">{result.mbtiType}</span></h2>
            <p className="mbti-description">{getMBTIDescription(result.mbtiType)}</p>
          </div>
        </div>

        <div className="compatible-breed-section">
          <h2>Your Compatible Dog Breed</h2>
          {result.compatibleBreed ? (
            <>
              <div className="breed-image-showcase">
                <img src={imageMap[result.compatibleBreed.image]} alt={result.compatibleBreed.name} className="breed-result-image" />
              </div>

              <div className="breed-result-card">
                <div className="breed-result-info">
                  <h3>{result.compatibleBreed.name}</h3>
                  <p className="breed-mbti-match">MBTI Match: <strong>{result.compatibleBreed.mbtiType}</strong></p>
                  <p className="breed-result-description">{result.compatibleBreed.description}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="no-breed-match">No matching breed found.</p>
          )}
        </div>

        <div className="chart-section">
          <h2>Personality Breakdown</h2>
          <div className="chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="trait-values-grid">
            {traitValueItems.map((item) => (
              <div key={item.label} className="trait-value-item">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="answers-section">
          <h2>Your Submitted Answers</h2>
          <div className="answers-list">
            {answerDetails.map((item) => (
              <div key={item.questionId} className="answer-item">
                <p className="answer-question">Q{item.questionId}. {item.questionText}</p>
                <p className="answer-choice">Your answer: {item.selectedText}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="results-actions">
          <button onClick={() => navigate('/results')} className="retake-btn">Back to All Results</button>
          <button onClick={() => navigate('/quiz')} className="explore-breeds-btn">Take New Quiz</button>
        </div>
      </div>
    </>
  );
}

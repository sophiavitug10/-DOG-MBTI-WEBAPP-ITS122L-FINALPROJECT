import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import NavBar from '../components/NavBar';
import { useQuiz } from '../context/QuizContext';
import { getMBTIDescription } from '../utils/mbtiCalculator';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/ResultsPage.css';

// Import all dog images
import GoldenRetriever from '../assets/Golden_Retriever.png';
import GermanShepherd from '../assets/German_Shepherd.png';
import Labrador from '../assets/Labrador.png';
import Husky from '../assets/Husky.png';
import Dobermann from '../assets/Dobermann.png';
import FrenchBulldog from '../assets/French_Bulldog.png';
import Pug from '../assets/Pug.png';
import BorderCollie from '../assets/Border_Collie.png';
import KingCharles from '../assets/King_Charles.png';

// Map image names to imported images
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

export default function ResultsPage() {
  const navigate = useNavigate();
  const { quizResults } = useQuiz();

  if (!quizResults) {
    return (
      <>
        <NavBar />
        <div className="page-container">
          <div className="no-results">
            <h1>No Quiz Results Found</h1>
            <p>Please complete the quiz to see your results.</p>
            <button onClick={() => navigate('/quiz')} className="cta-button">
              Take the Quiz
            </button>
          </div>
        </div>
      </>
    );
  }

  const { mbtiType, compatibleBreed, traitScores } = quizResults;

  // Prepare data for the chart
  const chartData = {
    labels: [
      'Extroversion',
      'Introversion',
      'Sensing',
      'Intuition',
      'Thinking',
      'Feeling',
      'Judging',
      'Perceiving'
    ],
    datasets: [
      {
        label: 'Your MBTI Scores',
        data: [
          traitScores.extroversion,
          traitScores.introversion,
          traitScores.sensing,
          traitScores.intuition,
          traitScores.thinking,
          traitScores.feeling,
          traitScores.judging,
          traitScores.perceiving
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
          'rgba(83, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Your MBTI Personality Breakdown'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 8
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="page-container results-container">
        {/* Results Header */}
        <div className="results-header">
          <h1>Your Dog MBTI Result</h1>
          <p className="results-subtitle">Discover your perfect dog match!</p>
        </div>

        {/* MBTI Type Display */}
        <div className="mbti-result-card">
          <div className="mbti-type-display">
            <h2>Your MBTI Type: <span className="mbti-value">{mbtiType}</span></h2>
            <p className="mbti-description">{getMBTIDescription(mbtiType)}</p>
          </div>
        </div>

        {/* Compatible Breed Section */}
        <div className="compatible-breed-section">
          <h2>Your Compatible Dog Breed</h2>
          {compatibleBreed ? (
            <>
              {/* Breed Image Section */}
              <div className="breed-image-showcase">
                <img
                  src={imageMap[compatibleBreed.image]}
                  alt={compatibleBreed.name}
                  className="breed-result-image"
                />
              </div>

              {/* Breed Info Section */}
              <div className="breed-result-card">
                <div className="breed-result-info">
                  <h3>{compatibleBreed.name}</h3>
                  <p className="breed-mbti-match">
                    MBTI Match: <strong>{compatibleBreed.mbtiType}</strong>
                  </p>
                  <p className="breed-result-description">{compatibleBreed.description}</p>

                  <div className="breed-characteristics">
                    <h4>Why This Breed Matches You:</h4>
                    <div className="breed-characteristics-list">
                      {compatibleBreed.characteristics.map((char, idx) => (
                        <div key={idx} className="breed-char-item">{char}</div>
                      ))}
                    </div>
                    </div>

                  <div className="breed-traits">
                    <h4>Key Traits:</h4>
                    <div className="traits-list">
                      {compatibleBreed.traits.map((trait, idx) => (
                        <span key={idx} className="trait-badge">{trait}</span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/breeds')}
                    className="explore-btn"
                  >
                    Learn More in Breed Profiles →
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="no-breed-match">No matching breed found. Please retake the quiz.</p>
          )}
        </div>

        {/* Chart Section */}
        <div className="chart-section">
          <h2>Personality Breakdown</h2>
          <div className="chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="personality-breakdown">
          <h2>What Your Results Mean</h2>
          <div className="breakdown-grid">
            <div className="breakdown-item">
              <h4>Extroversion vs Introversion</h4>
              <p>
                Extroversion ({traitScores.extroversion}) / Introversion ({traitScores.introversion})
              </p>
              <p className="breakdown-desc">
                {traitScores.extroversion > traitScores.introversion
                  ? 'You are energized by social interactions and external stimulation.'
                  : 'You are energized by quiet reflection and internal processing.'}
              </p>
            </div>

            <div className="breakdown-item">
              <h4>Sensing vs Intuition</h4>
              <p>
                Sensing ({traitScores.sensing}) / Intuition ({traitScores.intuition})
              </p>
              <p className="breakdown-desc">
                {traitScores.sensing > traitScores.intuition
                  ? 'You focus on concrete facts and practical information.'
                  : 'You focus on patterns, meanings, and possibilities.'}
              </p>
            </div>

            <div className="breakdown-item">
              <h4>Thinking vs Feeling</h4>
              <p>
                Thinking ({traitScores.thinking}) / Feeling ({traitScores.feeling})
              </p>
              <p className="breakdown-desc">
                {traitScores.thinking > traitScores.feeling
                  ? 'You make decisions based on logic and objective principles.'
                  : 'You make decisions based on values and personal impact.'}
              </p>
            </div>

            <div className="breakdown-item">
              <h4>Judging vs Perceiving</h4>
              <p>
                Judging ({traitScores.judging}) / Perceiving ({traitScores.perceiving})
              </p>
              <p className="breakdown-desc">
                {traitScores.judging > traitScores.perceiving
                  ? 'You prefer structure, planning, and closure.'
                  : 'You prefer flexibility, spontaneity, and keeping options open.'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="results-actions">
          <button onClick={() => navigate('/quiz')} className="retake-btn">
            Retake Quiz
          </button>
          <button onClick={() => navigate('/breeds')} className="explore-breeds-btn">
            Explore All Breeds
          </button>
        </div>
      </div>
    </>
  );
}

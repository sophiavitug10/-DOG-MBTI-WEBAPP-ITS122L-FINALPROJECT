import React from 'react';
import { Bar } from 'react-chartjs-2';
import NavBar from '../components/NavBar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


// TODO: I'll Replace with real MBTI result and traitScores from quiz logic or context when theyre ready. For now, these are just placeholders to avoid errors.
const mbtiResult = null;
const data = null;
const options = null;

export default function ResultsPage() {
  return (
    <>
      <NavBar />
      <div className="page-container">
        <h1>Your Dog MBTI Result</h1>
        <p>Result will appear here after you complete the quiz.</p>
        <div style={{ maxWidth: 600, margin: '0 auto', background: '#eee', padding: 20, textAlign: 'center' }}>
          Chart will appear here
        </div>
      </div>
    </>
  );
}

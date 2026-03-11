import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { dogBreeds } from '../data/breeds';
import '../styles/HomePage.css';

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

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dogBreeds.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === dogBreeds.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentBreed = dogBreeds[currentIndex];

  return (
    <>
      <NavBar />
      <div className="page-container">
        <div className="hero-section">
          <h1>Welcome to Paws & Personalities</h1>
          <p className="hero-subtitle">Find your perfect dog match based on your personality!</p>
        </div>

        {/* Carousel Section */}
        <div className="carousel-container">
          <div className="carousel">
            <button className="carousel-btn prev-btn" onClick={handlePrevious}>❮</button>
            
            <div className="carousel-content">
              <div className="breed-card-large">
                <img 
                  src={imageMap[currentBreed.image]}
                  alt={currentBreed.name}
                  className="breed-image-large"
                />
                <div className="breed-info-large">
                  <h2>{currentBreed.name}</h2>
                  <p className="mbti-type">MBTI Type: <strong>{currentBreed.mbtiType}</strong></p>
                  <div className="traits-display">
                    {currentBreed.traits.map((trait, idx) => (
                      <span key={idx} className="trait-badge">{trait}</span>
                    ))}
                  </div>
                  <p className="breed-description">{currentBreed.description}</p>
                  <div className="characteristics">
                    <h4>Key Characteristics:</h4>
                    <ul>
                      {currentBreed.characteristics.slice(0, 3).map((char, idx) => (
                        <li key={idx}>{char}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <button className="carousel-btn next-btn" onClick={handleNext}>❯</button>
          </div>

          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {dogBreeds.map((_, idx) => (
              <button
                key={idx}
                className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <section className="features-section">
          <h2>Why Take the Dog MBTI Quiz?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Discover Your Perfect Match</h3>
              <p>Our MBTI-based quiz matches your personality with compatible dog breeds that suit your lifestyle.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🐕</div>
              <h3>Learn Breed Traits</h3>
              <p>Understand the unique characteristics, temperaments, and needs of different dog breeds.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">❤️</div>
              <h3>Perfect Companions</h3>
              <p>Find dogs that can be genuinely helpful and compatible with your personality and lifestyle.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Detailed Analysis</h3>
              <p>Get comprehensive insights into your personality type and how it aligns with different breeds.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Find Your Perfect Dog?</h2>
            <p>Take our personality quiz and discover which dog breed matches your personality best!</p>
            <button className="cta-button" onClick={() => navigate('/quiz')}>
              Start the Quiz Now 🎯
            </button>
          </div>
        </section>

        {/* Info Section */}
        <section className="info-section">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Take the Quiz</h3>
              <p>Answer 16 questions about your personality and preferences.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Get Your Result</h3>
              <p>Discover your MBTI type and your compatible dog breed.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Learn More</h3>
              <p>Explore detailed information about your matched breed on Breed Profiles.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

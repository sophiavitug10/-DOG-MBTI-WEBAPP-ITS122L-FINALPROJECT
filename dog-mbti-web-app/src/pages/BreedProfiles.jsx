import React, { useRef } from 'react';
import NavBar from '../components/NavBar';
import { dogBreeds } from '../data/breeds';
import '../styles/BreedProfiles.css';

export default function BreedProfiles() {
  const breedRefs = useRef({});

  const scrollToBreed = (breedId) => {
    breedRefs.current[breedId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <NavBar />
      <div className="page-container breed-profiles-container">
        {/* Header */}
        <div className="breed-profiles-header">
          <h1>Dog Breed Profiles</h1>
          <p className="subtitle">Explore all available dog breeds and their personalities</p>
        </div>

        {/* Carousel Section */}
        <div className="carousel-gallery-section">
          <h2>Browse All Breeds</h2>
          <div className="carousel-gallery">
            {dogBreeds.map((breed) => (
              <div
                key={breed.id}
                className="breed-carousel-card"
                onClick={() => scrollToBreed(breed.id)}
              >
                <div className="carousel-image-container">
                  <img
                    src={`/assets/${breed.cardImage}`}
                    alt={breed.name}
                    className="carousel-image"
                  />
                  <div className="carousel-overlay">
                    <p>View Details</p>
                  </div>
                </div>
                <h3 className="carousel-title">{breed.name}</h3>
                <p className="carousel-mbti">{breed.mbtiType}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Forum-like Detailed Profiles */}
        <div className="detailed-profiles-section">
          <h2>Detailed Breed Information</h2>
          <div className="profiles-list">
            {dogBreeds.map((breed) => (
              <div
                key={breed.id}
                ref={(el) => {
                  if (el) breedRefs.current[breed.id] = el;
                }}
                className="breed-profile-card"
                id={`breed-${breed.id}`}
              >
                <div className="profile-header">
                  <div className="profile-image-section">
                    <img
                      src={`/assets/${breed.image}`}
                      alt={breed.name}
                      className="profile-image"
                    />
                  </div>

                  <div className="profile-header-info">
                    <h2>{breed.name}</h2>
                    <p className="mbti-badge">MBTI Type: <span>{breed.mbtiType}</span></p>
                    <p className="profile-description">{breed.description}</p>
                  </div>
                </div>

                {/* Traits */}
                <div className="profile-section">
                  <h3>Key Traits</h3>
                  <div className="traits-grid">
                    {breed.traits.map((trait, idx) => (
                      <div key={idx} className="trait-item">
                        <span className="trait-name">{trait}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Characteristics */}
                <div className="profile-section">
                  <h3>Characteristics & Behavior</h3>
                  <ul className="characteristics-list">
                    {breed.characteristics.map((char, idx) => (
                      <li key={idx}>
                        <span className="checkmark">✓</span>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Compatibility */}
                <div className="profile-section">
                  <h3>Best For</h3>
                  <div className="compatibility-list">
                    {breed.compatibility.map((comp, idx) => (
                      <div key={idx} className="compatibility-badge">
                        👤 {comp}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comments Section (Forum-like) */}
                <div className="profile-section comments-section">
                  <h3>Community Thoughts</h3>
                  <div className="comments-placeholder">
                    <p>💬 Share your experience with {breed.name}s in the community forum</p>
                    <small>(Future feature: Comments and community reviews coming soon)</small>
                  </div>
                </div>

                {/* Back to Top Button */}
                <button
                  className="back-to-carousel-btn"
                  onClick={() => scrollToBreed('top')}
                >
                  ↑ Back to Carousel
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Section */}
        <div className="comparison-section">
          <h2>Quick Comparison</h2>
          <div className="comparison-table-container">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Breed Name</th>
                  <th>MBTI Type</th>
                  <th>Energy Level</th>
                  <th>Intelligence</th>
                  <th>Friendliness</th>
                </tr>
              </thead>
              <tbody>
                {dogBreeds.map((breed) => (
                  <tr key={breed.id}>
                    <td className="breed-name-cell">{breed.name}</td>
                    <td className="mbti-cell">{breed.mbtiType}</td>
                    <td className="energy-cell">
                      {'⭐'.repeat(breed.traits.includes('Energetic') ? 5 : 3)}
                    </td>
                    <td className="intelligence-cell">
                      {'⭐'.repeat(breed.traits.includes('Intelligent') ? 5 : 3)}
                    </td>
                    <td className="friendliness-cell">
                      {'⭐'.repeat(breed.traits.includes('Friendly') ? 5 : 3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

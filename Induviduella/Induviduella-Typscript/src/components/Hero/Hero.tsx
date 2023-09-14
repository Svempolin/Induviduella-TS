import React from 'react';
import './Hero.modules.css';
import heroImage from '../../assets/placeholders/vinbild.jpg'; // Import the image

const HeroImage: React.FC = () => {
  const title = "Welcome to Nostra Vino";
  const subtitle = "Discover Amazing Wines";

  return (
    <div className="hero-image-container">
      <img src={heroImage} alt="Hero" className="hero-image" /> {/* Use the imported image */}
      <div className="hero-text">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default HeroImage;

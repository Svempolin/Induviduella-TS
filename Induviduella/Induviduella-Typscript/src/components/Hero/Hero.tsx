import React from 'react';
import './Hero.modules.css';


const HeroImage: React.FC = () => {
  const imageUrl = "https://cdn.pixabay.com/photo/2017/03/13/17/26/ecommerce-2140603_1280.jpg";
  const title = "Welcome to Our Website";
  const subtitle = "Discover Amazing Products";

  return (
    <div className="hero-image-container">
      <img src={imageUrl} alt="Hero" className="hero-image" />
      <div className="hero-text">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default HeroImage;
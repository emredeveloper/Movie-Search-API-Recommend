import React from 'react';
import './PortfolioPage.css'; // Assuming you have CSS for styling

const PortfolioPage = () => {
  const portfolioItems = [
    {
      id: 1,
      image: 'project1.jpg',
      title: 'Project 1',
      description: 'Description of Project 1.'
    },
    {
      id: 2,
      image: 'project2.jpg',
      title: 'Project 2',
      description: 'Description of Project 2.'
    },
    // Add more portfolio items as needed
  ];

  return (
    <div className="portfolio-page">
      <h2>Portföyüm</h2>
      <div className="portfolio-grid">
        {portfolioItems.map((item) => (
          <div key={item.id} className="portfolio-item">
            <img src={item.image} alt={item.title} />
            <div className="portfolio-item-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;

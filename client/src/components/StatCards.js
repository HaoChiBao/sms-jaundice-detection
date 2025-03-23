import React from 'react';
import './StatCards.css';

function StatCards() {
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-info">
          <h3>175</h3>
          <p>Total Jaundice Cases</p>
        </div>
        <div className="stat-icon purple-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9f3bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-info">
          <h3>90</h3>
          <p>Resolved Cases</p>
        </div>
        <div className="stat-icon green-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4dff91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
        </div>
      </div>
    </div>
  );
}

export default StatCards;
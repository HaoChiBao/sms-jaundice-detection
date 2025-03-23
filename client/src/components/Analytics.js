import React from 'react';
import './Analytics.css';
import duck from './duck.jpeg';

function Analytics() {
  // replace this with actual logic to determine jaundice status
  const jaundiceStatus = "Not Likely"; // or "Highly Likely"
  const statusColor = jaundiceStatus === "Highly Likely" ? "#ff4d9e" : "#4dff9e";
  
  return (
    <div className="card">
      <div className="card-title">
        <span>Analytics</span>
        <button className="collapse-button">−</button>
      </div>
      <div className="chart-container">
        <div className="image-container">
          <img 
            src={duck} 
            alt="Jaundice Analysis" 
            className="analysis-image"
            width="160"
            height="160"
          />
        </div>
        <div className="status-container" style={{ color: statusColor }}>
          <span className="status-text">Jaundice: {jaundiceStatus}</span>
        </div>
      </div>
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color low"></div>
          <p>Low</p>
        </div>
        <div className="legend-item">
          <div className="legend-color medium"></div>
          <p>Medium</p>
        </div>
        <div className="legend-item">
          <div className="legend-color severe"></div>
          <p>Severe</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
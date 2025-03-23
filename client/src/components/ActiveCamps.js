import React from 'react';
import './ActiveCamps.css';
import grass from './grass.jpg';

function ActiveCamps() {
  const camps = [
    { id: 1, name: 'Mumbai Central', location: 'Mumbai, Maharashtra' },
    { id: 2, name: 'Kolkata Relief', location: 'Kolkata, West Bengal' },
    { id: 3, name: 'Delhi Medical Camp', location: 'New Delhi, Delhi' },
    { id: 4, name: 'Chennai Center', location: 'Chennai, Tamil Nadu' }
  ];

  return (
    <div className="card">
      <div className="card-title">
        <span>Active Medical Camps</span>
      </div>
      <div className="camps-list">
        {camps.map(camp => (
          <div key={camp.id} className="camp-card">
            <img className="camp-image" src={grass} alt={camp.name} />
            <div className="camp-info">
              <h4>{camp.name}</h4>
              <p>{camp.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActiveCamps;
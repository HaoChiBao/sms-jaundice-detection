import React from 'react';
import './ActiveCamps.css';
import grass from './grass.jpg';
import camp from './camp.png';
import camp1 from './camp1.png';
import camp2 from './camp2.png';
import camp3 from './camp3.png';


function ActiveCamps() {
  const camps = [
    { id: 1, name: 'Mumbai Central', location: 'Mumbai, Maharashtra', image: camp },
    { id: 2, name: 'Kolkata Relief', location: 'Kolkata, West Bengal', image: camp1 },
    { id: 3, name: 'Delhi Medical Camp', location: 'New Delhi, Delhi', image: camp2 },
    { id: 4, name: 'Chennai Center', location: 'Chennai, Tamil Nadu', image: camp3 }
  ];

  return (
    <div className="card">
      <div className="card-title">
        <span><b>Active Medical Camps</b></span>
      </div>
      <div className="camps-list">
        {camps.map(camp => (
          <div key={camp.id} className="camp-card">
            <img className="camp-image" src={camp.image} alt={camp.name} />
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

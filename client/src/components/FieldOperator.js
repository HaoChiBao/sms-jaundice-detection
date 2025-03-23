import React from 'react';
import './FieldOperator.css';

function FieldOperator() {
  const doctors = [
    { id: 'FD-001', name: 'Dr. Sarah Johnson', contact: '+1-555-123-4567', location: 'New Delhi, India' },
    { id: 'FD-002', name: 'Dr. Michael Chen', contact: '+1-555-234-5678', location: 'Kolkata, India' },
    { id: 'FD-003', name: 'Dr. Priya Sharma', contact: '+1-555-345-6789', location: 'Mumbai, India' },
    { id: 'FD-004', name: 'Dr. David Wilson', contact: '+1-555-456-7890', location: 'Chennai, India' },
    { id: 'FD-005', name: 'Dr. Rajesh Kumar', contact: '+1-555-567-8901', location: 'Bangalore, India' }
  ];

  return (
    <div className="card">
      <div className="card-title">
        <span><b>Field Doctors</b></span>
      </div>
      <div className="field-doctors">
        <table className="doctors-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map(doctor => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.contact}</td>
                <td>{doctor.location}</td>
                <td>
                  <button className="contact-button">Contact</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FieldOperator;
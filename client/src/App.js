import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import StatCards from './components/StatCards';
import Map from './components/Map';
import Analytics from './components/Analytics';
import FieldOperator from './components/FieldOperator';
import ActiveCamps from './components/ActiveCamps';
import ImageUpload from './components/ImageUpload';

function App() {
  return (
    <div className="dashboard">
      <Header />
      
      <div className="container">
        <Sidebar />
        
        <div className="main-content">
          <StatCards />
          
          <div className="content-row">
            <Map />
            <Analytics />
          </div>
          
          <div className="content-row">
            <FieldOperator />
            <ActiveCamps />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
import React from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import StatCards from "./components/StatCards";
import Map from "./components/Map";
import Analytics from "./components/Analytics";
import FieldOperator from "./components/FieldOperator";
import ActiveCamps from "./components/ActiveCamps";
import ImageUpload from "./components/ImageUpload";

import { useState, useEffect } from "react";

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("https://sms-jaundice-detection-production.up.railway.app/locations", {
      // fetch('http://localhost:3000/locations', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {},
    }) 
    // w
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setLocations(data);
      })
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  return (
    <div className="dashboard">
      <Header />

      <div className="container">
        <Sidebar />

        <div className="main-content">
          <StatCards locations={locations} />

          <div className="content-row">
            <Map locationNames={locations} />
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

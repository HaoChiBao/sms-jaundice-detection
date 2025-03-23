// src/components/ImageUpload.js

import React, { useState } from 'react';
import axios from 'axios';
import './ImageUpload.css';  

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleImageSubmit = async () => {
        if (!image) return;
        
        setLoading(true);
        setError(null);
        
        const formData = new FormData();
        formData.append('image', image);
        
        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setPrediction(data.prediction);
            setPrediction(response.data.prediction);
        } catch (err) {
            setError('An error occurred while submitting the image.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-container">
            <div className="upload-card">
                <h2>Upload an Image for Jaundice Detection</h2>
                <p className="description">
                    To detect jaundice in newborns, upload an image below. Our AI model will analyze the image and provide a prediction.
                </p>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                />
                <button 
                    onClick={handleImageSubmit} 
                    disabled={loading} 
                    className="submit-button"
                >
                    {loading ? 'Processing...' : 'Submit'}
                </button>
                {prediction && <p className="prediction-result">Prediction: {prediction}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default ImageUpload;

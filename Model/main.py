from flask import Flask, request, jsonify
import torch
from torchvision import models, transforms
from PIL import Image
import base64
import io
import os

app = Flask(__name__)

def loadModel(num_classes, file):
    model = models.densenet121(pretrained=False)
    num_ftrs = model.classifier.in_features
    model.classifier = torch.nn.Linear(num_ftrs, num_classes)

    # Move the model to the appropriate device (GPU if available)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)
    model.load_state_dict(torch.load(file, map_location=device))
    model.eval()
    return model

# Load the jaundice model
model = loadModel(2, 'jaundice_model_weights.pth')

# Define the image transformation
transform = transforms.transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.Grayscale(num_output_channels=3),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/predict', methods=['POST'])
def predict():
    try:
        mode = request.args.get('mode', default='default_mode', type=str)
        print(f"Received request - predicting for {mode}")

        # Extract image from the POST request and preprocess for classification
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400

        image = request.files['image'].read()
        image = Image.open(io.BytesIO(image)).convert('RGB')
        image = transform(image).unsqueeze(0)

        # Make prediction
        with torch.no_grad():
            output = model(image)
            _, pred = torch.max(output, 1)

        print(f"Prediction for {mode}: {pred.item()}")
        return jsonify({'prediction_num': pred.item()})
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'error': 'An error occurred during prediction'}), 500

if __name__ == '__main__':
    print('running on port:', 8000)
    app.run(debug=True, port=8000)

from flask import Flask, request, jsonify
import torch
from torchvision import models, transforms
from PIL import Image
import base64
import io
import os

device = None
device_str = None
if torch.cuda.is_available():
    print("CUDA working")
    device_str = 'cuda'
else:
    print("CUDA not working - running on CPU")
    device_str = 'cpu'


device = torch.device(device_str)
print(f"Running on device: {device}")

app = Flask(__name__)

def loadModel(num_classes, file):
    model = models.densenet121(pretrained=False)
    num_ftrs = model.classifier.in_features
    model.classifier = torch.nn.Linear(num_ftrs, num_classes)

    model = model.to(device)
    if device.type == 'cpu':
        model.load_state_dict(torch.load(file, map_location=device))
    else:
        model.load_state_dict(torch.load(file))
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

jaundice_classes = ['No Jaundice', 'Jaundice']

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/predict', methods=['POST'])
def predict_jaundice():
    try:
        # Make sure an image file was included in the request
        request_data = request.get_json()
        if 'image' not in request_data:
            print('no image provided')
            return jsonify({'error': 'No image provided'}), 400

        # Save the image to a temporary folder
        image_data = base64.b64decode(request_data['image'])
        image_path = 'tmp/uploaded_image.jpg'
        os.makedirs('tmp', exist_ok=True)
        with open(image_path, 'wb') as f:
            f.write(image_data)

        # Load the image from the temporary folder
        image = Image.open(image_path).convert('RGB')
        image_tensor = transform(image).unsqueeze(0).to(device)

        # Predict using the loaded model
        with torch.no_grad():
            output = model(image_tensor)
            _, pred = torch.max(output, 1)  # Highest score index

        # Optionally map the predicted index to a string
        prediction_str = jaundice_classes[pred.item()]
        print(f"Prediction: {pred.item()} = {prediction_str}")

        return jsonify({
            'prediction_num': pred.item(),
            'prediction_str': prediction_str
        })
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print('Running on port: 8000')
    app.run(debug=True, port=8000)
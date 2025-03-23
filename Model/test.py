import torch
from torchvision import models, transforms
from PIL import Image

##############################
# Configuration
##############################
JAUNDICE_MODEL_PATH = 'jaundice_model_new_weights.pth'  # Update if needed
TEST_IMAGE_PATH = 'jaundice1.jpg'                  # Update to your local image

##############################
# Load Model
##############################
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

def load_jaundice_model():
    # We assume 2 output classes for "No Jaundice" vs. "Jaundice"
    model = models.densenet121(pretrained=False)
    num_ftrs = model.classifier.in_features
    model.classifier = torch.nn.Linear(num_ftrs, 2)

    model.to(device)
    # Load state dictionary
    if device.type == 'cpu':
        model.load_state_dict(torch.load(JAUNDICE_MODEL_PATH, map_location=device))
    else:
        model.load_state_dict(torch.load(JAUNDICE_MODEL_PATH))

    model.eval()
    return model

model = load_jaundice_model()

# Class names for your 2-class problem
jaundice_classes = ['Jaundice', 'No Jaundice']

##############################
# Define Transforms
##############################
transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.Grayscale(num_output_channels=3),  # only if your model expects 3 channels
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

##############################
# Inference on a Local Image
##############################
def run_inference_on_image(image_path):
    # Load and preprocess image
    image = Image.open(image_path).convert('RGB')
    image_tensor = transform(image).unsqueeze(0).to(device)
    
    # Run inference
    with torch.no_grad():
        output = model(image_tensor)
        _, pred = torch.max(output, 1)

    # Convert index to label
    predicted_label = jaundice_classes[pred.item()]
    return pred.item(), predicted_label

if __name__ == "__main__":
    print(f"Running inference on: {TEST_IMAGE_PATH}")
    pred_idx, pred_label = run_inference_on_image(TEST_IMAGE_PATH)
    print(f"Prediction index: {pred_idx}")
    print(f"Prediction label: {pred_label}")

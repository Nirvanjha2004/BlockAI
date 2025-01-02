from flask import Flask, request, jsonify
from diffusers import StableDiffusionPipeline
import torch

app = Flask(__name__)

# Load the Stable Diffusion model
model_id = "stabilityai/stable-diffusion-2"
pipeline = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float32)
pipeline.to("cpu")  # Use CPU

@app.route('/', methods=['GET'])
def hello():
    return "Hello Flask"

@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.json
    prompt = data.get('prompt', 'A beautiful sunset over the mountains')
    try:
        image = pipeline(prompt).images[0]
        output_path = "generated_image.png"
        image.save(output_path)
        return jsonify({"status": "success", "image_path": output_path})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

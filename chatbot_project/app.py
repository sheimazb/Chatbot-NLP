from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.response_generator import predict_intent, generate_response

app = Flask(__name__)

# Allow CORS for your React development server (localhost:5173)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    intent = predict_intent(user_input)
    response = generate_response(intent, user_input)  # Pass user_input to generate_response
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(port=5000)

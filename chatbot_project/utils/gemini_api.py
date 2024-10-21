import google.generativeai as genai
import os

# Configure the Gemini API
API_KEY = os.environ.get("API_KEY")
genai.configure(api_key=API_KEY)

def call_gemini_api(user_input):
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(user_input)
    return response.text


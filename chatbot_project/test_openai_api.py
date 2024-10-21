import google.generativeai as genai
import os

# Vérifiez si la clé API est définie
API_KEY = os.environ.get("API_KEY")
if API_KEY is None:
    raise ValueError("La variable d'environnement 'API_KEY' n'est pas définie.")

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")

def chat_with_gemini(user_input):
    response = model.generate_content(user_input)
    return response.text

if __name__ == "__main__":
    print("Bienvenue dans le chatbot ! Tapez 'exit' pour quitter.")
    while True:
        user_input = input("Vous : ")
        if user_input.lower() in ["exit", "quit", "bye"]:
            print("Au revoir !")
            break
        response = chat_with_gemini(user_input)
        print("Chatbot : ", response)

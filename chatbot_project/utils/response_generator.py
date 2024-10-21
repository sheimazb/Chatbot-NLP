import json
import random
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from .gemini_api import call_gemini_api  # Import the function to call Gemini API
from google.generativeai import configure

# Ensure NLTK resources are downloaded
# nltk.download('punkt')
# nltk.download('stopwords')

# Load the intents JSON file
with open('intents.json', 'r') as f:
    data = json.load(f)

# Prepare the data
#donc dans cette partie on a crée une dataframe df men dataset mteaane
df = pd.DataFrame(data['intents'])
#dictionnair pour l'initialisation (tag, patterns, réponse)
dic = {"tag": [], "patterns": [], "responses": []}

#houni mech yparcouriri el intents mteaana w mbaaed el contenu bech yabi bih dec
for i in range(len(df)):
    ptrns = df[df.index == i]['patterns'].values[0]
    rspns = df[df.index == i]['responses'].values[0]
    tag = df[df.index == i]['tag'].values[0]
    for j in range(len(ptrns)):
        dic['tag'].append(tag)
        dic['patterns'].append(ptrns[j])
        dic['responses'].append(rspns)
#on a crée une nouvell dataframe
df = pd.DataFrame.from_dict(dic)


stop_words = set(stopwords.words('english'))

#houni aamala clean l text 
#tokenisation 
def preprocess(text):
    tokens = word_tokenize(text.lower())
    filtered_tokens = [word for word in tokens if word.isalnum() and word not in stop_words]
    return ' '.join(filtered_tokens)

# Extract and preprocess phrases
phrases = [preprocess(pattern) for pattern in df['patterns']]
intent_labels = df['tag'].tolist()

# Initialize TF-IDF Vectorizer
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(phrases)

#This function preprocesses the user's input, transforms 
# it into a TF-IDF vector, and calculates the cosine similarity
#  between the user's input and the TF-IDF matrix
def predict_intent(user_input):
    processed_input = preprocess(user_input)
    user_tfidf = vectorizer.transform([processed_input])
    similarities = cosine_similarity(user_tfidf, tfidf_matrix)
    best_match_index = similarities.argmax()
    best_match_score = similarities[0, best_match_index]
    threshold = 0.5
    if best_match_score > threshold:
        return intent_labels[best_match_index]
    else:
        return "unknown"  # Return "unknown" for unrecognized intents

#This function generates a response based on the predicted intent. If the 
# intent is "unknown", it calls the call_gemini_api function to
#  generate a response using an external API.
def generate_response(intent, user_input):
    if intent == "unknown":  # Assuming "unknown" is returned for unrecognized intents
        return call_gemini_api(user_input)  # Call Gemini API for generating a response
    for item in data['intents']:
        if item['tag'] == intent:
            response = random.choice(item['responses'])
            return response
    return "I'm here to help. Please let me know how I can assist you."

# Configurez votre clé API ici
configure(api_key='AIzaSyCPuumw4XJKmaM0yz051sx8hrFAneN8YFE')

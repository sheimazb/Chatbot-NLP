# test_nlp_similarity.py

import numpy as np
from gensim.models import Word2Vec
from sklearn.metrics.pairwise import cosine_similarity

# Exemple de données
questions = [
    "Quel âge as-tu ?",
    "Quelles sont les meilleures pratiques pour le développement web?",
    "Comment apprendre le machine learning?",
    "Quels langages de programmation devrais-je apprendre en premier?",
]

# Réponses correspondantes
responses = {
    "Quel âge as-tu ?": "J'ai 20 ans.",
    "Quelles sont les meilleures pratiques pour le développement web?": "Utilisez des frameworks modernes et suivez les normes de codage.",
    "Comment apprendre le machine learning?": "Commencez par des cours en ligne et des tutoriels.",
    "Quels langages de programmation devrais-je apprendre en premier?": "Python et JavaScript sont de bons choix pour les débutants.",
}

# Étape 1 : Représentation vectorielle des phrases
# Entraînement d'un modèle Word2Vec sur les questions
model = Word2Vec(sentences=[q.split() for q in questions], vector_size=100, window=5, min_count=1, workers=4)

def get_vector(sentence):
    words = sentence.split()
    # Calculer la moyenne des vecteurs de mots
    return np.mean([model.wv[word] for word in words if word in model.wv], axis=0)

# Étape 2 : Calcul de la similarité
def calculate_similarity(user_question):
    user_vector = get_vector(user_question)
    similarities = []
    
    for question in questions:
        question_vector = get_vector(question)
        # Calcul de la similarité cosinus
        similarity = cosine_similarity([user_vector], [question_vector])[0][0]
        similarities.append(similarity)
    
    return similarities

# Étape 3 : Sélection de la meilleure réponse
def get_best_response(user_question):
    similarities = calculate_similarity(user_question)
    best_index = np.argmax(similarities)
    best_question = questions[best_index]
    return responses[best_question]

# Test de la fonction
if __name__ == "__main__":
    user_input = "langages"
    best_response = get_best_response(user_input)
    print(f"Question de l'utilisateur : {user_input}")
    print(f"Meilleure réponse : {best_response}")

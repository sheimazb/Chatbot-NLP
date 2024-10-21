import json
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC

def train_model():
    #Chargement des Données d'Intentions :
    with open('intents.json', 'r') as f:
        data = json.load(f)

#Préparation des Données :
    df = pd.DataFrame(data['intents'])
    dic = {"tag": [], "patterns": [], "responses": []}
    for i in range(len(df)):
        ptrns = df[df.index == i]['patterns'].values[0]
        rspns = df[df.index == i]['responses'].values[0]
        tag = df[df.index == i]['tag'].values[0]
        for j in range(len(ptrns)):
            dic['tag'].append(tag)
            dic['patterns'].append(ptrns[j])
            dic['responses'].append(rspns)

#Un nouveau DataFrame est créé à partir du dictionnaire dic,
#  qui contient maintenant une structure aplatie des tags et des motifs.
    df = pd.DataFrame.from_dict(dic)

# X contient les motifs d'entrée, et y contient les tags correspondants.
#Le TfidfVectorizer est utilisé pour convertir les motifs textuels en un
#  format numérique (X_vec) adapté à l'entraînement du modèle.
    X = df['patterns']
    y = df['tag']
    vectorizer = TfidfVectorizer()
    X_vec = vectorizer.fit_transform(X)
    model = SVC()
    model.fit(X_vec, y)

    return model, vectorizer

# Train the model and save it
model, vectorizer = train_model()
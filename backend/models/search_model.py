import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# ---------------------------
# LOAD DATA
# ---------------------------
df = pd.read_csv('data/sentences.csv')

# ---------------------------
# BUILD TF-IDF MODEL
# ---------------------------
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(df['text'])

# ---------------------------
# SEARCH FUNCTION
# ---------------------------
def search(query):
    query_vec = vectorizer.transform([query])
    scores = cosine_similarity(query_vec, tfidf_matrix).flatten()
    best_idx = scores.argmax()
    return df['text'].iloc[best_idx], float(scores[best_idx])

# ---------------------------
# STATS FUNCTION
# ---------------------------
def get_stats():
    return {
        'total_sentences': len(df),
        'vocabulary_size': len(vectorizer.vocabulary_)
    }
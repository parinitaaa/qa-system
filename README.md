# 🔍 Scooby-Doo Q&A System

A semantic search engine that answers questions about Scooby-Doo using **TF-IDF vectorization** and **cosine similarity**. Built with Flask (backend) and React (frontend).

---

## 📖 What This Project Does

Ask any question about Scooby-Doo, and the system will find the most relevant answer from a curated dataset of facts about the show.

**Example Queries:**
- "Who created Scooby-Doo?"
- "What is Fred's full name?"
- "Why do Scooby and Shaggy eat so much?"
- "What kind of dog is Scooby?"

The system uses **machine learning** to understand your question and match it with the best answer, even if you don't use the exact words.

---

## 🧠 How It Works: Cosine Similarity

### The Process

1. **Text Vectorization (TF-IDF)**
   - All sentences in the dataset are converted into numerical vectors
   - TF-IDF (Term Frequency-Inverse Document Frequency) weights words based on their importance
   - Common words like "the" and "is" get lower weights
   - Unique, meaningful words get higher weights

2. **Query Processing**
   - When you ask a question, it's converted into a vector using the same TF-IDF model
   - This ensures your query and the dataset sentences exist in the same "vector space"

3. **Cosine Similarity Calculation**
   - The system calculates the **cosine similarity** between your query vector and each sentence vector
   - Cosine similarity measures the angle between two vectors, ranging from 0 to 1:
     - **1.0** = Perfect match (vectors point in the same direction)
     - **0.5** = Moderate similarity
     - **0.0** = No similarity
   
4. **Best Match Selection**
   - The sentence with the highest cosine similarity score is returned as the answer

### Why Cosine Similarity?

Cosine similarity is ideal for text because:
- ✅ It focuses on the **direction** of vectors, not their magnitude
- ✅ Works well even when query and answer have different lengths
- ✅ Captures semantic meaning, not just exact word matches
- ✅ Fast and efficient for real-time search

### Mathematical Formula

```
cosine_similarity(A, B) = (A · B) / (||A|| × ||B||)
```

Where:
- `A · B` = Dot product of vectors A and B
- `||A||` = Magnitude (length) of vector A
- `||B||` = Magnitude (length) of vector B

---

## 🏗️ Project Structure

```
personal-qa-system/
├── backend/
│   ├── app.py                  # Flask API server
│   ├── models/
│   │   └── search_model.py     # ML logic (TF-IDF + cosine similarity)
│   ├── data/
│   │   └── sentences.csv       # Scooby-Doo facts dataset
│   └── requirements.txt        # Python dependencies
│
└── frontend/
    ├── src/
    │   ├── App.jsx             # React UI
    │   └── main.jsx            # React entry point
    ├── index.html              # HTML template
    └── package.json            # Node dependencies
```

---

## 🚀 Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the Flask server:
```bash
python app.py
```

Server runs on **http://localhost:5000**

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install Node dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend runs on **http://localhost:3000**

---

## 🔌 API Endpoints

### `POST /search`
Search for the best matching sentence.

**Request:**
```json
{
  "query": "Who created Scooby-Doo?"
}
```

**Response:**
```json
{
  "query": "Who created Scooby-Doo?",
  "best_match": "Scooby-Doo was created by Joe Ruby and Ken Spears.",
  "score": 0.847
}
```

### `GET /health`
Get system health and statistics.

**Response:**
```json
{
  "status": "healthy",
  "total_sentences": 30,
  "vocabulary_size": 245
}
```

### `GET /sentences`
Retrieve all sentences in the dataset.

**Response:**
```json
{
  "sentences": [
    "Scooby-Doo's real name is Scoobert Doo.",
    "The first Scooby-Doo series premiered in 1969.",
    ...
  ]
}
```

---

## 🛠️ Tech Stack

### Backend
- **Flask** - Lightweight Python web framework
- **scikit-learn** - Machine learning library for TF-IDF and cosine similarity
- **pandas** - Data manipulation and CSV processing
- **Flask-CORS** - Cross-origin resource sharing support

### Frontend
- **React** - UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

---

## 📊 Dataset

The system uses 30 hand-curated facts about Scooby-Doo covering:
- Character backgrounds and relationships
- Show history and creators
- Character traits and behaviors
- Famous catchphrases and elements

All data is stored in `backend/data/sentences.csv` in a simple format:
```csv
text
"Scooby-Doo's real name is Scoobert Doo."
"Fred is usually the one who drives the Mystery Machine."
...
```

---

## 🎯 Key Features

- ✅ **Semantic Search** - Understands meaning, not just keywords
- ✅ **Real-time Results** - Instant search with similarity scores
- ✅ **Clean UI** - Minimal, focused design
- ✅ **REST API** - Easy to integrate with other applications
- ✅ **Extensible** - Easy to add more questions and answers

---

## 🧪 Example Queries & Results

| Query | Best Match | Score |
|-------|------------|-------|
| "Who drives the van?" | "Fred is usually the one who drives the Mystery Machine." | 0.65 |
| "What is Scooby's real name?" | "Scooby-Doo's real name is Scoobert Doo." | 0.89 |
| "Why is Shaggy always hungry?" | "Shaggy is known for his enormous appetite..." | 0.72 |

---

## 🔮 Future Improvements

- [ ] Add multi-sentence context for complex queries
- [ ] Implement query expansion with synonyms
- [ ] Use transformer models (BERT, Sentence-BERT) for better semantic understanding
- [ ] Add user feedback mechanism to improve results
- [ ] Implement caching for common queries
- [ ] Add support for follow-up questions

---

from flask import Flask, request, jsonify
from flask_cors import CORS
from models.search_model import search, get_stats

app = Flask(__name__)
CORS(app)

@app.route('/search', methods=['POST'])
def search_endpoint():
    data = request.json
    query = data.get('query', '').strip()
    
    if not query:
        return jsonify({'error': 'Query is required'}), 400
    
    result, score = search(query)
    return jsonify({
        'query': query,
        'best_match': result,
        'score': score
    })

@app.route('/health', methods=['GET'])
def health():
    stats = get_stats()
    return jsonify({'status': 'healthy', **stats})

@app.route('/sentences', methods=['GET'])
def get_sentences():
    from models.search_model import df  # import the dataframe
    sentences = df['text'].tolist()
    return jsonify({'sentences': sentences})


if __name__ == '__main__':
    print("\n🚀 Server starting on http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
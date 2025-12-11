import React, { useState } from 'react';

const App = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Backend not responding. Run: python app.py');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Know About Scooby Doo!
          </h1>
          <p className="text-gray-600">Shoot your question</p>
        </div>

        {/* Search Box */}
        <div className="bg-white border border-gray-300 rounded p-4 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Type your question..."
            className="w-full p-3 border border-gray-300 rounded mb-3 text-gray-900"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-300 rounded p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="bg-white border border-gray-300 rounded p-6">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-500 mb-2">
                BEST MATCH
              </h2>
              <p className="text-lg text-gray-900 mb-3">{result.best_match}</p>
              <p className="text-sm text-gray-600">
                Score: {(result.score * 100).toFixed(1)}%
              </p>
            </div>

            {result.top_matches && result.top_matches.length > 1 && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">
                  OTHER MATCHES
                </h3>
                {result.top_matches.slice(1).map((match, idx) => (
                  <div key={idx} className="mb-2 pb-2 border-b border-gray-200 last:border-0">
                    <p className="text-gray-800">{match.text}</p>
                    <p className="text-xs text-gray-500">
                      Score: {(match.score * 100).toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
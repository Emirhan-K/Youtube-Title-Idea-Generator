import React, { useState } from 'react';
import './TitleGenerator.css';

const TitleGenerator = () => {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('Technology');
  const [tone, setTone] = useState('Casual');
  const [language, setLanguage] = useState('Turkish');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-4');
  
  const [titles, setTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedTitle, setCopiedTitle] = useState(null);
  const [customCategory, setCustomCategory] = useState('');
  const [customTone, setCustomTone] = useState('');

  const categories = [
    'Gaming', 'Technology', 'Education', 'Entertainment', 
    'Lifestyle', 'Business', 'Health', 'Travel', 'Food', 'Music', 'Experimental Content'
  ];

  const tones = [
    'Professional', 'Casual', 'Exciting', 'Clickbait', 'Funny'
  ];

  const languages = [
    'Turkish', 'English'
  ];

  const models = [
    'gpt-3.5-turbo',
    'gpt-4',
    "gpt-4-turbo",
    "gpt-4o"
  ];

  const handleCopy = (title) => {
    navigator.clipboard.writeText(title);
    setCopiedTitle(title);
    setTimeout(() => setCopiedTitle(null), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setTitles([]);

    if (!apiKey) {
      setError('API key is required');
      setIsLoading(false);
      return;
    }

    const formData = {
      api_key: apiKey,
      topic,
      category: category === 'custom' ? customCategory : category,
      tone: tone === 'custom' ? customTone : tone,
      language,
      model
    };
    /*https://web-production-bcaef.up.railway.app/generate-titles*/
    try {
      const response = await fetch('https://web-production-bcaef.up.railway.app/generate-titles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Something went wrong');
      }

      const data = await response.json();
      const splitTitles = data.titles[0].split('\n').filter(title => title.trim() !== ''); // Split by newlines and remove empty lines
      setTitles(splitTitles);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="title-generator">
      <form className="generator-form" onSubmit={handleSubmit}>

        <div className="form-columns">
          <div className="form-column-left">
            <div className="form-group">
              <label htmlFor="topic">Video Topic:</label>
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Describe your video topic...
Tip: The better you describe your video topic and terms, the better results you'll get."
                required
              />
            </div>
          </div>
          <div className="form-column-right">
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={category}
                onChange={(e) => {
                  const value = e.target.value;
                  setCategory(value);
                  if (value !== 'custom') {
                    setCustomCategory('');
                  }
                }}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                <option value="custom">Other</option>
              </select>
              {category === 'custom' && (
                <input
                  type="text"
                  placeholder="Write your own category"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  style={{ marginTop: '10px' }}
                  required
                />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="tone">Tone:</label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => {
                  const value = e.target.value;
                  setTone(value);
                  if (value !== 'custom') {
                    setCustomTone('');
                  }
                }}
                required
              >
                <option value="">Select a tone</option>
                {tones.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
                <option value="custom">Other</option>
              </select>
              {tone === 'custom' && (
                <input
                  type="text"
                  placeholder="Write your own tone"
                  value={customTone}
                  onChange={(e) => setCustomTone(e.target.value)}
                  style={{ marginTop: '10px' }}
                  required
                />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="output-language">Output Language:</label>
              <select
                id="output-language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
              >
                <option value="">Select a language</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="apiKey">OpenAI API Key:</label>
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your OpenAI API key"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="model">OpenAI Model:</label>
              <select
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              >
                {models.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="generate-button" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Titles'}
        </button>
      </form>

      <div className="results-container">
        {error && <div className="error-message">Error: {error}</div>}
        {isLoading && !titles.length && <div className="loading-message">Generating titles...</div>}
        {titles.length > 0 && (
          <div className="title-list">
            <h3>Generated Titles:</h3>
            {titles.map((title, index) => (
              <div key={index} className="title-card">
                <p className="title-text">{title}</p>
                <button onClick={() => handleCopy(title)} className="copy-button">
                  {copiedTitle === title ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleGenerator;

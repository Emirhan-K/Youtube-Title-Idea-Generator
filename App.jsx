import React from 'react';
import TitleGenerator from './components/TitleGenerator.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>YouTube Title Generator</h1>
        <p>Generate the best titles to boost your view rates</p>
      </header>
      <main>
        <TitleGenerator />
      </main>
    </div>
  );
}

export default App;
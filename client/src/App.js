import React, { useState } from 'react';
import './App.css';
import HomeScreen from './HomeScreen';
import './HomeScreen.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    // Later, this will trigger fetching questions
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>QuizzyVerse</h1>
      </header>
      <main>
        {!selectedCategory ? (
          <HomeScreen onSelectCategory={handleSelectCategory} />
        ) : (
          <div>
            <h2>Selected Category: {selectedCategory}</h2>
            {/* Question display will go here */}
          </div>
        )}
      </main>
    </div>
  );
}

export default App; 
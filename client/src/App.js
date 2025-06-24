import React, { useState } from 'react';
import './App.css';
import HomeScreen from './HomeScreen';
import './HomeScreen.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);

  const handleSelectCategory = async (category) => {
    setSelectedCategory(category);
    try {
      const response = await fetch(`http://localhost:5000/api/questions/${category}`);
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
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
            <h2>{selectedCategory} Questions</h2>
            {questions.map((q, index) => (
              <div key={index}>
                <p>{q.question}</p>
              </div>
            ))}
            {/* Question display will go here */}
          </div>
        )}
      </main>
    </div>
  );
}

export default App; 
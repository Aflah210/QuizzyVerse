import React, { useState, useEffect } from 'react';
import './App.css';
import HomeScreen from './HomeScreen';
import './HomeScreen.css';
import QuizScreen from './QuizScreen';
import './QuizScreen.css';
import ScoreScreen from './ScoreScreen';
import './ScoreScreen.css';

function App() {
  const [gameState, setGameState] = useState('home'); // 'home', 'quiz', 'score'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category) => {
    try {
      const response = await fetch(`http://localhost:8000/api/questions/${category}`);
      const data = await response.json();
      setQuestions(data);
      setGameState('quiz');
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    fetchQuestions(category);
  };

  const handleQuizFinish = (finalScore) => {
    setScore(finalScore);
    setGameState('score');
  };

  const handleRetry = () => {
    setScore(0);
    fetchQuestions(selectedCategory);
  };

  const handleNewCategory = () => {
    setGameState('home');
    setSelectedCategory(null);
    setQuestions([]);
    setScore(0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>QuizzyVerse</h1>
      </header>
      <main>
        {gameState === 'home' && <HomeScreen onSelectCategory={handleSelectCategory} />}
        {gameState === 'quiz' && <QuizScreen questions={questions} onFinish={handleQuizFinish} />}
        {gameState === 'score' && (
          <ScoreScreen
            score={score}
            totalQuestions={questions.length}
            onRetry={handleRetry}
            onNewCategory={handleNewCategory}
          />
        )}
      </main>
    </div>
  );
}

export default App; 
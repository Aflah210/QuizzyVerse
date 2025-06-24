import React from 'react';

const ScoreScreen = ({ score, totalQuestions, onRetry, onNewCategory }) => {
  return (
    <div className="score-screen">
      <h2>Quiz Finished!</h2>
      <p>Your score: {score} / {totalQuestions}</p>
      <button onClick={onRetry}>Try Again</button>
      <button onClick={onNewCategory}>Choose Another Category</button>
    </div>
  );
};

export default ScoreScreen; 
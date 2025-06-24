import React from 'react';

const HomeScreen = ({ onSelectCategory }) => {
  const categories = ['History', 'Science', 'Geography', 'Art'];

  return (
    <div className="home-screen">
      <h1>Choose a Category</h1>
      <div className="category-list">
        {categories.map((category) => (
          <button key={category} onClick={() => onSelectCategory(category)}>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen; 
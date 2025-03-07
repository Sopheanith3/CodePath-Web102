import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cards] = useState([
    {
      id: 1,
      question: 'What is JSX?',
      answer: 'A syntax extension for JavaScript that allows you to write HTML-like code within JavaScript.',
    },
    {
      id: 2,
      question: 'What is a React component?',
      answer: 'A reusable piece of UI that represents a part of the application.',
    },
    {
      id: 3,
      question: 'What is the purpose of props in React?',
      answer: 'To pass data from a parent component to a child component.',
    },
    {
      id: 4,
      question: 'What is state in React?',
      answer: 'Data that can change over time within a component, triggering re-renders.',
    },
    {
      id: 5,
      question: 'What is the purpose of props in React?',
      answer: 'To pass data from a parent component to a child component.',
    },
    {
      id: 6,
      question: 'What is the useEffect hook used for?',
      answer: 'To perform side effects in functional components.',
    },
    {
      id: 7,
      question: 'What is the purpose of keys in React lists?',
      answer: 'To help React identify which items have changed, added, or removed.',
    },
    {
      id: 8,
      question: 'What is component composition?',
      answer: 'Building complex UIs by combining simpler components.',
    },
    {
      id: 9,
      question: 'What is the main difference between props and state?',
      answer: 'Props are immutable (read-only), state can be changed within a component.',
    },
    {
      id: 10,
      question: 'What is the difference between functional and class components?',
      answer: 'Functional components are functions, class components are classes with a render method.',
    },
  ]);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlip, setFlip] = useState(false);
  const [hasStart, setStart] = useState(false);
  const [cardHistory, setCardHistory] = useState([]); 

  const handleCardClick = () => {
    setFlip(!isFlip);
  };

  const getNextCard = () => {
    setCardHistory(prevHistory => [...prevHistory, currentCardIndex]);
    const randomIndex = Math.floor(Math.random() * cards.length);
    setCurrentCardIndex(randomIndex);
    setFlip(false);
  };

  const getPreviousCard = () => {
    if (cardHistory.length > 0) {
      const prevIndex = cardHistory[cardHistory.length - 1];
      setCurrentCardIndex(prevIndex);
      setCardHistory(prevHistory => prevHistory.slice(0, -1));
      setFlip(false);
    }
  };

  const startQuiz = () => {
    setStart(true);
    setCardHistory([]);
    getNextCard();
  };

  return (
    <div className="App">
      <div className="Container">
        <h1>The Ultimate Plant Parent!</h1>
        <p className="subtitle">How good of a plant parent are you? Test all of your planty knowledge here!</p>
        <p className="card-count">Number of cards: {cards.length}</p>

        {!hasStart ? (
          <div className="start-screen">
            <div className="start-button-container">
              <button className="start-button" onClick={startQuiz}>
                Start
              </button>
            </div>
          </div>
        ) : (
          <div className="card-container">
            <div className={`card ${isFlip ? 'flipped' : ''}`} onClick={handleCardClick}>
              <div className="card-content">
                {isFlip ? cards[currentCardIndex].answer : cards[currentCardIndex].question}
              </div>
            </div>

            <div className="button-container">
              <button 
                className="nav-button prev-button" 
                onClick={getPreviousCard}
                disabled={cardHistory.length === 0} 
              >
                ←
              </button>
              <button className="nav-button next-button" onClick={getNextCard}>
                →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
import React, { useState, useRef } from 'react';
import './App.css';
import './AnswerInput.css';
import AnswerInput from './components/AnswerInput';
import ShuffleButton from './components/ShuffleButton';

function App() {
  const [cards, setCards] = useState([
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
  const [hasGuessed, setHasGuessed] = useState(false);
  const answerInputRef = useRef(null);

  const handleCorrectAnswer = () => setHasGuessed(true);
  const handleIncorrectAnswer = () => setHasGuessed(true);

  const handleCardClick = () => {
    if (hasGuessed) {
      setFlip(!isFlip);
    }
  };

  const getNextCard = () => {
    setCardHistory(prevHistory => [...prevHistory, currentCardIndex]);
    const randomIndex = Math.floor(Math.random() * cards.length);
    setCurrentCardIndex(randomIndex);
    setFlip(false);
    setHasGuessed(false);
    
    if (answerInputRef.current?.resetInput) {
      answerInputRef.current.resetInput();
    }
  };

  const getPreviousCard = () => {
    if (cardHistory.length > 0) {
      const prevIndex = cardHistory.pop();
      setCurrentCardIndex(prevIndex);
      setCardHistory([...cardHistory]);
      setFlip(false);
      setHasGuessed(false);
      
      if (answerInputRef.current?.resetInput) {
        answerInputRef.current.resetInput();
      }
    }
  };
  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentCardIndex(0);
    setCardHistory([]);
    setFlip(false);
    setHasGuessed(false);

    if (answerInputRef.current && answerInputRef.current.resetInput) {
      answerInputRef.current.resetInput();
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
        <h1>React Knowledge for Beginner Quiz!</h1>
        <p className="subtitle">How well do you understand React fundamentals? Challenge your knowledge with this interactive quiz!</p>
        <p className="card-count">Number of cards: {cards.length}</p>

        {!hasStart ? (
          <div className="start-screen">
            <button className="start-button" onClick={startQuiz}>Start</button>
          </div>
        ) : (
          <div className="card-container">
            <div className={`card ${isFlip ? 'flipped' : ''}`} onClick={handleCardClick}>
              <div className="card-inner">
                <div className="card-front">
                  <div className="card-content">{cards[currentCardIndex].question}</div>
                </div>
                <div className="card-back">
                  <div className="card-content">{cards[currentCardIndex].answer}</div>
                </div>
              </div>
            </div>

            {!isFlip && (
              <div className="answer-section">
                <p>Guess the answer here:</p>
                <AnswerInput
                  ref={answerInputRef}
                  correctAnswer={cards[currentCardIndex].answer}
                  onCorrectAnswer={handleCorrectAnswer}
                  onIncorrectAnswer={handleIncorrectAnswer}
                />
              </div>
            )}

            <div className="button-container">
              <button className="nav-button prev-button" onClick={getPreviousCard} disabled={cardHistory.length === 0}>←</button>
              <ShuffleButton onClick={shuffleCards}/>
              <button className="nav-button next-button" onClick={getNextCard}>→</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

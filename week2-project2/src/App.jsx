import { useState } from 'react'
import './App.css'

function App() {
  const [cards, setCount] = useState([ 
  {
    id: 1,
    question: "What is JSX?",
    answer: "A syntax extension for JavaScript that allows you to write HTML -like code within JavaScript.",
  },
  {
    id: 2,
    question: "What is a React component?",
    answer: "A reusable piece of UI that represent a part of the application",
  },
  {
    id:3,
    question: "What is the purpose of props in React?",
    answer: "To pass data from a parent component to a child compnonet.",
  },
  {
    id: 4,
    question: "What is state in React?",
    answer: "Data that can change over time within a component, triggering re-renders",

  },
  {
    id: 5,
    question: "What is the purpose of props in React?",
    answer: " To pass data from a parent component to a child component.",
  },
  {
    id: 6,
    question: "What is the useEffect hook used for?",
    answer: "To add state to functional components.",
  },
  {
    id: 7,
    question: "What is the purpose of keys in React lists?",
    answer: "To help React identify whichi item have changed, added, or removed.",
  },
  {
    id: 8,
    question: "What is component composition?",
    answer: "Building complex UIs by combining simpler components.",
  },
  {
    id: 9,
    question: "What is the main difference between props and state?",
    answer: "Props are immutable (read-only), state can be changed within a component.",
  },
  {
    id: 10,
    question: "What is the difference between functional and class components?",
    answer: "Functional components are functions, class components are classes with a render method.",
  },
  ]);



  return (
    <>

    </>
  )
}

export default App

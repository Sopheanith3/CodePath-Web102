import './App.css';
import {useState} from 'react';


const App = () => {
  const [count, setCount] = useState(0);
  const [multiplier,setMultiplier] = useState(1);

  const updateCount = () => setCount(count + multiplier);
  
  const buyDoybleStuff = () => {
    if (count >= 10) {
      setMultiplier(multiplier * 2);
      setCount(count - 10);
    }
  }
  
  const buyPartyPack = () => {
    if (count >= 100) {
      setMultiplier(multiplier * 5);
      setCount(count - 100);
    }
  }

  const buyFullFest = () => {
    if (count >= 1000) {
      setMultiplier(multiplier * 10);
      setCount(count - 1000);
    }
  }
  
  
  return (
    <div className="App">
      <div className="header"></div>
      <h1>Samosa Selector</h1>
      <h2>"Count: {count}"</h2>
      <img  src="./src/assets/Samosa.png" className="samosa" onClick={updateCount}/>
    
      <div className="container">
        <div className="upgrade">
          <h3>Double Stuffed 👯‍♀️</h3>
          <p>2x per click </p>
          <button onClick={buyDoybleStuff}>10 samosas</button>
        </div>
    
        <div className="upgrade">
          <h3>Party Pack 🎉</h3>
          <p>5x per click </p>
          <button onClick={buyPartyPack}>100 samosas</button>
        </div>
      
        <div className="upgrade">
          <h3>Full Feast 👩🏽‍🍳</h3>
          <p>10x per click </p>
          <button onClick={buyFullFest}>1000 samosas</button>
        </div>
      </div>
    
    
    
    
    </div>
  )
}

export default App
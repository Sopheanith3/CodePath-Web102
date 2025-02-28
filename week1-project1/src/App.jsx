import './App.css'
import Resource from './components/sourceLayout'

const App = () => {
  return (
    <div className="App">
      <div className="Header">
        <h1 className="logo">Angkor Temple in Cambodia 🛕</h1>
      </div>
      <h3>The Angkor temples in Cambodia, located near Siem Reap, are 
        a monumental legacy of the Khmer Empire (9th-15th centuries). At the heart of the complex 
        is Angkor Wat, the world's largest religious monument, built in the 12th century by 
        King Suryavarman II as a Hindu temple and later transformed into a Buddhist site.
        Together, these temples not only symbolize the spiritual devotion and architectural mastery of the Khmer 
        civilization but also attract millions of visitors each year, offering a window into Cambodia's rich 
        heritage and enduring cultural legacy.</h3>
      <Resource />
    </div>
  )
}

export default App;

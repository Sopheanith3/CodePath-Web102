import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import GalleryPage from './pages/GalleryPage';
import DetailPage from './pages/DetailPage';
import UpdatePage from './pages/UpdatePage';

function App() {
  console.log("App rendering"); // Add this line for debugging
  
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <main className="content">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/character/:id" element={<DetailPage />} />
            <Route path="/update/:id" element={<UpdatePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
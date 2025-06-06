import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LeftSidebar from './components/LeftSideBar';
import RightSidebar from './components/RightSidebar';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <LeftSidebar />
          <div className="main-content-wrapper">
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/edit/:id" element={<EditPost />} />
              </Routes>
            </main>
            <RightSidebar />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
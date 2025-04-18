import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import GalleryPage from './pages/GalleryPage';
import DetailPage from './pages/DetailPage';
import UpdatePage from './pages/UpdatePage';

// Component that handles routing
const AppRoutes = () => {
  // Sets up routes
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/create", element: <CreatePage /> },
    { path: "/gallery", element: <GalleryPage /> },
    { path: "/character/:id", element: <DetailPage /> },
    { path: "/update/:id", element: <UpdatePage /> }
  ]);

  return element;
};

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <NavBar />
        <main className="content">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
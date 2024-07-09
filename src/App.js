import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PortfolioPage from './PortfolioPage';
import FilmSearch from './FilmSearch';
import Navbar from './Navbar'; // Adjust the path as per your project structure

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<FilmSearch />} />
        <Route path="/portfoy" element={<PortfolioPage />} />
      </Routes>
    </Router>
  );
}

export default App;

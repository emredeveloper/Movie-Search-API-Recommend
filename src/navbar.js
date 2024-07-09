import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file for styling

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-brand">
      <Link to="/" className="navbar-item">
        <span className="navbar-item-text">FilmSearch</span>
      </Link>
    </div>
    <div className="navbar-menu">
      <div className="navbar-end">
        <Link to="/portfoy" className="navbar-item">
          <span className="navbar-item-text">Portfolio</span>
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;

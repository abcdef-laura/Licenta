// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [user] = useAuthState(auth)

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
      </div>

      <button className="burger" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        <Link to="/signup" className="signup-button">Sign Up</Link>
        {user && (
          <Link to="/my-pets" className="nav-link">Anunțurile mele</Link>
        )}

      </div>

    </nav>
  );
}

export default Navbar;

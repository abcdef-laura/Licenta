import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const [user] = useAuthState(auth);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLinkClick = () => {
    setMenuOpen(false);
    setShowAuthDropdown(false);
  };

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
        <Link to="/" className="nav-link" onClick={handleLinkClick}>Home</Link>
        <Link to="/all-pets" className="nav-link" onClick={handleLinkClick}>All Pets</Link>
        <Link to="/about" className="nav-link" onClick={handleLinkClick}>About</Link>
        <Link to="/contact" className="nav-link" onClick={handleLinkClick}>Contact</Link>

        {!user && (
          <div className="auth-dropdown">
            <button
              className="signup-button"
              onClick={() => setShowAuthDropdown(!showAuthDropdown)}
            >
              Conectare / Înregistrare
            </button>
            {showAuthDropdown && (
              <div className="dropdown-content">
                <Link to="/login" onClick={handleLinkClick}>Conectează-te</Link>
                <Link to="/signup" onClick={handleLinkClick}>Creează cont</Link>
              </div>
            )}
          </div>
        )}

        {user && (
          <>
            <Link to="/my-pets" className="nav-link" onClick={handleLinkClick}>Anunțurile mele</Link>
            <Link to="/add-pet" className="nav-link" onClick={handleLinkClick}>Adaugă animal</Link>
            <button className="nav-link logout-button" onClick={() => { auth.signOut(); handleLinkClick(); }}>
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "../styles/NavBar.css";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/Library/" className="logo-text">
            📚 MyLibrary
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="nav-menu">
          <NavItem to="/Library/" label="Home" />
          <NavItem to="/Library/browse-books" label="Browse" />
          <NavItem to="/Library/add-book" label="Add Book" />
          <NavItem to="/Library/about" label="About" />
          <NavItem to="/Library/inquire" label="Inquire" />
          <NavItem to="/Library/favorites" label="Favorites" />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <NavItem to="/Library/" label="Home" mobile setMenuOpen={setMenuOpen} />
        <NavItem
          to="/Library/browse-books"
          label="Browse"
          mobile
          setMenuOpen={setMenuOpen}
        />
        <NavItem
          to="/Library/add-book"
          label="Add Book"
          mobile
          setMenuOpen={setMenuOpen}
        />
        <NavItem
          to="/Library/about"
          label="About"
          mobile
          setMenuOpen={setMenuOpen}
        />
        <NavItem
          to="/Library/inquire"
          label="Inquire"
          mobile
          setMenuOpen={setMenuOpen}
        />       
         <NavItem
        to="/Library/favorites"
        label="Favorites"
        mobile
        setMenuOpen={setMenuOpen}
      />
      </div>
    </nav>
  );
};

// Reusable NavItem Component
const NavItem = ({ to, label, mobile, setMenuOpen }) => (
  <Link
    to={to}
    className="nav-item"
    onClick={() => mobile && setMenuOpen(false)}
  >
    {label}
  </Link>
);

export default NavBar;

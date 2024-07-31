import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/admin">Admin Dashboard</Link>
        </li>
        <li>
          <Link to="/user">User Dashboard</Link>
        </li>
        <li>
          <Link to="/bids">Bids List</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

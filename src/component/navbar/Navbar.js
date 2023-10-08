import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"
const Navbar = () => {
  return (
    <nav>
      <ul className="navitems">
        <li>
          <Link to="/" style={{fontSize:"30px"}}>TriviaTo</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

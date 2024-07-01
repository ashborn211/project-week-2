// components/Header.js
import React from "react";
import "./header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <ul className="nav-links">
          <li>
            <a href="./index.html">Home</a>
          </li>
          <li>
            <a href="./about.html">About us</a>
          </li>
          <li>
            <a href="./group.html">Chat with students</a>
          </li>
          <li>
            <a href="./upload.html">Browse/Upload files</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

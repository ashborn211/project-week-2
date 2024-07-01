// components/Header.js
import React from "react";
import Link from "next/link";
import "./header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <ul className="nav-links">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About us</Link>
          </li>
          <li>
            <Link href="/chatrooms">Chat with students</Link>
          </li>
          <li>
            <Link href="/upload">Browse/Upload files</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

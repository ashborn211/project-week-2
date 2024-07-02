// components/Header.js
import React from "react";
import Link from "next/link";
import "./header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/chatrooms">Chatrooms</Link>
          <Link href="/upload">Upload</Link>
          <Link href="/about">About Us</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

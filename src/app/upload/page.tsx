"use client";

// src/app/upload/page.tsx

import Head from 'next/head';
import UploadForm from '../components/UploadForm'; // Adjusted import path if necessary
import './upload-style.css'; // Import specific styles for the upload page

const UploadPage = () => {
  const handleSubmit = (file: File, subject: string, tags: string[]) => {
    // Handle form submission logic here (e.g., API call, state update, etc.)
    console.log('File:', file);
    console.log('Subject:', subject);
    console.log('Tags:', tags);
  };

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Upload Files</title>
      </Head>

      <header>
        <nav>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About us</a></li>
            <li><a href="/group">Chat with students</a></li>
            <li><a href="/upload">Browse/Upload files</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="upload-section">
          <h2>Upload a File</h2>
          <UploadForm onSubmit={handleSubmit} />
          <ul id="fileList"></ul>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;

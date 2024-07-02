"use client";

// src/app/upload/page.tsx

import Head from 'next/head';
import { useState } from 'react';
import './upload.css'; // Import specific styles for the upload page

const UploadPage = () => {
  const [tags, setTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    setTags(prevTags =>
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const subjectInput = document.getElementById('subjectInput') as HTMLInputElement;

    const file = fileInput.files ? fileInput.files[0] : null;
    const subject = subjectInput.value;

    if (file && subject) {
      console.log('File:', file);
      console.log('Subject:', subject);
      console.log('Tags:', tags);
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Upload Files</title>
      </Head>
      <header>
        <nav>
          <ul className="nav-links">
            <li><a href="./index.html">Home</a></li>
            <li><a href="./about.html">About us</a></li>
            <li><a href="./group.html">Chat with students</a></li>
            <li><a href="./upload.html">Browse/Upload files</a></li>
          </ul>
        </nav>
      </header>
      <main className="upload-section">
        <h2>Upload a File</h2>
        <form id="uploadForm" onSubmit={handleSubmit}>
          <input type="file" id="fileInput" accept="image/*" required />
          <input type="text" id="subjectInput" placeholder="Subject" required />
          <div className="multiselect">
            <div className="selectbox">Select Tags</div>
            <div className="dropdown-content" id="tagsDropdown">
              {['Math', 'Science', 'History', 'Literature'].map(tag => (
                <a
                  href="#"
                  key={tag}
                  onClick={(e) => { e.preventDefault(); handleTagClick(tag); }}
                  className={tags.includes(tag) ? 'selected' : ''}
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
          <button type="submit">Upload</button>
        </form>
        <ul id="fileList"></ul>
      </main>
    </>
  );
};

export default UploadPage;

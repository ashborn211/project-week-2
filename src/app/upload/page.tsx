"use client"
import Head from 'next/head';
import UploadForm from '../components/UploadForm';
import './upload-style.css'; // Import specific styles for the upload page

const UploadPage = () => {


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
            <li><a href="./index.html">Home</a></li>
            <li><a href="./about.html">About us</a></li>
            <li><a href="./group.html">Chat with students</a></li>
            <li><a href="./upload.html">Browse/Upload files</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="upload-section">
          <h2>Upload a File</h2>
          <UploadForm />
          <ul id="fileList"></ul>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;

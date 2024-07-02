"use client";
import Head from "next/head";
import UploadForm from "../components/UploadForm";
import "./upload-style.css"; // Import specific styles for the upload page
import Header from "../components/header"; // Correct the path based on your project structure

const UploadPage = () => {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Upload Files</title>
      </Head>

      <Header />

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

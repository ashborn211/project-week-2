"use client"
import { useState } from "react";
import "../upload/upload-style.css"
type UploadFormProps = {
  onSubmit: (file: File, subject: string, tags: string[]) => void;
};

const UploadForm: React.FC<UploadFormProps> = ({ onSubmit }) => {
  const [file, setFile] = useState<File | null>(null);
  const [subject, setSubject] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags = ["Math", "Science", "History", "Literature"]; // Example tags

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  };

  const toggleDropdown = () => {
    const dropdown = document.getElementById("tagsDropdown");
    if (dropdown) {
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file && subject && selectedTags.length > 0) {
      onSubmit(file, subject, selectedTags);
      setFile(null);
      setSubject("");
      setSelectedTags([]);
    } else {
      alert(
        "Please select a file, enter a subject, and choose at least one tag."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" id="fileInput" onChange={handleFileChange} required />
      <input
        type="text"
        id="subjectInput"
        placeholder="Subject"
        value={subject}
        onChange={handleSubjectChange}
        required
      />
      <div className="multiselect">
        <div className="selectbox" onClick={toggleDropdown}>
          Select Tags
        </div>
        <div className="dropdown-content" id="tagsDropdown">
          {tags.map((tag) => (
            <a
              key={tag}
              href="#"
              className={selectedTags.includes(tag) ? "selected" : ""}
              onClick={(e) => {
                e.preventDefault();
                toggleTag(tag);
              }}
            >
              {tag}
            </a>
          ))}
        </div>
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;

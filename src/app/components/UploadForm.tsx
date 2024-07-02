import { useState, useEffect } from 'react';
import { db, storage } from '../firebaseConfig'; // Adjust the path to your Firebase configuration
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import UploadedFilesList from './UploadedFilesList'; // Import the new component

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [subject, setSubject] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const tags: string[] = ['Math', 'Science', 'History', 'Literature']; // Example tags

  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'files'));
        const filesList: any[] = [];
        querySnapshot.forEach((doc) => {
          filesList.push({ id: doc.id, ...doc.data() });
        });
        setUploadedFiles(filesList);
      } catch (error) {
        console.error('Error fetching uploaded files:', error);
      }
    };

    fetchUploadedFiles();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  };

  const toggleDropdown = () => {
    const dropdown = document.getElementById('tagsDropdown');
    if (dropdown) {
      dropdown.style.display =
        dropdown.style.display === 'block' ? 'none' : 'block';
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file && subject && selectedTags.length > 0) {
      try {
        // Upload file to Firestore Storage
        const fileRef = ref(storage, `files/${file.name}`);
        await uploadBytes(fileRef, file);
        const fileUrl = await getDownloadURL(fileRef);

        // Prepare metadata for Firestore
        const fileData = {
          fileName: file.name,
          subject: subject,
          tags: selectedTags,
          createdAt: Timestamp.now(), // Use Firestore Timestamp
          fileUrl: fileUrl, // Store the file URL
        };

        // Add document with random ID to "files" collection
        const filesCollection = collection(db, 'files'); // Correct way to reference a collection
        await addDoc(filesCollection, fileData);

        // Fetch updated uploaded files list
        const updatedQuerySnapshot = await getDocs(filesCollection);
        const updatedFilesList: any[] = [];
        updatedQuerySnapshot.forEach((doc) => {
          updatedFilesList.push({ id: doc.id, ...doc.data() });
        });
        setUploadedFiles(updatedFilesList);

        // Reset state
        setFile(null);
        setSubject('');
        setSelectedTags([]);
      } catch (error) {
        console.error('Error uploading file and metadata:', error);
        // Handle error as needed
      }
    } else {
      alert('Please select a file, enter a subject, and choose at least one tag.');
    }
  };

  const handleDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  return (
    <>
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
                className={selectedTags.includes(tag) ? 'selected' : ''}
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
      <UploadedFilesList files={uploadedFiles} handleDownload={handleDownload} />
    </>
  );
};

export default UploadForm;

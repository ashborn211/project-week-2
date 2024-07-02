"use client"
import { useState } from 'react';

type UploadedFilesListProps = {
  files: any[];
  handleDownload: (fileUrl: string, fileName: string) => void;
};

const UploadedFilesList: React.FC<UploadedFilesListProps> = ({ files, handleDownload }) => {
  const [filterTag, setFilterTag] = useState<string>('');
  const [filterTimestamp, setFilterTimestamp] = useState<string>('');

  const handleTagFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterTag(event.target.value);
  };

  const handleTimestampFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterTimestamp(event.target.value);
  };

  const filteredFiles = files.filter(file => {
    const matchesTag = filterTag ? file.tags.includes(filterTag) : true;
    const matchesTimestamp = filterTimestamp ? file.createdAt.toDate().toISOString().startsWith(filterTimestamp) : true;
    return matchesTag && matchesTimestamp;
  });

  return (
    <div>
      <h2>Uploaded Files</h2>
      <div className="filters">
        <select onChange={handleTagFilterChange} value={filterTag}>
          <option value="">All Tags</option>
          {/* Assuming tags are consistent, otherwise dynamically generate options */}
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Literature">Literature</option>
        </select>
        <input
          type="date"
          onChange={handleTimestampFilterChange}
          value={filterTimestamp}
        />
      </div>
      {filteredFiles.map((file) => (
        <div key={file.id} className="file-item">
          <p>Filename: {file.fileName}</p>
          <p>Subject: {file.subject}</p>
          <p>Tags: {file.tags.join(', ')}</p>
          <p>Uploaded At: {file.createdAt.toDate().toString()}</p>
          <button onClick={() => handleDownload(file.fileUrl, file.fileName)}>Download</button>
        </div>
      ))}
    </div>
  );
};

export default UploadedFilesList;

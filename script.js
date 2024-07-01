document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('uploadForm')) {
      const uploadForm = document.getElementById('uploadForm');
      const fileList = document.getElementById('fileList');
  
      // Load existing files from localStorage
      const files = JSON.parse(localStorage.getItem('files')) || [];
      files.forEach(displayFile);
  
      // Handle file upload
      uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('fileInput');
        const subjectInput = document.getElementById('subjectInput');
        const file = fileInput.files[0];
        const subject = subjectInput.value;
  
        if (file && subject) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const fileData = {
              name: file.name,
              subject,
              content: e.target.result,
            };
            files.push(fileData);
            localStorage.setItem('files', JSON.stringify(files));
            displayFile(fileData);
            fileInput.value = '';
            subjectInput.value = '';
          };
          reader.readAsDataURL(file);
        }
      });
  
      function displayFile(fileData) {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="subject">${fileData.subject}</span>
          <a href="${fileData.content}" download="${fileData.name}">${fileData.name}</a>
        `;
        fileList.appendChild(li);
      }
    }
  });
  
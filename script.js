document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('uploadForm')) {
        const uploadForm = document.getElementById('uploadForm');
        const fileList = document.getElementById('fileList');
        const tagsDropdown = document.getElementById('tagsDropdown');

        uploadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fileInput = document.getElementById('fileInput');
            const subjectInput = document.getElementById('subjectInput');
            const selectedTags = Array.from(tagsDropdown.querySelectorAll('a.selected'))
                .map(a => a.getAttribute('data-value'));
            const file = fileInput.files[0];
            const subject = subjectInput.value;

            if (file && subject && selectedTags.length > 0) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const fileData = {
                        name: file.name,
                        subject,
                        tags: selectedTags,
                        content: e.target.result,
                        timestamp: new Date().toLocaleString(),
                    };
                    saveFile(fileData);
                    displayFile(fileData);
                    fileInput.value = '';
                    subjectInput.value = '';
                    clearSelectedTags();
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select a file, enter a subject, and choose at least one tag.');
            }
        });

        function saveFile(fileData) {
            let files = JSON.parse(localStorage.getItem('files')) || [];
            files.push(fileData);
            localStorage.setItem('files', JSON.stringify(files));
        }

        function displayFile(fileData) {
            const li = document.createElement('li');
            li.innerHTML = `
          <span class="subject">${fileData.subject}</span><br>
          <span>${fileData.name}</span><br>
          <span class="details">${fileData.tags.join(', ')}</span><br>
          <button onclick="downloadFile('${fileData.content}', '${fileData.name}')">Download</button><br>
          <span class="details">(${fileData.timestamp})</span>
        `;
            li.classList.add('file-item');
            fileList.appendChild(li);
        }

        window.downloadFile = (content, filename) => {
            const link = document.createElement('a');
            link.href = content;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        function clearSelectedTags() {
            Array.from(tagsDropdown.getElementsByTagName('a')).forEach(a => a.classList.remove('selected'));
        }

        // Handle clicking on tags in the dropdown
        tagsDropdown.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                e.target.classList.toggle('selected');
            }
        });

        // Highlight selected tags when page loads (optional)
        document.addEventListener('DOMContentLoaded', () => {
            const selectedTags = JSON.parse(localStorage.getItem('selectedTags')) || [];
            selectedTags.forEach(tag => {
                const tagElement = tagsDropdown.querySelector(`a[data-value="${tag}"]`);
                if (tagElement) {
                    tagElement.classList.add('selected');
                }
            });
        });

        // Store selected tags in local storage when clicked
        tagsDropdown.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                const selectedTags = Array.from(tagsDropdown.querySelectorAll('a.selected'))
                    .map(a => a.getAttribute('data-value'));
                localStorage.setItem('selectedTags', JSON.stringify(selectedTags));
            }
        });
    }
});

const chatrooms = {
    math: [],
    science: [],
    history: [],
    english: []
};

let currentChatroom = '';

function openChatroom(room) {
    currentChatroom = room;
    document.getElementById('chatroom').style.display = 'flex';
    document.getElementById('messages').innerHTML = chatrooms[room].map(message => `<p>${message}</p>`).join('');
}

function sendMessage() {
    const messageText = document.getElementById('messageText').value;
    if (messageText.trim() === '') return;
    
    chatrooms[currentChatroom].push(messageText);
    document.getElementById('messages').innerHTML = chatrooms[currentChatroom].map(message => `<p>${message}</p>`).join('');
    document.getElementById('messageText').value = '';
}

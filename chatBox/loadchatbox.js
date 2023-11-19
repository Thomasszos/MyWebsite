function loadChatbox() {
    fetch('../chatBox/chatbox.html')  // Update the path to your chatbox.html
        .then(response => response.text())
        .then(html => {
            document.body.innerHTML += html;
            loadMessages();       // Load and display messages
            // After loading, initialize event listeners or other necessary scripts
        })
        .catch(error => console.error('Error loading the chatbox:', error));
}

function initializeChatbox() {
    var chatButton = document.getElementById('chatButton');
    var sendMessageButton = document.querySelector('#chatBox button');

    if (chatButton) {
        chatButton.addEventListener('click', toggleChat);
    }

    if (sendMessageButton) {
        sendMessageButton.addEventListener('click', sendMessage);
    }
}

function toggleChat() {
    var chatBox = document.getElementById("chatBox");
    chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";
}

function sendMessage() {
    var input = document.getElementById("chatInput");
    var message = input.value;
    input.value = "";

    if (message.trim() === "") return;

    saveMessage(message);
    displayMessage(message);
}

function saveMessage(message) {
    // Get existing messages from localStorage or initialize an empty array
    var messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.push(message); // Add new message
    localStorage.setItem("chatMessages", JSON.stringify(messages)); // Save back to localStorage
}

function loadMessages() {
    var savedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    savedMessages.forEach(message => displayMessage(message));
}

function displayMessage(message) {
    var messages = document.getElementById("messages");
    var newMessage = document.createElement("p");
    newMessage.textContent = message;
    messages.appendChild(newMessage);
}

// Call the function to load the chatbox
loadChatbox();



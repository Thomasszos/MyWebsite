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

/**function sendMessage() {
    var input = document.getElementById("chatInput");
    var usermessage = input.value;
    input.value = "";

    if (usermessage.trim() === "") return;

    saveMessage("You: " + usermessage);
    displayMessage("You: " + usermessage);
    getChatGPTResponse(usermessage);

}

function getChatGPTResponse(){
    var theResponse = "wassup";

    //<script src="chatBox/loadchatbox.js"></script> <!-- Update with the correct path -->

    saveMessage("ChatGPT: " + theResponse);
    displayMessage("ChatGPT: " + theResponse);
}**/

function sendMessage() {
    var input = document.getElementById("chatInput");
    var message = input.value;
    input.value = "";

    if (message.trim() === "") return;
    displayMessage("You: " + message);
    getChatGPTResponse(message);
}

function getChatGPTResponse(message) {
    fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        displayMessage("ChatGPT: " + data.response);
    })
    .catch(error => console.error('Error:', error));
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
   // saveMessage(message);
}

// Call the function to load the chatbox
loadChatbox();



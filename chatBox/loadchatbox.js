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
    var usermessage = input.value;
    input.value = "";

    if (usermessage.trim() === "") return;

    saveMessage("You: " + usermessage);
    displayMessage("You: " + usermessage);
    getChatGPTResponse(usermessage);

}

function getChatGPTResponse(){
    var theResponse = "wassup";
    displayMessage("ChatGPT: " + theResponse);
}

/**function sendMessage() {
    var input = document.getElementById("chatInput");
    var userMessage = input.value;
    input.value = "";

    if (userMessage.trim() === "") return;

    displayMessage("You: " + userMessage);
    getChatGPTResponse(userMessage);
}

function getChatGPTResponse(message) {
    // Replace this URL with the endpoint of your serverless function or ChatGPT API
    const apiEndpoint = "../chatBox/chatboxAI.js"; 

    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Include additional headers if needed
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        // Assuming the response contains a field 'response' with ChatGPT's text
        displayMessage("ChatGPT: " + data.response);
    })
    .catch(error => console.error('Error in ChatGPT response:', error));
}**/


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



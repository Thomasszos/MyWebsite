function loadChatbox() {

    const currentPage = window.location.pathname.split('/').pop();

    let chatboxPath = '';
    let cssPath = '';
    if (currentPage === 'index.html' || currentPage === '') {
        chatboxPath = 'chatBox/chatbox.html'; // Path from the root for chatbox HTML
        cssPath = 'css/chatbox.css';          // Path from the root for chatbox CSS
    } else {
        chatboxPath = '../chatBox/chatbox.html'; // Path from subdirectories for chatbox HTML
        cssPath = '../css/chatbox.css';         // Path from subdirectories for chatbox CSS
    }

    fetch(chatboxPath)
    .then(response => response.text())
    .then(html => {
        document.body.innerHTML += html;
        // Set the correct path for the CSS file
        const chatboxCSSLink = document.createElement('link');
        chatboxCSSLink.rel = 'stylesheet';
        chatboxCSSLink.href = cssPath;
        document.head.appendChild(chatboxCSSLink);

        // Load and display messages, initialize event listeners or other scripts
        loadMessages();
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

/**function getChatGPTResponse(message) {
    //displayMessage("hi");
    fetch('https://tomschatbot-06c19f746de1.herokuapp.com/', {
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
}**/


/**function getChatGPTResponse(message) {
    fetch('https://74hlhx96w2.execute-api.us-east-2.amazonaws.com/MyChatBox/ChatWithMeBot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        displayMessage("ChatGPT: " + data.response);
    })
    .catch(error => console.error('Error:', error));
}**/

function getChatGPTResponse(message) {
    // Prepare the request data
    const requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message })
    };

    // Log the request data
    console.log('Sending request to API:', requestData);

    fetch('https://tomschatbot-06c19f746de1.herokuapp.com/chat', requestData)
    .then(response => {
        // Log the raw response
        console.log('Raw response:', response);

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Log the response data
        console.log('Response data:', data);

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

function clearMessageHistory() {
    // Option 1: Remove the item completely
    localStorage.removeItem("chatMessages");

    // Option 2: Set it to an empty array
    // localStorage.setItem("chatMessages", JSON.stringify([]));

    // Optionally, you can also clear the displayed messages in the chatbox
    var messagesContainer = document.getElementById("messages");
    if (messagesContainer) {
        messagesContainer.innerHTML = '';
    }
}


// Call the function to load the chatbox
loadChatbox();



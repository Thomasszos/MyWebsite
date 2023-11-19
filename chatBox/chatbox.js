function toggleChat() {
    var chatBox = document.getElementById("chatBox");
    chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";
}

function sendMessage() {
    var input = document.getElementById("chatInput");
    var message = input.value;
    input.value = "";

    if (message.trim() === "") return;

    var messages = document.getElementById("messages");
    var newMessage = document.createElement("p");
    newMessage.textContent = message;
    messages.appendChild(newMessage);
}

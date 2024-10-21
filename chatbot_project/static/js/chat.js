document.getElementById('send-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        const chatBox = document.getElementById('chat-box');
        chatBox.innerHTML += `<div>User: ${userInput}</div>`;
        chatBox.innerHTML += `<div>Bot: ${data.response}</div>`;
        document.getElementById('user-input').value = '';
    });
});
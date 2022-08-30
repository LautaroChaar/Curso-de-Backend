const socket = io();

socket.on('from-server-messages', messages => {
    render(messages);
});

function render(messages) {
    const messagesHTML = messages.map( m => {
        return `<p style= 'color: brown'><b style= 'color: blue'>${m.author}</b> [${m.time}]: <span style= 'color: green; font-family: italic'>${m.text}</span></p>`;
    }).join('');  
    document.querySelector('#history').innerHTML = messagesHTML;
}

function sendMessage() {
    const date = new Date();
    const time = date.toLocaleString();
    const validationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const inputUser = document.querySelector('#user');
    const inputContent = document.querySelector('#messageContent');
    if ((inputUser.value != "") && (validationRegex.test(inputUser.value)) && (inputContent.value != "")) {
        const messages = {
        author: inputUser.value,
        time,
        text: inputContent.value
    }
    socket.emit('from-client-messages', messages);
    inputContent.value = "";
    } else {
        alert('Por favor, complete correctamente los campos.')
    }  
}

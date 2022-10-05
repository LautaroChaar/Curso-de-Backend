const socket = io();

const schemaAuthor = new normalizr.schema.Entity('author', {}, { idAttribute: 'id' });

const schemaMensaje = new normalizr.schema.Entity('post', { author: schemaAuthor }, { idAttribute: 'id' });

const schemaMensajes = new normalizr.schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })



socket.on('from-server-messages', messages => {
    let mensajesNsize = JSON.stringify(messages).length;
    let mensajesD = normalizr.denormalize(messages.result, schemaMensajes, messages.entities);
    let mensajesDsize = JSON.stringify(mensajesD).length;
    let compresion = parseInt((mensajesNsize * 100) / mensajesDsize);
    document.querySelector('#compresion').innerHTML = `Compresión: ${compresion}%`;
    render(mensajesD.mensajes);
});

function render(messages) {
    const messagesHTML = messages.map( m => {
        return `<p style= 'color: brown'><b style= 'color: blue'>${m.author.email}</b> [${m.timestamp}]: <span style= 'color: green; font-family: italic'>${m.text}</span></p>`;
    }).join('');  
    document.querySelector('#history').innerHTML = messagesHTML;
}

function sendMessage() {
    const timestamp = new Date().toLocaleString();
    const validationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const inputEmail = document.querySelector('#email');
    const inputContent = document.querySelector('#messageContent');
    const inputName = document.querySelector('#nombre');
    const inputLastName = document.querySelector('#apellido');
    const inputAlias = document.querySelector('#alias');
    const inputAge = document.querySelector('#edad');
    const inputAvatar = document.querySelector('#avatar');
    if ((inputEmail.value != "") && (validationRegex.test(inputEmail.value)) && (inputName.value != "") && (inputContent.value != "") && (inputLastName.value != "") && (inputAge.value != "") && (inputAvatar.value != "") && (inputAlias.value != "")) {
        const nuevoMensaje = {
        author: {
            email: inputEmail.value,
            nombre: inputName.value,
            apellido: inputLastName.value,
            edad: inputAge.value,
            alias: inputAlias.value,
            avatar: inputAvatar.value,  
        },
        timestamp,
        text: inputContent.value
    }
    socket.emit('from-client-messages', nuevoMensaje);
    inputContent.value = "";
    } else {
        alert('Por favor, complete correctamente los campos.')
    }  
}

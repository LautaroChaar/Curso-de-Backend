const socket = io();

socket.on('from-server-messages', messages => {
    render(messages);
});

function render(messages) {
    const messagesHTML = messages.map( m => {
        return `<p style= 'color: brown'><b style= 'color: blue'>${m.author}</b> [${m.date}]: <span style= 'color: green; font-family: italic'>${m.text}</span></p>`;
    }).join('');  
    document.querySelector('#history').innerHTML = messagesHTML;
}

function sendMessage() {
    const date = new Date().toLocaleString();
    const validationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const inputUser = document.querySelector('#user');
    const inputContent = document.querySelector('#messageContent');
    if ((inputUser.value != "") && (validationRegex.test(inputUser.value)) && (inputContent.value != "")) {
        const messages = {
        author: inputUser.value,
        date,
        text: inputContent.value
    }
    socket.emit('from-client-messages', messages);
    inputContent.value = "";
    } else {
        alert('Por favor, complete correctamente los campos.')
    }  
}


socket.on('from-server-product', products => {
    renderProducts(products);
});

function renderProducts(products) {
    if (products.length > 0) {
        document.querySelector('#tableContainer').innerHTML = `
        <div class="table-responsive">
            <table class="table table-dark" id="table">
                <tr style="color: yellow">
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Imagen</th>
                </tr>
            </table>
        </div>
        `;
        const table = document.querySelector('#table');
        products.forEach( product => {
            const node = document.createElement("tr");
            table.appendChild(node);
            const productHTML = `
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>
                    <img width="30" src="${product.url}" alt="">
                </td>
            ` 
            node.innerHTML = productHTML
        });

    } else {
        document.querySelector('#tableContainer').innerHTML = `
        <h3 class="alert alert-warning text-center">No se encontraron productos</h3>
        `
    }
}

function sendProduct() {
    const title = document.querySelector('#nombre');
    const price = document.querySelector('#precio');
    const url = document.querySelector('#imagen');
    if (title.value != "" && price.value != "" && url.value != "") {
        const product = {
        title: title.value,
        price: price.value,
        url: url.value
        }
    socket.emit('from-client-product', product);
    title.value = "";
    price.value = "";
    url.value = "";
    } else {
        alert('Por favor ingrese un producto.')
    }
}
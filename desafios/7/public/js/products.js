
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

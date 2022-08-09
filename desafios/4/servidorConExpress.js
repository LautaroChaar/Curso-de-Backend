const express = require('express');
const Contenedor = require('../3/manejoDeArchivos');

const app = express();
const products = new Contenedor('../3/productos.json');

const PORT = 8080;

app.get('/',  (request, response) => {
    response.send('Servidor iniciado con express')
});

app.get('/productos', async (request, response) => {
    response.send(await products.getAll())
});

app.get('/productosRandom', async(request, response) => {
    response.send(await products.getRandom())
});

const server = app.listen(PORT, () => {
    
});


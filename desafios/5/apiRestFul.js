const express = require('express');
const morgan = require('morgan');

const app = express();

const routerProducts = require('./src/routes/products.routes.js');

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

app.use('/api/products', routerProducts);

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
});

server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});

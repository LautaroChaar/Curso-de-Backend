const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const date = new Date().toLocaleString();

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('views', './views');
app.set('view engine', 'pug');


const DB_PRODUCTS  = require('../5/data/products-data');

const DB_MESSAGES = [
    { author: 'JhonLennon@gmail.com', text: 'All you need is love <3', date },
    { author: 'UncleBen@hotmail.com', text: 'Great power comes great responsibility!', date},
    { author: 'MarceloGallardo@gmail.com', text: 'Que la gente crea...', date}
];


app.get('/', (req, res) => {
    res.render('viewMain', {DB_PRODUCTS});
});

app.get('/products', (req, res) => {
    res.render('viewProductSocket', {DB_PRODUCTS})
});


const PORT = 3000;

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
});

server.on('error', err => console.log(`error en server ${err}`));


io.on('connection', socket => {
    console.log(`Nuevo cliente conectado! ${socket.id}`);
    
    io.sockets.emit('from-server-messages', DB_MESSAGES);

    socket.on('from-client-messages', messages => {
        DB_MESSAGES.push(messages);
        io.sockets.emit('from-server-messages', DB_MESSAGES)
    });

    io.sockets.emit('from-server-product', DB_PRODUCTS);

    socket.on('from-client-product', product => {
        DB_PRODUCTS.push(product);
        io.sockets.emit('from-server-product', DB_PRODUCTS)
    });

});



import  express  from 'express';
import { createServer  } from 'http';
import { Server } from 'socket.io';
import { Contenedor } from "./src/container/container.js";
import { configMariaDB } from "./src/utils/configMariaDB.js";
import { configSQLite } from "./src/utils/configSQLite.js";

const apiProd = new Contenedor('productos', configMariaDB);
const apiMessage = new Contenedor('chat', configSQLite);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('views', './views');
app.set('view engine', 'pug');


const DB_PRODUCTS  = await apiProd.getAll();

const DB_MESSAGES = await apiMessage.getAll();

async function addProduct (product) {
    await apiProd.add(product);
}

async function addMessage(messages) {
    await apiMessage.add(messages);
}


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
        addMessage(messages)
        io.sockets.emit('from-server-messages', DB_MESSAGES)
    });

    io.sockets.emit('from-server-product', DB_PRODUCTS);

    socket.on('from-client-product', product => {
        DB_PRODUCTS.push(product);
        addProduct(product);
        io.sockets.emit('from-server-product', DB_PRODUCTS)
    });

});
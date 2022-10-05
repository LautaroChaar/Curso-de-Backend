import  express  from 'express';
import { createServer  } from 'http';
import { Server } from 'socket.io';
import {routerProductos} from './src/routes/productos.routes.js';
import {routerCarrito} from './src/routes/carrito.routes.js';
import { routerRandomProductos } from './src/routes/randomProducts.routes.js';
import { routerMensajes, listarMensajesNormalizados, agregarmensaje } from './src/routes/mensajes.routes.js';


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.set('views', './views');
app.set('view engine', 'pug');

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);
app.use('/api/productos-test', routerRandomProductos);
app.use('/api/mensajes', routerMensajes);


app.get('*', (req, res)=>{
    res.status(404).json({
        error: 404,
        descripcion: `Ruta ${req.url} no encontrada mediante el metodo ${req.method}`
    })
});


const PORT = 8080 || process.env.PORT;

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
});

server.on('error', err => console.log(`error en server ${err}`));

io.on('connection', async socket => {
    console.log(`Nuevo cliente conectado! ${socket.id}`);

    io.sockets.emit('from-server-messages', await listarMensajesNormalizados());

    socket.on('from-client-messages', async messages => {
        await agregarmensaje(messages);
        io.sockets.emit('from-server-messages', await listarMensajesNormalizados())
    });

});
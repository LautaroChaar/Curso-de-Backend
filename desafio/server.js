import  express  from 'express';
import { createServer  } from 'http';
import { Server } from 'socket.io';
import {routerProductos} from './src/routes/productos.routes.js';
import {routerCarrito} from './src/routes/carrito.routes.js';
import { routerRandomProductos } from './src/routes/randomProducts.routes.js';
import { routerMensajes, listarMensajesNormalizados, agregarmensaje } from './src/routes/mensajes.routes.js';
import { routerAuth } from './src/routes/auth.routes.js';
import { routerHome } from './src/routes/home.routes.js';
import { routerInfo } from './src/routes/info.routes.js';
import { routerRandoms } from './src/routes/randoms.routes.js';
import connectMongo from 'connect-mongo';
import session from "express-session";
import passport from 'passport';
import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os';
import { logger } from './src/utils/configLogger.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


const MongoStore = connectMongo.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 600 
})


app.use(session({
    store: MongoStore,
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.set('views', './views');
app.set('view engine', 'pug');

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);
app.use('/api/productos-test', routerRandomProductos);
app.use('/api/mensajes', routerMensajes);
app.use('/api/', routerAuth);
app.use('/api/home', routerHome);
app.use('/api/randoms', routerRandoms);
app.use('/api/info', routerInfo);


app.get('*', (req, res)=>{
    const {url, method } = req;
    logger.warn(`Ruta ${method} ${url} no implementada`)
    res.render('viewRutaIncorrecta', { url, method });
});

let args = minimist(process.argv.slice(2));

let options = {default: {port: 8080, modo: 'FORK'}};
minimist([], options);

const CPU_CORES = os.cpus().length;
const MODO = args.modo || args.m || options.default.modo;
const PORT =  parseInt(process.env.PORT) || parseInt(process.argv[2]) || args.port || args.p || options.default.port ;


if (cluster.isPrimary && MODO == 'CLUSTER') {

    for (let i = 0; i < CPU_CORES; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        logger.info(`Worker ${process.pid} ${worker.id} ${worker.pid} finalizo ${new Date().toLocaleString()}`);
        cluster.fork();
    });

} else {

    if (MODO != 'FORK' && MODO != 'CLUSTER') {
        logger.error(`El modo de ejecucion solicitado ( ${MODO} ) es incorrecto.`)
        throw new Error()
    } 

    const server = httpServer.listen(PORT, () => {
        logger.info(`Servidor escuchando en puerto http://localhost:${PORT} - PID WORKER ${process.pid}`);
    });

    server.on('error', err => logger.error(`error en server ${err}`));


    io.on('connection', async socket => {
        logger.info(`Nuevo cliente conectado! ${socket.id}`);

        io.sockets.emit('from-server-messages', await listarMensajesNormalizados());

        socket.on('from-client-messages', async messages => {
            await agregarmensaje(messages);
            io.sockets.emit('from-server-messages', await listarMensajesNormalizados())
        });

    });
}
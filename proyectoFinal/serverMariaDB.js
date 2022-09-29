import  express  from 'express';
import {routerCarritoMongo}  from './src/routes/carritoMongo.routes.js';
import {routerProductosMongo} from './src/routes/productosMongo.routes.js';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/productos', routerProductosMongo);
app.use('/api/carrito', routerCarritoMongo);

app.get('*', (req, res)=>{
    res.status(404).json({
        error: 404,
        descripcion: `Ruta ${req.url} no encontrada mediante el metodo ${req.method}`
    })
});

const PORT = 8080 || process.env.PORT;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchado en http://localhost:${PORT}`)
});

server.on('error', err => console.log(`error en server ${err}`));
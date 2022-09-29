import  express  from 'express';
import {routerProductos} from './src/routes/productos.routes.js';
import {routerCarrito} from './src/routes/carrito.routes.js';

const app = express();

app.use(express.static('/public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

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
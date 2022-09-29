import  express  from 'express';
import routerProductosMemoria from './src/routes/productosMemoria.routes.js';
import routerCarritoMemoria from './src/routes/carritoMemoria.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('/public'));

app.use('/api/productos', routerProductosMemoria);
app.use('/api/carrito', routerCarritoMemoria);

app.get('*', (req, res)=>{
    res.status(404).json({
        error: 404,
        descripcion: `Ruta ${req.url} no encontrada mediante el metodo ${req.method}`
    })
});

const PORT = 8080 || process.env.PORT;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
});

server.on('error', err => console.log(`error en server ${err}`));
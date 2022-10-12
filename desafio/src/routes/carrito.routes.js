import  express  from 'express';
import * as dotenv from 'dotenv'; 
dotenv.config()

import { carritosDao as apiCarrito } from '../daos/index.js';
import { productosDao as apiProductos } from '../daos/index.js';

const routerCarrito = express.Router();

routerCarrito.post('/', async (req, res) => {
    res.json((await apiCarrito.add(req.body)));
});

routerCarrito.delete('/:id', async (req, res) => {
    res.json((await apiCarrito.deleteById(req.params.id)));
}); 

routerCarrito.get('/:id/productos', async (req, res) => {
    const carrito = await apiCarrito.getById(req.params.id);
    res.json((carrito.productos));
}); 

routerCarrito.post('/:id/productos', async (req, res) => {
    const carrito = await apiCarrito.getById(req.params.id);
    const producto = await apiProductos.getById(req.body.id);
    carrito.productos.push(producto);
    const elem = {...carrito, id: Number(req.params.id)};
    await apiCarrito.update(elem)
    res.end();
}); 

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const carrito = await apiCarrito.getById(req.params.id);
    const index = carrito.productos.findIndex( p => p.id == req.params.id_prod);
    if (index != -1 ) {
        carrito.productos.splice(index, 1);
        const elem = {...carrito, id: Number(req.params.id)};
        await apiCarrito.update(elem);
    }
    res.end();
});

export { routerCarrito };
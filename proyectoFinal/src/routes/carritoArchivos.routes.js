import  express  from 'express';
import CarritosDaoArchivos from '../daos/carritos/carritosDaoArchivos.js';

const routerCarrito = express.Router();
const carritoApi = new CarritosDaoArchivos();



routerCarrito.post('/', async (req, res) => {
    res.json((await carritoApi.newCart(req, res)))
});

routerCarrito.delete('/:id', async (req, res) => {
    res.json((await carritoApi.deleteCart(req, res)))
}); 

routerCarrito.get('/:id/productos', async (req, res) => {
    res.json((await carritoApi.getCartProducts(req, res)))
}); 

routerCarrito.post('/:id/productos', async (req, res) => {
    res.json((await carritoApi.addCartProduct(req, res)))
}); 

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    res.json((await carritoApi.deleteCartProduct(req, res)))
});

export { routerCarrito };

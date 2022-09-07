import  express  from 'express';
import Contenedor from '../../controllers/contenedor.controller.js';

const routerCarrito = express.Router();
const carritoApi = new Contenedor('data/productosData.json', 'data/carritoData.json');
const productos = new Contenedor('data/productosData.json', 'data/carritoData.json');


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
    res.json((await productos.addCartProduct(req, res)))
}); 

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    res.json((await carritoApi.deleteCartProduct(req, res)))
});

export { routerCarrito };

import  express  from 'express';
import * as dotenv from 'dotenv'; 
dotenv.config()

import { carritosDao as apiCarrito } from '../daos/index.js';


const routerCarrito = express.Router();

routerCarrito.post('/', async (req, res) => {
    res.json((await apiCarrito.newCart(req, res)))
});

routerCarrito.delete('/:id', async (req, res) => {
    res.json((await apiCarrito.deleteCart(req, res)))
}); 

routerCarrito.get('/:id/productos', async (req, res) => {
    res.json((await apiCarrito.getCartProducts(req, res)))
}); 

routerCarrito.post('/:id/productos', async (req, res) => {
    res.json((await apiCarrito.addCartProduct(req, res)))
}); 

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    res.json((await apiCarrito.deleteCartProduct(req, res)))
});

export { routerCarrito };
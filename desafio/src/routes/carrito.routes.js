import  express  from 'express';
import { auth } from '../../auth/index.js';
import { deleteCartById, getCartProducts, cartView, addToCart, buyProducts, deleteCartProduct } from '../controllers/carrito.controller.js';

const routerCarrito = express.Router();

routerCarrito.delete('/:id', deleteCartById); 

routerCarrito.get('/:id/productos', getCartProducts); 

routerCarrito.get('/', auth, cartView); 

routerCarrito.post('/productos', auth, addToCart); 

routerCarrito.post('/comprar/productos', auth, buyProducts); 

routerCarrito.delete('/:id/productos/:id_prod',deleteCartProduct);

export { routerCarrito };




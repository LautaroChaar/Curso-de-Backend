import  express  from 'express';
import CarritosDaoMemoria from '../daos/carritos/carritosDaoMemoria.js';

const carritoMemoria = new CarritosDaoMemoria();
const routerCarritoMemoria = express.Router();


routerCarritoMemoria.get('/:id/productos', carritoMemoria.getCartProducts );

routerCarritoMemoria.post('/', carritoMemoria.newCart );

routerCarritoMemoria.post('/:id/productos', carritoMemoria.addCartProduct );

routerCarritoMemoria.delete('/:id/productos/:id_prod', carritoMemoria.deleteCartProduct );

routerCarritoMemoria.delete('/:id', carritoMemoria.deleteCart );

export default routerCarritoMemoria;


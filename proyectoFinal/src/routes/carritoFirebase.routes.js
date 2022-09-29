import  express  from 'express';
import CarritosDaoFirebase from '../daos/carritos/carritosDaoFirebase.js';

const routerCarritoFirebase = express.Router();
const carritoFirebaseApi = new CarritosDaoFirebase();

routerCarritoFirebase.post('/', async (req, res) => {
    res.json((await carritoFirebaseApi.newCart(req, res)))
});

routerCarritoFirebase.delete('/:id', async (req, res) => {
    res.json((await carritoFirebaseApi.deleteCart(req, res)))
}); 

routerCarritoFirebase.get('/:id/productos', async (req, res) => {
    res.json((await carritoFirebaseApi.getCartProducts(req, res)))
}); 

routerCarritoFirebase.post('/:id/productos', async (req, res) => {
    res.json((await carritoFirebaseApi.addCartProduct(req, res)))
}); 

routerCarritoFirebase.delete('/:id/productos/:id_prod', async (req, res) => {
    res.json((await carritoFirebaseApi.deleteCartProduct(req, res)))
});

export { routerCarritoFirebase };
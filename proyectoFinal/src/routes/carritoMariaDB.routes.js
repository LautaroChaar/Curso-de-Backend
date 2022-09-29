import  express  from 'express';
import CarritosDaoMongoDB from '../daos/carritos/carritosDaoMongoDB.js';

const routerCarritoMongo = express.Router();
const carritoMongoApi = new CarritosDaoMongoDB();

routerCarritoMongo.post('/', async (req, res) => {
    res.json((await carritoMongoApi.newCart(req, res)))
});

routerCarritoMongo.delete('/:id', async (req, res) => {
    res.json((await carritoMongoApi.deleteCart(req, res)))
}); 

routerCarritoMongo.get('/:id/productos', async (req, res) => {
    res.json((await carritoMongoApi.getCartProducts(req, res)))
}); 

routerCarritoMongo.post('/:id/productos', async (req, res) => {
    res.json((await carritoMongoApi.addCartProduct(req, res)))
}); 

routerCarritoMongo.delete('/:id/productos/:id_prod', async (req, res) => {
    res.json((await carritoMongoApi.deleteCartProduct(req, res)))
});

export { routerCarritoMongo };
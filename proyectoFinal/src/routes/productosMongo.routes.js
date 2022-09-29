import  express  from 'express';
import ProductosDaoMongoDB from '../daos/productos/productosDaoMongoDB.js';
import { config } from '../utils/config.js';

const routerProductosMongo = express.Router();
const productosMongoApi = new ProductosDaoMongoDB();

const isAdmin = config.isAdmin;
const admin = (req, res, next) => {
    if (!isAdmin) {
        res.status(403).json({code: 403, msg: `Error: Ingreso no autorizado mediante el metodo ${req.method}`});
    } else {
        next();
    }
}

routerProductosMongo.get('/:id?', async (req, res) => {
    res.json((await productosMongoApi.getProducts(req, res)))
}); 

routerProductosMongo.post('/', admin, async (req, res) => {
    res.json((await productosMongoApi.addProduct(req, res)))
}); 

routerProductosMongo.put('/:id', admin, async (req, res) => {
    res.json((await productosMongoApi.updateProduct(req, res)))
}); 

routerProductosMongo.delete('/:id', admin, async (req, res) => {
    res.json((await productosMongoApi.deleteProduct(req, res)))
}); 

export { routerProductosMongo };
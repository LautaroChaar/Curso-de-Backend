import  express  from 'express';
import ProductosDaoFirebase from '../daos/productos/productosDaoFirebase.js';
import { config } from '../utils/config.js';

const routerProductosFirebase = express.Router();
const productosFirebaseApi = new ProductosDaoFirebase();

const isAdmin = config.isAdmin;
const admin = (req, res, next) => {
    if (!isAdmin) {
        res.status(403).json({code: 403, msg: `Error: Ingreso no autorizado mediante el metodo ${req.method}`});
    } else {
        next();
    }
}

routerProductosFirebase.get('/:id?', async (req, res) => {
    res.json((await productosFirebaseApi.getProducts(req, res)))
}); 

routerProductosFirebase.post('/', admin, async (req, res) => {
    res.json((await productosFirebaseApi.addProduct(req, res)))
}); 

routerProductosFirebase.put('/:id', admin, async (req, res) => {
    res.json((await productosFirebaseApi.updateProduct(req, res)))
}); 

routerProductosFirebase.delete('/:id', admin, async (req, res) => {
    res.json((await productosFirebaseApi.deleteProduct(req, res)))
}); 

export { routerProductosFirebase };
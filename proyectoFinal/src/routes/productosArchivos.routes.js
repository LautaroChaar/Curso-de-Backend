import  express  from 'express';
import ProductosDaoArchivos from '../daos/productos/productosDaoArchivos.js';
import { config } from '../utils/config.js';

const routerProductos = express.Router();
const productosApi = new ProductosDaoArchivos();

const isAdmin = config.isAdmin;
const admin = (req, res, next) => {
    if (!isAdmin) {
        res.status(403).json({code: 403, msg: `Error: Ingreso no autorizado mediante el metodo ${req.method}`});
    } else {
        next();
    }
}

routerProductos.get('/:id?', async (req, res) => {
    res.json((await productosApi.getProducts(req, res)))
}); 

routerProductos.post('/', admin, async (req, res) => {
    res.json((await productosApi.addProduct(req, res)))
}); 

routerProductos.put('/:id', admin, async (req, res) => {
    res.json((await productosApi.updateProduct(req, res)))
}); 

routerProductos.delete('/:id', admin, async (req, res) => {
    res.json((await productosApi.deleteProduct(req, res)))
}); 

export { routerProductos };
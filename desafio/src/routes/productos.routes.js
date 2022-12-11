import  express  from 'express';
import { config } from '../utils/config.js';
import { logger } from '../utils/configLogger.js';
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct, deleteAllProducts } from '../controllers/productos.controller.js';

const routerProductos = express.Router();

const isAdmin = config.isAdmin;

const admin = (req, res, next) => {
    if (!isAdmin) {
        logger.error(`Error: Ingreso no autorizado mediante el metodo ${req.method}`);
        res.status(403).json({code: 403, msg: `Error: Ingreso no autorizado mediante el metodo ${req.method}`});
    } else {
        next();
    }
}

routerProductos.get('/', getAllProducts); 

routerProductos.get('/:id', getProductById); 

routerProductos.post('/', admin, addProduct); 

routerProductos.put('/:id', admin, updateProduct); 

routerProductos.delete('/:id', admin, deleteProduct); 

routerProductos.delete('/', admin, deleteAllProducts); 

export { routerProductos };
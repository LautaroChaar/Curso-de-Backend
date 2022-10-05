import  express  from 'express';
import { config } from '../utils/config.js';
import * as dotenv from 'dotenv'; 
dotenv.config()

import { productosDao as apiProductos } from '../daos/index.js';

const routerProductos = express.Router();

const isAdmin = config.isAdmin;
const admin = (req, res, next) => {
    if (!isAdmin) {
        res.status(403).json({code: 403, msg: `Error: Ingreso no autorizado mediante el metodo ${req.method}`});
    } else {
        next();
    }
}

routerProductos.get('/:id?', async (req, res) => {
    res.json((await apiProductos.getProducts(req, res)))
}); 

routerProductos.post('/', admin, async (req, res) => {
    res.json((await apiProductos.addProduct(req, res)))
}); 

routerProductos.put('/:id', admin, async (req, res) => {
    res.json((await apiProductos.updateProduct(req, res)))
}); 

routerProductos.delete('/:id', admin, async (req, res) => {
    res.json((await apiProductos.deleteProduct(req, res)))
}); 

export { routerProductos };
import  express  from 'express';
import { config } from '../utils/config.js';
import { logger } from '../utils/configLogger.js';
import * as dotenv from 'dotenv'; 
dotenv.config()

import { productosDao as apiProductos } from '../daos/index.js';

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

routerProductos.get('/', async (req, res) => {
    const {url, method } = req;
    logger.info(`Ruta ${method} /api/productos${url}`);
    res.json((await apiProductos.getAll()));
}); 

routerProductos.get('/:id', async (req, res) => {
    const {url, method } = req;
    logger.info(`Ruta ${method} /api/productos${url}`);
    res.json((await apiProductos.getById(req.params.id)));
}); 

routerProductos.post('/', admin, async (req, res) => {
    const {url, method } = req;
    logger.info(`Ruta ${method} /api/productos${url}`);
    res.json((await apiProductos.add(req.body)));
}); 

routerProductos.put('/:id', admin, async (req, res) => {
    const {url, method } = req;
    logger.info(`Ruta ${method} /api/productos${url}`);
    const elem = {...req.body, id: Number(req.params.id)};
    res.json((await apiProductos.update(elem)));
}); 

routerProductos.delete('/:id', admin, async (req, res) => {
    const {url, method } = req;
    logger.info(`Ruta ${method} /api/productos${url}`);
    res.json((await apiProductos.deleteById(req.params.id)));
}); 

routerProductos.delete('/', admin, async (req, res) => {
    const {url, method } = req;
    logger.info(`Ruta ${method} /api/productos${url}`);
    res.json((await apiProductos.deleteAll()));
}); 

export { routerProductos };
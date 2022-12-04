import { Router } from 'express';
import { auth } from '../../auth/index.js';
import { logger } from '../utils/configLogger.js';
import { productosDao as apiProductos } from '../daos/index.js';
import { carritosDao as apiCarritos } from '../daos/index.js';

const routerHome = new Router();
const DB_PRODUCTS = await apiProductos.getAll();


routerHome.get('/', auth, async (req, res) => {
    const nombre = req.user.username;
    const userId = req.user.id;
    const {url, method } = req;
    await apiCarritos.add(userId);
    logger.info(`Ruta ${method} /home${url}`);
    res.render('viewMain', { nombre, DB_PRODUCTS });
})


export { routerHome };


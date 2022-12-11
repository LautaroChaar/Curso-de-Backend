import { logger } from '../utils/configLogger.js';
import { productosDao as apiProductos } from '../service/index.js';
import { carritosDao as apiCarritos } from '../service/index.js';


export async function userHome(req, res) {
    const DB_PRODUCTS = await apiProductos.getAll();
    const nombre = req.user.username;
    const userId = req.user.id;
    const {url, method } = req;
    await apiCarritos.add(userId);
    logger.info(`Ruta ${method} /home${url}`);
    res.render('viewMain', { nombre, DB_PRODUCTS });
};


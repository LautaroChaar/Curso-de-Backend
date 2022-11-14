import  express  from 'express';
import { faker } from '@faker-js/faker';
import { logger } from '../utils/configLogger.js';

const routerRandomProductos = express.Router();

let DB_RANDOMPRODUCTS = [];

function generarObjeto () {
    return {
        nombre: faker.commerce.product(),
        precio: faker.finance.amount(),
        foto: faker.image.image()
        }
}

routerRandomProductos.get('/', async (req, res) => {
    for (let i = 0; i < 5; i ++) {
        DB_RANDOMPRODUCTS.push(generarObjeto());
    }
    const {url, method } = req;
    logger.info(`Ruta ${method} /api/productos-test${url}`);
    res.render('viewRandomProducts', {DB_RANDOMPRODUCTS});
    DB_RANDOMPRODUCTS = [];
}); 

export { routerRandomProductos };
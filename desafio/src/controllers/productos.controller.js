import { logger } from '../utils/configLogger.js';
import { productosDao as apiProductos } from '../service/index.js';

export async function getAllProducts(req, res) {
    const { url, method } = req;
    logger.info(`Ruta ${method} /api/productos${url}`);
    res.json((await apiProductos.getAll()));
}; 

export async function getProductById(req, res) {
    const {url, method } = req;
    logger.info(`Ruta ${method} /api/productos${url}`);
    res.json((await apiProductos.getById(req.params.id)));
}; 

export async function addProduct(req, res) {
    const {url, method } = req;
    logger.info(`Ruta ${method} /api/productos${url}`);
    res.json((await apiProductos.add(req.body)));
}; 

export async function updateProduct(req, res) {
    const {url, method } = req;
    logger.info(`Ruta ${method} /api/productos${url}`);
    const elem = {...req.body, id: Number(req.params.id)};
    res.json((await apiProductos.update(elem)));
}; 

export async function deleteProduct(req, res) {
    const {url, method } = req;
    logger.info(`Ruta ${method} /api/productos${url}`);
    res.json((await apiProductos.deleteById(req.params.id)));
}; 

export async function deleteAllProducts(req, res) {
    const {url, method } = req;
    logger.info(`Ruta ${method} /api/productos${url}`);
    res.json((await apiProductos.deleteAll()));
}; 


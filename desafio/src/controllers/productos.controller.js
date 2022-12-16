import { logger } from '../utils/configLogger.js';
import { productosDao as apiProductos } from '../service/index.js';
import ProductoDTO from '../models/dtos/productos/productosDtoMongoDB.js';
import Cotizador from '../classes/Cotizador.class.js';

const cot = new Cotizador();

export async function getAllProducts(req, res) {
    const { url, method } = req;
    logger.info(`Ruta ${method} /api/productos${url}`);
    const docs  = await apiProductos.getAll();
    const docsDto = docs.map(producto => {
        const cotizaciones = {
            precioDolar: cot.getPrice(producto.precio, 'USD'),
            precioBTC: cot.getPrice(producto.precio, 'BTC')
        }
        return new ProductoDTO(producto, cotizaciones);
    })
    res.json((docsDto));
}; 

export async function getProductById(req, res) {
    const {url, method } = req;
    logger.info(`Ruta ${method} /api/productos${url}`);
    const producto = await apiProductos.getById(req.params.id);
    const cotizaciones = {
        precioDolar: cot.getPrice(producto.precio, 'USD'),
        precioBTC: cot.getPrice(producto.precio, 'BTC')
    }
    return res.json( new ProductoDTO(producto, cotizaciones)) ;
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


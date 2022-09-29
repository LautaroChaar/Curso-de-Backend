import  express  from 'express';
import ProductosDaoMemoria from '../daos/productos/productosDaoMemoria.js';

const productosMemoria = new ProductosDaoMemoria();
const routerProductosMemoria = express.Router();


routerProductosMemoria.get('/:id?', productosMemoria.getProduct );

routerProductosMemoria.post('/', productosMemoria.addProduct );

routerProductosMemoria.put('/:id', productosMemoria.updateProduct );

routerProductosMemoria.delete('/:id', productosMemoria.deleteProduct );

export default routerProductosMemoria;


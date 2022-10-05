import ContenedorMemoria from '../../containers/contenedorMemoria.js';
import { DB_CARRITOS } from '../../../data/carritos.js';
import { DB_PRODUCTOS } from '../../../data/productos.js';

class CarritosDaoMemoria extends ContenedorMemoria {
    constructor() {
        super(DB_CARRITOS, DB_PRODUCTOS);
    }
}

export default CarritosDaoMemoria;


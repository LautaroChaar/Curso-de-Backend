import ContenedorMemoria from '../../containers/contenedorMemoria.js';
import { DB_CARRITOS } from '../../../data/carritos.js';

class CarritosDaoMemoria extends ContenedorMemoria {
    constructor() {
        super(DB_CARRITOS);
    }
}

export default CarritosDaoMemoria;
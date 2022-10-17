import ContenedorMariaDB from '../../containers/contenedorMariaDB.js';
import { config } from '../../utils/config.js';

class CarritosDaoMariaDB extends ContenedorMariaDB {
    constructor() {
        super('carritos', config.mariaDB);
    }
}

export default CarritosDaoMariaDB;
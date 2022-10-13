import ContenedorMariaDB from '../../containers/contenedorMariaDB.js';
import { config } from '../../utils/config.js';

class ProductosDaoMariaDB extends ContenedorMariaDB {
    constructor() {
        super('productos', config.mariaDB);
    }
}

export default ProductosDaoMariaDB;
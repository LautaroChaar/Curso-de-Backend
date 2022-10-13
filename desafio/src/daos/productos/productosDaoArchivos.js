import ContenedorArchivos from '../../containers/contenedorArchivos.js';

class ProductosDaoArchivos extends ContenedorArchivos {
    constructor() {
        super('data/productosData.json');
    }
}

export default ProductosDaoArchivos;
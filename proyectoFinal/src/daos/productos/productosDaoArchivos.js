import ContenedorArchivos from '../../containers/contenedorArchivos.js';


class ProductosDaoArchivos extends ContenedorArchivos {
    constructor() {
        super('data/productosData.json', 'data/carritoData.json');
    }
}

export default ProductosDaoArchivos;
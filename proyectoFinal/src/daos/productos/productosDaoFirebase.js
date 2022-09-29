import ContenedorFirebase from '../../containers/contenedorFirebase.js';

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('productos', 'carritos');
    }
}

export default ProductosDaoFirebase;

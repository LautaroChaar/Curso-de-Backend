import ContenedorFirebase from '../../containers/contenedorFirebase.js';

class CarritosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('productos', 'carritos');
    }
}

export default CarritosDaoFirebase;

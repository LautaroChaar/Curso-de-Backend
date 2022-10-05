import ContenedorArchivos from '../../containers/contenedorArchivos.js';


class CarritosDaoArchivos extends ContenedorArchivos {
    constructor() {
        super('data/productosData.json', 'data/carritoData.json');
    }
}

export default CarritosDaoArchivos;


import ContenedorMongoDB from "../../containers/contenedorMongoDB.js";
import { carritosModel } from '../../models/carritos.model.js';
import { productosModel } from '../../models/productos.model.js';

class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(carritosModel, productosModel);
    }
}

export default CarritosDaoMongoDB;


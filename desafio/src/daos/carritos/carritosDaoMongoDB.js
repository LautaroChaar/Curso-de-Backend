import ContenedorMongoDB from "../../containers/contenedorMongoDB.js";
import { carritosModel } from '../../models/carritos.model.js';

class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(carritosModel);
    }
}

export default CarritosDaoMongoDB;


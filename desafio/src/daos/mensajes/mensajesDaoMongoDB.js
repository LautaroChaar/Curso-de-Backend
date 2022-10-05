import ContenedorMongoDB from "../../containers/contenedorMongoDB.js";
import { mensajesModel } from "../../models/mensajes.model.js";
import { carritosModel } from '../../models/carritos.model.js';

class MensajesDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(carritosModel, mensajesModel);
    }

}

export default MensajesDaoMongoDB;
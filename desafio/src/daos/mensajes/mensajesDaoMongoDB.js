import ContenedorMongoDB from "../../containers/contenedorMongoDB.js";
import { mensajesModel } from "../../models/mensajes.model.js";

class MensajesDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(mensajesModel);
    }

}

export default MensajesDaoMongoDB;
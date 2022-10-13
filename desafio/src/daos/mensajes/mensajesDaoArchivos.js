import ContenedorArchivos from '../../containers/contenedorArchivos.js';

class MensajesDaoArchivos extends ContenedorArchivos {
    constructor() {
        super('data/mensajesData.json');
    }
}

export default MensajesDaoArchivos;
import ContenedorFirebase from '../../containers/contenedorFirebase.js';

class MensajesDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('mensajes', 'carritos');
    }

}

export default MensajesDaoFirebase;
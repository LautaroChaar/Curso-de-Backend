import { mensajesDao as apiMensajes } from '../service/index.js';
import { normalize, schema } from 'normalizr';
import { logger } from '../utils/configLogger.js';


const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, { idAttribute: 'id' });

const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' });

const normalizarMensajes = (mensajesId) => normalize(mensajesId, schemaMensajes);


export async function listarMensajesNormalizados() {
    const mensajes = await apiMensajes.getAll();
    const normalizados = normalizarMensajes({ id: 'mensajes', mensajes });
    return normalizados;
};

export async function agregarMensaje(mensaje) {
    await apiMensajes.add(mensaje);
};


export async function getAllMessages(req, res) {
    const {url, method } = req;
    logger.info(`Ruta ${method} /api/mensajes${url}`);
    res.render('viewChat', await apiMensajes.getAll());
}; 
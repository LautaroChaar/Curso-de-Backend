import  express  from 'express';
import { mensajesDao as apiMensajes } from '../daos/index.js'
import { normalize, schema } from 'normalizr';
import util from 'util';
import * as dotenv from 'dotenv'; 
dotenv.config()

const routerMensajes = express.Router();


const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, { idAttribute: 'id' });

const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' });

const normalizarMensajes = (mensajesId) => normalize(mensajesId, schemaMensajes);


async function listarMensajesNormalizados() {
    const mensajes = await apiMensajes.getAll();
    const normalizados = normalizarMensajes({ id: 'mensajes', mensajes });
    return normalizados;
}

async function agregarmensaje(mensaje) {
    await apiMensajes.add(mensaje);
}


routerMensajes.get('/', async (req, res) => {
    res.render('viewChat', await apiMensajes.getAll())
}); 

export { routerMensajes, listarMensajesNormalizados, agregarmensaje };
import  express  from 'express';
import { auth } from '../../auth/index.js';
import { getAllMessages } from '../controllers/mensajes.controller.js';

const routerMensajes = express.Router();

routerMensajes.get('/', auth, getAllMessages); 

export { routerMensajes };
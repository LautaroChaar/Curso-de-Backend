import { Router } from 'express';
import { auth } from '../../auth/index.js';
import { logger } from '../utils/configLogger.js';

const routerHome = new Router();

routerHome.get('/', auth, (req, res) => {
    const nombre = req.user.username;
    const {url, method } = req;
    logger.info(`Ruta ${method} /home${url}`);
    res.render('viewChat', { nombre });
})


export { routerHome };
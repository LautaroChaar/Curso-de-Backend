import { Router } from 'express';
import { auth } from '../../auth/index.js';

const routerHome = new Router();

routerHome.get('/', auth, (req, res) => {
    const nombre = req.session?.nombre;
    res.render('viewChat', { nombre });
})




export { routerHome };
import { Router } from 'express';
import { auth } from '../../auth/index.js';
import { userHome } from '../controllers/home.controller.js';

const routerHome = new Router();

routerHome.get('/', auth, userHome);

export { routerHome };


import { Router } from 'express';


const routerAuth = new Router();

routerAuth.get('/', (req, res) => {
    res.redirect('/home');
})

routerAuth.get('/login', (req, res) => {
    res.render('viewLogin');
})

routerAuth.post('/login', (req, res) => {
    const usuario = req.body;
    if (usuario) {
        req.session.nombre = usuario;
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
})

routerAuth.post('/logout', (req, res) => {
    const nombre = req.session?.nombre;
    if (nombre) {
        req.session.destroy(err => {
            if (!err) {
                res.render('viewLogout', { nombre});
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})

export { routerAuth };
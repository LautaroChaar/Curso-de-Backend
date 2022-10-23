import { Router } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv'; 
dotenv.config()

import { usuariosDao as apiUsuarios } from '../daos/index.js';


async function generateHashPassword(password){
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}

async function verifyPass(usuario, password) {
    const match = await bcrypt.compare(password, usuario.password);
    console.log(`pass login: ${password} || pass hash: ${ usuario.password}`)
    return match;
}


const routerAuth = new Router();

const LocalStrategy = Strategy;

passport.use(new LocalStrategy(
    async function(username, password, done) {
        const existeUsuario = await apiUsuarios.getById(username);
        if (!existeUsuario) {
            return done(null, false);
        } else {
            const match = await verifyPass(existeUsuario, password);
            if(!match){
                return done(null, false);
            }
            return done(null, existeUsuario);
        }
    }
));

passport.serializeUser((usuario, done)=>{
    done(null, usuario.username);
});

passport.deserializeUser (async (email, done) => {
    const existeUsuario = await apiUsuarios.getById(email);
    done(null, existeUsuario);
});


routerAuth.get('/', (req, res) => {
    res.redirect('/home');
})

routerAuth.get('/login', (req, res) => {
    res.render('viewLogin');
})

routerAuth.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login-error'}))

routerAuth.get('/logout', (req, res)=> {
    req.logOut(err => {
        res.redirect('/');
    });
})

routerAuth.get('/registro', (req, res) => {
    res.render('viewRegistro');
})

routerAuth.post('/registro', async (req, res) => {
    const validationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { username, password } = req.body;
    const nuevoUsuario = await apiUsuarios.getById(username);
    if (validationRegex.test(username) && (!nuevoUsuario)) {
        const newUser = {username, password: await generateHashPassword(password)};
        await apiUsuarios.add(newUser);
        res.redirect('/login');
    } else {
        res.render('viewRegistroFallido', {username})
    }
})

routerAuth.get('/login-error', (req, res)=>{
    res.render('viewLoginFallido');
})


export { routerAuth };
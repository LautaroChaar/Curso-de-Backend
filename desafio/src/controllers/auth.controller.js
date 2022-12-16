import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { logger } from '../utils/configLogger.js';
import { usuariosDao as apiUsuarios } from '../service/index.js';
import multer from 'multer';
import { createTransport } from 'nodemailer';

const TEST_MAIL = 'baby.tillman@ethereal.email';

const transporter = createTransport({
   host: 'smtp.ethereal.email',
   port: 587,
   auth: {
       user: TEST_MAIL,
       pass: 'BfmWpGTqfPeBGrNqSY'
   }
});

async function generateHashPassword(password){
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}

async function verifyPass(usuario, password) {
    const match = await bcrypt.compare(password, usuario.password);
    console.log(`pass login: ${password} || pass hash: ${ usuario.password}`)
    return match;
}

const LocalStrategy = Strategy;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/backend/desafio/public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()} - ${file.originalname}`);
    }
  })
  
export const upload = multer({ storage: storage });

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

export const pass = passport.authenticate('local', {successRedirect: '/api/', failureRedirect: '/api/login-error'});

export function home (req, res) {
    const {url, method } = req;
    logger.info(`Ruta ${method} ${url}`);
    res.redirect('/api/home');
};

export function login (req, res) {
    const {url, method } = req;
    logger.info(`Ruta ${method} ${url}`);
    res.render('viewLogin');
};

export function viewLogout (req, res) {
    const {url, method } = req;
    const nombre = req.user.username;
    logger.info(`Ruta ${method} ${url}`);
    req.logOut(err => {
        res.render('viewLogout', { nombre });
    });
};

export function register(req, res) {
    const {url, method } = req;
    logger.info(`Ruta ${method} ${url}`);
    res.render('viewRegistro');
};

export async function registerNewUser(req, res) {
    try {
        const validationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { name, lastname, adress, dateOfBirth, phone, username, password } = req.body;
        const avatar = req.file.filename;
        const nuevoUsuario = await apiUsuarios.getById(username);
        if (validationRegex.test(username) && (!nuevoUsuario)) {
            const newUser = { name, lastname, adress, dateOfBirth, phone, avatar, username, password: await generateHashPassword(password)};
            await apiUsuarios.add(newUser);
            const mailOptions = {
                from: 'Servidor Node.js',
                to: TEST_MAIL,
                subject: 'Nuevo Registro',
                html: `<h1>${name}</h1><h5>Email: ${username}</h5><h5>Edad: ${dateOfBirth}</h5><h5>Dirección: ${adress}</h5><h5>Teléfono: ${phone}</h5>`
            }
            const info = await transporter.sendMail(mailOptions);
            logger.info(info);
            res.redirect('/api/login');
        } else {
            res.render('viewRegistroFallido', {username})
        }
    } catch (error) {
        logger.error(error);
    }
};

export function loginError(req, res) {
    const {url, method } = req;
    logger.info(`Ruta ${method} ${url}`);
    res.render('viewLoginFallido');
};







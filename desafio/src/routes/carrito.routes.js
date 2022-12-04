import  express  from 'express';
import { logger } from '../utils/configLogger.js';
import { carritosDao as apiCarrito } from '../daos/index.js';
import { productosDao as apiProductos } from '../daos/index.js';
import { auth } from '../../auth/index.js';
import twilio from 'twilio';
import { createTransport } from 'nodemailer';


const routerCarrito = express.Router();


const accountSid = 'ACfb4578ba74862de8f8f3886cffdd8c53';
const authToken = '02387549a0a141d04c6edbbfdf9eb84e';

const TEST_MAIL = 'june.gerlach@ethereal.email'

const transporter = createTransport({
   host: 'smtp.ethereal.email',
   port: 587,
   auth: {
       user: TEST_MAIL,
       pass: '1pJTZMMMusWsPfGZJF'
   }
});

routerCarrito.delete('/:id', async (req, res) => {
    const {url, method } = req;
    logger.info(`Ruta ${method} /api/carrito${url}`);
    res.json((await apiCarrito.deleteById(req.params.id)));
}); 

routerCarrito.get('/:id/productos', async (req, res) => {
    const {url, method } = req;
    logger.info(`Ruta ${method} /api/carrito${url}`);
    const carrito = await apiCarrito.getById(req.params.id);
    res.json((carrito.productos));
}); 

routerCarrito.get('/', auth, async (req, res) => {
    const {url, method } = req;
    const { id, name, adress, age, phone, username, avatar } = req.user;
    const srcImg = `/uploads/${avatar}`;
    logger.info(`Ruta ${method} /api/carrito${url}`);
    const carrito = await apiCarrito.getById(id);
    res.render('viewCarrito', { name, adress, age, phone, username, carrito, srcImg });
}); 

routerCarrito.post('/productos', auth, async (req, res) => {
    const {url, method } = req;
    logger.info(`Ruta ${method} /api/carrito${url}`);
    const id = req.user.id;
    const carrito = await apiCarrito.getById(id);
    const producto = await apiProductos.getById(req.body.idProd);
    carrito.productos.push(producto);
    const elem = {...carrito, id: Number(id)};
    await apiCarrito.update(elem)
    res.redirect('/api/home');
}); 


routerCarrito.post('/comprar/productos', auth, async (req, res) => {
   
        const {url, method } = req;
        logger.info(`Ruta ${method} /api/carrito${url}`);

        const { id, name, username, phone } = req.user;
        const carrito = await apiCarrito.getById(id);
        const lista = [];
        for (let i=0; i < carrito.productos.length; i++) {
            const element = `<li>${JSON.stringify(carrito.productos[i])}</li>`;
            lista.push(element);
        }
        const string = lista.toString();

        const mailOptions = {
            from: 'Servidor Node.js',
            to: TEST_MAIL,
            subject: `Nuevo pedido de: ${name} (${username})`,
            html: `${string}`
        }
        const info = await transporter.sendMail(mailOptions);
        logger.info(info);
        
        const client = twilio(accountSid, authToken);

        const message = await client.messages.create({
            body: `Hola ${name}, le comunicamos que su pedido ha sido recibido con exito y se encuentra en proceso!`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:+${phone}`
        })
        logger.info(message); 

        await apiCarrito.emptyCart(id)
        res.redirect('/api/home');

}); 

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const {url, method } = req;
    logger.info(`Ruta ${method} /api/carrito${url}`);
    const carrito = await apiCarrito.getById(req.params.id);
    const index = carrito.productos.findIndex( p => p.id == req.params.id_prod);
    if (index != -1 ) {
        carrito.productos.splice(index, 1);
        const elem = {...carrito, id: Number(req.params.id)};
        await apiCarrito.update(elem);
    }
    res.end();
});

export { routerCarrito };




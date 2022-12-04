import * as dotenv from 'dotenv'; 
dotenv.config()

let productosDao;
let carritosDao;
let mensajesDao;
let usuariosDao;

switch (process.env.PERS) {

    case 'mongoDB': 
        const { default: ProductosDaoMongoDB } = await import('./productos/productosDaoMongoDB.js');
        const { default: CarritosDaoMongoDB } = await import('./carritos/carritosDaoMongoDB.js');
        const { default: MensajesDaoMongoDB } = await import('./mensajes/mensajesDaoMongoDB.js');
        const { default: UsuariosDaoMongoDB } = await import('./usuarios/usuariosDaoMongoDB.js');

        productosDao = new ProductosDaoMongoDB();
        carritosDao = new CarritosDaoMongoDB();
        mensajesDao = new MensajesDaoMongoDB();
        usuariosDao = new UsuariosDaoMongoDB();
        break;

    }

export { productosDao, carritosDao, mensajesDao, usuariosDao };
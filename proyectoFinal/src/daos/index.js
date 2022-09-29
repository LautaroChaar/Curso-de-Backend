import * as dotenv from 'dotenv'; 
dotenv.config()

let productosDao;
let carritosDao;

switch (process.env.PERS) {
    case 'json':
        const { default: ProductosDaoArchivos } = await import('./productos/productosDaoArchivos.js');
        const { default: CarritosDaoArchivos } = await import('./carritos/carritosDaoArchivos.js');

        productosDao = new ProductosDaoArchivos();
        carritosDao = new CarritosDaoArchivos();
        break;

    case 'firebase':
        const { default: ProductosDaoFirebase} = await import('./productos/productosDaoFirebase.js');
        const { default: CarritosDaoFirebase } = await import('./carritos/carritosDaoFirebase.js');

        productosDao = new ProductosDaoFirebase();
        carritosDao = new CarritosDaoFirebase();
        break;

    case 'memoria':
        const { default: ProductosDaoMemoria } = await import('./productos/productosDaoMemoria.js');
        const { default: CarritosDaoMemoria } = await import('./carritos/carritosDaoMemoria.js');
        
        productosDao = new ProductosDaoMemoria();
        carritosDao = new CarritosDaoMemoria();
        break;
    
    case 'mongoDB': 
        const { default: ProductosDaoMongoDB } = await import('./productos/productosDaoMongoDB.js');
        const { default: CarritosDaoMongoDB } = await import('./carritos/carritosDaoMongoDB.js');

        productosDao = new ProductosDaoMongoDB();
        carritosDao = new CarritosDaoMongoDB();
        break;

    case 'mariaDB':
        const { default: ProductosDaoMariaDB } = await import('./productos/productosDaoMariaDB.js');
        const { default: CarritosDaoMariaDB } = await import('./carritos/carritosDaoMariaDB.js');

        productosDao = new ProductosDaoMariaDB();
        carritosDao = new CarritosDaoMariaDB();
        break;

    }

export { productosDao, carritosDao };


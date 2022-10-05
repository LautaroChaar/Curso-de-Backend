import  express  from 'express';
import { faker } from '@faker-js/faker';

const routerRandomProductos = express.Router();

let DB_RANDOMPRODUCTS = [];

function generarObjeto () {
    return {
        title: faker.commerce.product(),
        price: faker.finance.amount(),
        url: faker.image.image()
        }
}

routerRandomProductos.get('/', async (req, res) => {
    for (let i = 0; i < 5; i ++) {
        DB_RANDOMPRODUCTS.push(generarObjeto());
    }
    res.render('viewRandomProducts', {DB_RANDOMPRODUCTS});
    DB_RANDOMPRODUCTS = [];
}); 

export { routerRandomProductos };
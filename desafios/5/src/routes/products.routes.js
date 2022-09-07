const express = require('express');
const routerProducts = express.Router();

const  Controller = require('../../controllers/products.controller');

routerProducts.get('/', Controller.getAll );

routerProducts.get('/:id', Controller.getProduct );

routerProducts.post('/', Controller.addProduct );

routerProducts.put('/:id', Controller.updateProduct );

routerProducts.delete('/:id', Controller.deleteProduct );

module.exports = routerProducts;


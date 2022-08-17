const express = require('express');
const routerProducts = express.Router();

const DB_PRODUCTS = [];

routerProducts.get('/', (req, res)=>{
    res.status(200).json(DB_PRODUCTS);
});

routerProducts.get('/:id', (req, res)=>{
    try {
        const id = Number(req.params.id);

        const indexObj = DB_PRODUCTS.findIndex((item)=> item.id == id);
        console.log(indexObj)
        if (indexObj == -1) {
            res.status(404).json({code: 404, msg: `Producto ${id} no encontrado`})
        } 
        res.status(200).json(DB_PRODUCTS[indexObj]);
    } catch (error) {
        console.log(error)
        res.status(500).json({code: 500, msg: `Error al obtener ${req.method} ${req.url}`});
    }
});

routerProducts.post('/', (req, res)=>{
    
    let id;
    if (DB_PRODUCTS.length === 0) {
        id = 1
    } else {
        id = DB_PRODUCTS[DB_PRODUCTS.length - 1].id + 1
    }
    const data = {...req.body, id}
    DB_PRODUCTS.push(data);
    res.status(201).json({msg: 'Agregado!', ...req.body, id});
});

routerProducts.put('/:id', (req, res)=>{
    try {
        const id = Number(req.params.id);
        const indexItem = DB_PRODUCTS.findIndex((item)=> item.id == id);
        if (indexItem == -1) {
            res.status(404).json({code: 404, msg: `Producto ${id} no encontrado`})
        } else {
            DB_PRODUCTS[indexItem] = { ...req.body, id }
            res.status(200).json( {msg: `Producto ${id} actualizado`});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({code: 500, msg: `Error al obtener ${req.method} ${req.url}`});
    }
});

routerProducts.delete('/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const indexObj = DB_PRODUCTS.findIndex((item)=> item.id == id);
        console.log(indexObj)
        if (indexObj == -1) {
            res.status(404).json({code: 404, msg: `Producto ${id} no encontrado`})
        } else {
            DB_PRODUCTS.splice(indexObj, 1);
        }
        res.status(201).json({msg: `Producto ${id} eliminado!`});
    } catch (error) {
        console.log(error)
        res.status(500).json({code: 500, msg: `Error al obtener ${req.method} ${req.url}`});
    }
});

module.exports = routerProducts;


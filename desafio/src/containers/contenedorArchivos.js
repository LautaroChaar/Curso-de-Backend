import {promises as fs} from 'fs';
import { date } from '../../date/date.js';

class ContenedorArchivos {
    constructor(routeProducts, routeCarts) {
        this.routeProducts = routeProducts;
        this.routeCarts = routeCarts;
    }
    
    getCartProducts = async (req, res) => {
        try {
            const objs = await fs.readFile(this.routeCarts, 'utf-8');
            const objsList = JSON.parse(objs);
            const id = Number(req.params.id);
            const cart = objsList.find((item)=> item.id == id);
            if (cart === undefined) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`});
            } else {
                return cart.productos;
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al obtener los productos del carrito mediante el metodo ${req.method}`});
        }
    }
    
    newCart = async (req, res) => {
        try {
            const objs = await fs.readFile(this.routeCarts, 'utf-8');
            const objsList = JSON.parse(objs);
            let id;
            if (objsList.length === 0) {
                id = 1;
            } else {
                id = objsList[objsList.length - 1].id + 1;
            }
            const data = {...req.body, id, timestamp: date};
            objsList.push(data);
            await fs.writeFile(this.routeCarts, JSON.stringify(objsList, null, 2));
            return ({msg: 'Carrito creado con exito!', data});
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al crear un nuevo carrito mediante el metodo ${req.method}`});
        }
        
    }
    
    addCartProduct = async (req, res) => {
        try {
            const objs = await fs.readFile(this.routeCarts, 'utf-8');
            const objsList = JSON.parse(objs);
            const id = Number(req.params.id);
            const cart = objsList.find((item)=> item.id == id);
            if (cart === undefined) {
                return ({code: 404, msg: `Carrito ${objsList} no encontrado`});
            } else {
                const prods = await fs.readFile(this.routeProducts, 'utf-8');
                const prodsList = JSON.parse(prods);
                const prod = prodsList.find((item)=> item.id == Number(req.body.id));
                if (prod === undefined) {
                    return ({code: 404, msg: `Producto ${id} no encontrado`});
                } else {
                    cart.productos.push(prod);
                    await fs.writeFile(this.routeCarts, JSON.stringify(objsList, null, 2));
                    return ({msg: 'Producto agregado con exito al carrito!'});
                }
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al agregar un producto en el carrito mediante el metodo ${req.method}`});
        }
        
    }
    
    deleteCart = async (req, res) => {
        try {
            const objs = await fs.readFile(this.routeCarts, 'utf-8');
            const objsList = JSON.parse(objs);
            const id = Number(req.params.id);
            const indexObj = objsList.findIndex((item)=> item.id == id);
            if (indexObj == -1) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`});
            } else {
                objsList.splice(indexObj, 1);
                await fs.writeFile(this.routeCarts, JSON.stringify(objsList, null, 2));
                return ({msg: `Carrito ${id} eliminado con exito!`});
            }
        } catch (error) {
            console.log(error);
            return({code: 500, msg: `Error al eliminar el carrito mediante el metodo ${req.method}`});
        }
    }
    
    deleteCartProduct = async (req, res) => {
        try {
            const objs = await fs.readFile(this.routeCarts, 'utf-8');
            const objsList = JSON.parse(objs);
            const id = Number(req.params.id);
            const cart = objsList.find((item)=> item.id == id);
            if (cart === undefined) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`});
            } else { 
                const id_prod = Number(req.params.id_prod);
                const productoIndex = cart.productos.findIndex((item=> item.id == id_prod));
                if (productoIndex === -1) {
                    return ({code: 404, msg: `Producto ${id_prod} no encontrado`});
                } else {
                    cart.productos.splice(productoIndex, 1);
                    await fs.writeFile(this.routeCarts, JSON.stringify(objsList, null, 2));
                    return ({msg: `Producto ${id_prod} eliminado con exito del carrito ${id}!`});
                }
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al eliminar el producto del carrito mediante el metodo ${req.method}`});
        }
    }

    getProducts = async (req, res) => {
        try {
            const objs = await fs.readFile(this.routeProducts, 'utf-8');
            if (req.params.id) {
                const id = Number(req.params.id);
                const objsList = JSON.parse(objs);
                const product = objsList.find((item)=> item.id == id);
                if (product === undefined) {
                    return ({code: 404, msg: `Producto ${id} no encontrado`});
                } else {
                    return [product];
                }
            } else {
                return JSON.parse(objs);
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al obtener metodo ${req.method} en la ruta ${req.url}`});
        }
    }

    addProduct = async (req, res) => {
        try {
            const objs = await fs.readFile(this.routeProducts, 'utf-8');
            const objsList = JSON.parse(objs);
            let id;
            if (objsList.length === 0) {
                id = 1;
            } else {
                id = objsList[objsList.length - 1].id + 1;
            }
            const data = {...req.body, id, timestamp: date}
            objsList.push(data);
            await fs.writeFile(this.routeProducts, JSON.stringify(objsList, null, 2));
            return ({msg: 'Producto agregado con exito!', data});
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `No se pudo agregar el producto mediante el metodo ${req.method}`});
        }
        
    }
    
    updateProduct = async (req, res)=>{
        try {
            const objs = await fs.readFile(this.routeProducts, 'utf-8');
            const objsList = JSON.parse(objs);
            const id = Number(req.params.id);
            const indexItem = objsList.findIndex((item)=> item.id == id);
            if (indexItem == -1) {
                return ({code: 404, msg: `Producto ${id} no encontrado`});
            } else {
                objsList[indexItem] = {...objsList[indexItem], ...req.body, timestamp: date};
                await fs.writeFile(this.routeProducts, JSON.stringify(objsList, null, 2));
                return ({msg: `Producto ${id} actualizado`});
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al actualizar el producto mediante el metodo ${req.method}`});
        }
    }
    
    deleteProduct = async (req, res) => {
        try {
            const objs = await fs.readFile(this.routeProducts, 'utf-8');
            const objsList = JSON.parse(objs);
            const id = Number(req.params.id);
            const indexObj = objsList.findIndex((item)=> item.id == id);
            if (indexObj == -1) {
                return ({code: 404, msg: `Producto ${id} no encontrado`});
            } else {
                objsList.splice(indexObj, 1);
                await fs.writeFile(this.routeProducts, JSON.stringify(objsList, null, 2));
                return ({msg: `Producto ${id} eliminado con exito!`});
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al eliminar el producto mediante el metodo ${req.method}`});
        }
    }

}

export default ContenedorArchivos;
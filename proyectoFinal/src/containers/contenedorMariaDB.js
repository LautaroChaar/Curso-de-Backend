
import {config} from '../utils/config.js';
import knex from 'knex';

export class Contenedor {
    constructor(tableName, config){
        this.knexCli = knex(config.db);
        this.tableName = tableName;
    }

    async getAll(){
        try {
            return await this.knexCli.from(this.tableName).select('*').orderBy('id', 'asc');
        } catch (error) {
            throw error;
        }
    }

    async getById(id){
        try {
            return await this.knexCli.from(this.tableName).select('*').where({id: id});
        } catch (error) {
            throw error;
        }
    }

    async add(obj){
        try {
            return await this.knexCli(this.tableName).insert(obj);
        } catch (error) {
            throw error;
        }
    }

    async update(id, obj){
        try {
            return await this.knexCli.from(this.tableName).where({id: id}).update(obj);
        } catch (error) {
            throw error;
        }
    }

    async delete(id){
        try {
            return await this.knexCli.from(this.tableName).where({id: id}).del();
        } catch (error) {
            throw error;
        }
    }

}

class ContenedorMongoDB {
    constructor(carritoModel, productosModel) {
        this.carritoModel = carritoModel;
        this.productosModel = productosModel;
    }

    getCartProducts = async (req, res) => {
        try {
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn); 
            const id = Number(req.params.id);
            if (await this.carritoModel.find({id: id}) == false) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`});
            } else {
                return await this.carritoModel.distinct("productos", {"id" : id});
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al obtener los productos del carrito mediante el metodo ${req.method}`});
        } finally {
            await mongoose.disconnect();
        }
    }
    
    newCart = async (req, res) => {
        try {
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn); 
            const objs = await this.carritoModel.find();
            let id;
            if (objs.length === 0) {
                id = 1;
            } else {
                id = objs[objs.length - 1].id + 1;
            }
            const date = new Date().toLocaleString();
            const obj =  { ...req.body, id, timestamp: date };
            await this.carritoModel.create(obj);
            return ({msg: 'Carrito creado con exito!'});
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al crear un nuevo carrito mediante el metodo ${req.method}`});
        } finally {
            await mongoose.disconnect();
        }
    }
    
    addCartProduct = async (req, res) => {
        try {
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn); 
            const id = Number(req.params.id);
            if (await this.carritoModel.find({id: id}) == false) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`});
            } else {
                if (await this.productosModel.find({id: req.body.id}) == false) {
                    return ({code: 404, msg: `Producto no encontrado`});
                } else {
                    let res = await this.productosModel.find({id: req.body.id});
                    await this.carritoModel.updateOne({id: id}, {$addToSet: {productos: res[0]}});
                    return ({msg: `Producto agregado con exito al carrito!`});
                }
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al agregar un producto en el carrito mediante el metodo ${req.method}`});
        } finally {
            await mongoose.disconnect();
        }
    }
    
    deleteCart = async (req, res) => {
        try {
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn);
            const id = Number(req.params.id);
            if (await this.carritoModel.find({id: id}) == false) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`});
            } else {
                await this.carritoModel.deleteOne({id: id});
                return ({msg: `Carrito ${id} eliminado con exito!`});
            }
        } catch (error) {
            console.log(error);
            return({code: 500, msg: `Error al eliminar el carrito mediante el metodo ${req.method}`});
        } finally {
            await mongoose.disconnect();
        }
    }
    
    deleteCartProduct = async (req, res) => {
        try {
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn);
            const id = Number(req.params.id);
            const id_prod = Number(req.params.id_prod);
            if (await this.carritoModel.find({id: id}) == false) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`});
            } else {
                if (await this.productosModel.find({id: id_prod}) == false) {
                    return ({code: 404, msg: `Producto no encontrado`});
                } else {
                    let res = await this.productosModel.find({id: id_prod});
                    await this.carritoModel.updateOne({id: id}, {$pullAll: {productos: res}});
                    return ({msg: `Producto eliminado con exito del carrito!`});
                }
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al eliminar el producto del carrito mediante el metodo ${req.method}`});
        } finally {
            await mongoose.disconnect();
        }
    }

    getProducts = async (req, res) => {
        try {
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn);
            if (req.params.id) {
                const id = Number(req.params.id);
                if (await this.productosModel.find({id: id}) == false) {
                    return ({code: 404, msg: `Producto ${id} no encontrado`});
                } else {
                    return await this.productosModel.find({id: id});
                }
            } else {
                return await this.productosModel.find();
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al obtener metodo ${req.method} en la ruta ${req.url}`});
        } finally {
            await mongoose.disconnect();
        }
    }

    addProduct = async (req, res) => {
        try {
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn); 
            const objs = await this.productosModel.find();
            let id;
            if (objs.length === 0) {
                id = 1;
            } else {
                id = objs[objs.length - 1].id + 1;
            }
            const date = new Date().toLocaleString();
            const obj =  { ...req.body, id, timestamp: date };
            await this.productosModel.create(obj);
            return ({msg: 'Producto agregado con exito!'});
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `No se pudo agregar el producto mediante el metodo ${req.method}`});
        } finally {
            await mongoose.disconnect();
        }
    }
    
    updateProduct = async (req, res)=>{
        try {
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn);
            const id = Number(req.params.id);
            if (await this.productosModel.find({id: id}) == false) {
                return ({code: 404, msg: `Producto ${id} no encontrado`});
            } else {
                await this.productosModel.updateOne({id: id}, {$set: req.body})
                return ({msg: `Producto ${id} actualizado`});
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al actualizar el producto mediante el metodo ${req.method}`});
        } finally {
            await mongoose.disconnect();
        }
    }
    
    deleteProduct = async (req, res) => {
        try {
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn);
            const id = Number(req.params.id);
            if (await this.productosModel.find({id: id}) == false) {
                return ({code: 404, msg: `Producto ${id} no encontrado`});
            } else {
                await this.productosModel.deleteOne({id: id});
                return ({msg: `Producto ${id} eliminado con exito!`});
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al eliminar el producto mediante el metodo ${req.method}`});
        } finally {
            await mongoose.disconnect();
        }
    }

}

export default ContenedorMongoDB;
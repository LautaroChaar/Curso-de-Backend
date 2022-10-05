import mongoose from 'mongoose';
import {config} from '../utils/config.js';


class ContenedorMongoDB {
    constructor(primerModel, segundoModel) {
        this.primerModel = primerModel;
        this.segundoModel = segundoModel;
    }

    getCartProducts = async (req, res) => {
        try {
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn); 
            const id = Number(req.params.id);
            if (await this.primerModel.find({id: id}) == false) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`});
            } else {
                return await this.primerModel.distinct("productos", {"id" : id});
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
            const objs = await this.primerModel.find();
            let id;
            if (objs.length === 0) {
                id = 1;
            } else {
                id = objs[objs.length - 1].id + 1;
            }
            const date = new Date().toLocaleString();
            const obj =  { ...req.body, id, timestamp: date };
            await this.primerModel.create(obj);
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
            if (await this.primerModel.find({id: id}) == false) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`});
            } else {
                if (await this.segundoModel.find({id: req.body.id}) == false) {
                    return ({code: 404, msg: `Producto no encontrado`});
                } else {
                    let res = await this.segundoModel.find({id: req.body.id});
                    await this.primerModel.updateOne({id: id}, {$addToSet: {productos: res[0]}});
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
            if (await this.primerModel.find({id: id}) == false) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`});
            } else {
                await this.primerModel.deleteOne({id: id});
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
            if (await this.primerModel.find({id: id}) == false) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`});
            } else {
                if (await this.segundoModel.find({id: id_prod}) == false) {
                    return ({code: 404, msg: `Producto no encontrado`});
                } else {
                    let res = await this.segundoModel.find({id: id_prod});
                    await this.primerModel.updateOne({id: id}, {$pullAll: {productos: res}});
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

    getMessages = async () => {
        try {
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn);
            const obj = await this.segundoModel.find({});
            return obj
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al obtener metodo ${req.method} en la ruta ${req.url}`});
        } finally {
            await mongoose.disconnect();
        }
    }

    addMessage = async (mensaje) => {
        try {
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn); 
            const objs = await this.segundoModel.find();
            let id;
            if (objs.length === 0) {
                id = 1;
            } else {
                id = objs[objs.length - 1].id + 1;
            }
            const nuevoMensaje =  { ...mensaje, id };
            console.log(nuevoMensaje)
            await this.segundoModel.create(nuevoMensaje);
            return ({msg: 'Mensaje agregado con exito!'});
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `No se pudo agregar el mensaje mediante el metodo ${req.method}`});
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
                if (await this.segundoModel.find({id: id}) == false) {
                    return ({code: 404, msg: `Producto ${id} no encontrado`});
                } else {
                    return await this.segundoModel.find({id: id});
                }
            } else {
                return await this.segundoModel.find();
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
            const objs = await this.segundoModel.find();
            let id;
            if (objs.length === 0) {
                id = 1;
            } else {
                id = objs[objs.length - 1].id + 1;
            }
            const date = new Date().toLocaleString();
            const obj =  { ...req.body, id, timestamp: date };
            await this.segundoModel.create(obj);
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
            if (await this.segundoModel.find({id: id}) == false) {
                return ({code: 404, msg: `Producto ${id} no encontrado`});
            } else {
                await this.segundoModel.updateOne({id: id}, {$set: req.body})
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
            if (await this.segundoModel.find({id: id}) == false) {
                return ({code: 404, msg: `Producto ${id} no encontrado`});
            } else {
                await this.segundoModel.deleteOne({id: id});
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
import CustomError from '../../classes/CustomError.class.js';
import MongoDBClient from '../../classes/MongoDBClient.class.js';
import { logger } from '../../utils/configLogger.js';


class ContenedorMongoDB {
    constructor(model) {
        this.model = model;
        this.conn = MongoDBClient.getInstance();
    }


    getAll = async () => {
        try {
            await this.conn.connect();
            return await this.model.find();
        } catch (error) {
            logger.error(error);
            throw new CustomError(500, 'Get all', 'Error al completar la solicitud.');
        } finally {
            await this.conn.disconnect();
        }
    }

    getById = async (id) => {
        try {
            await this.conn.connect();
            if (await this.model.find({id: id}) == false) {
                throw new CustomError(404, 'Get by id', 'Elemento no encontrado.');
            } else {
                let res = await this.model.find({id: id});
                return res[0];
            }
        } catch (error) {
            logger.error(error);
            throw new CustomError(500, 'Get by id', 'Error al completar la solicitud.');
        } finally {
            await this.conn.disconnect();
        }
    }

    add = async (elem) => {
        try {
            const timestamp = new Date().toLocaleString();
            await this.conn.connect(); 
            const objs = await this.model.find();
            let id;
            if (objs.length === 0) {
                id = 1;
            } else {
                id = objs[objs.length - 1].id + 1;
            }
            const obj =  { ...elem, timestamp, id };
            await this.model.create(obj);
            return ({msg: `Agregado!`});
        } catch (error) {
            logger.error(error);
            throw new CustomError(500, 'Add', 'Error al agregar elemento.');
        }  finally {
            await this.conn.disconnect();
        }
    }

    update = async (elem) => {
        try {
            await this.conn.connect();
            const id = Number(elem.id);
            if (await this.model.find({id: id}) == false) {
                throw new CustomError(404, 'Update', 'Elemento no encontrado.');
            } else {
                await this.model.updateOne({id: id}, {$set: elem})
                return ({msg: `Actualizado`});
            }
        } catch (error) {
            logger.error(error);
            throw new CustomError(500, 'Update', 'Error al actualizar elemento.');
        } finally {
            await this.conn.disconnect();
        }
    }

    emptyCart = async (id) => {
        try {
            await this.conn.connect();
            if (await this.model.find({id: id}) == false) {
                throw new CustomError(404, 'EmptyCart', 'Carrito no encontrado.');
            } else {
                await this.model.updateOne({id: id}, {$set: {productos: []}})
                return ({msg: `Actualizado`});
            }
        } catch (error) {
            logger.error(error);
            throw new CustomError(500, 'EmptyCart', 'Error al vaciar el carrito.');
        } finally {
            await this.conn.disconnect();
        }
    }

    deleteById = async (id) => {
        try {
            await this.conn.connect();
            if (await this.model.find({id: id}) == false) {
                throw new CustomError(404, 'DeleteById', 'Elemento no encontrado.');
            } else {
                await this.model.deleteOne({id: id});
                return ({msg: `Eliminado con exito!`});
            }
        } catch (error) {
            logger.error(error);
            throw new CustomError(500, 'DeleteById', 'Error al eliminar el elemento.');
        } finally {
            await this.conn.disconnect();
        }
    }

}

export default ContenedorMongoDB;
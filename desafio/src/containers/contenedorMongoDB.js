import mongoose from 'mongoose';
import {config} from '../utils/config.js';
import { logger } from '../utils/configLogger.js';


class ContenedorMongoDB {
    constructor(model) {
        this.model = model;
    }


    getAll = async () => {
        try {
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn);
            return await this.model.find();
        } catch (error) {
            logger.error(error);
            return ({code: 500, msg: `Error al completar la solicitud`});
        } finally {
            await mongoose.disconnect();
        }
    }

    getById = async (id) => {
        try {
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn);
            if (await this.model.find({id: id}) == false) {
                return ({code: 404, msg: `No encontrado`});
            } else {
                let res = await this.model.find({id: id});
                return res[0];
            }
        } catch (error) {
            logger.error(error);
            return ({code: 500, msg: `Error al completar la solicitud`});
        } finally {
            await mongoose.disconnect();
        }
    }

    add = async (elem) => {
        try {
            const timestamp = new Date().toLocaleString();
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn); 
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
            return ({code: 500, msg: `Error al agregar`});
        }  finally {
            await mongoose.disconnect();
        }
    }

    update = async (elem) => {
        try {
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn);
            const id = Number(elem.id);
            if (await this.model.find({id: id}) == false) {
                return ({code: 404, msg: `No encontrado`});
            } else {
                await this.model.updateOne({id: id}, {$set: elem})
                return ({msg: `Actualizado`});
            }
        } catch (error) {
            logger.error(error);
            return ({code: 500, msg: `Error al actualizar`});
        } finally {
            await mongoose.disconnect();
        }
    }

    emptyCart = async (id) => {
        try {
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn);
            if (await this.model.find({id: id}) == false) {
                return ({code: 404, msg: `No encontrado`});
            } else {
                await this.model.updateOne({id: id}, {$set: {productos: []}})
                return ({msg: `Actualizado`});
            }
        } catch (error) {
            logger.error(error);
            return ({code: 500, msg: `Error al actualizar`});
        } finally {
            await mongoose.disconnect();
        }
    }

    deleteById = async (id) => {
        try {
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn);
            if (await this.model.find({id: id}) == false) {
                return ({code: 404, msg: `No encontrado`});
            } else {
                await this.model.deleteOne({id: id});
                return ({msg: `Eliminado con exito!`});
            }
        } catch (error) {
            logger.error(error);
            return ({code: 500, msg: `Error al eliminar`});
        } finally {
            await mongoose.disconnect();
        }
    }

}

export default ContenedorMongoDB;
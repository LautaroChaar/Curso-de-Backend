import knex from 'knex';
import { logger } from '../utils/configLogger.js';

export class ContenedorMariaDB {
    constructor(dataBase, config){
        this.knexCli = knex(config);
        this.dataBase = dataBase;
    }

    getAll = async () => {
        try {
            return await this.knexCli.from(this.dataBase).select('*').orderBy('id', 'asc');
        } catch (error) {
            logger.error(error);
            return ({code: 500, msg: `Error al completar la solicitud`});
        }
    }

    getById = async (id) => {
        try {
            if (await this.knexCli.from(this.dataBase).select('*').where({id: id}) == false) {
                return ({code: 404, msg: `No encontrado`});
            } else {
                let res = await this.knexCli.from(this.dataBase).select('*').where({id: id});
                return res[0];
            }
        } catch (error) {
            logger.error(error);
            return ({code: 500, msg: `Error al completar la solicitud`});
        }
    }

    add = async (elem) => {
        try {
            const objs = await this.knexCli.from(this.dataBase).select('*');
            let id;
            if (objs.length === 0) {
                id = 1;
            } else {
                id = objs[objs.length - 1].id + 1;
            }
            const obj =  { ...elem, id };
            await this.knexCli(this.dataBase).insert(obj);
            return ({msg: `Agregado!`});
        } catch (error) {
            logger.error(error);
            return ({code: 500, msg: `Error al agregar`});
        }
    }

    update = async (elem) => {
        try {
            const id = Number(elem.id);
            if (await this.knexCli.from(this.dataBase).select('*').where({id: id}) == false) {
                return ({code: 404, msg: `No encontrado`});
            } else {
                await this.knexCli.from(this.dataBase).where({id: id}).update(elem);
                return ({msg: `Actualizado`});
            }
        } catch (error) {
            logger.error(error);
            return ({code: 500, msg: `Error al actualizar`});
        }
    }

    deleteById = async (id) => {
        try {
            if (await this.knexCli.from(this.dataBase).select('*').where({id: id}) == false) {
                return ({code: 404, msg: `No encontrado`});
            } else {
                await this.knexCli.from(this.dataBase).where({id: id}).del();
                return ({msg: `Eliminado con exito!`});
            }
        } catch (error) {
            logger.error(error);
            return ({code: 500, msg: `Error al eliminar`});
        }
    }
 
}

export default ContenedorMariaDB;
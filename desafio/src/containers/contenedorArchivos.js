import {promises as fs} from 'fs';
import { logger } from '../utils/configLogger.js';


class ContenedorArchivos {

    constructor(ruta) {
        this.ruta = ruta;
    }
    
    getAll = async () => {
        try {
            const elems = await fs.readFile(this.ruta, 'utf-8');
            logger.info(JSON.parse(elems))
            return JSON.parse(elems);
        } catch (error) {
            logger.error(error);
            return ({code: 500, msg: `Error al completar la solicitud`});
        }
    }

    getById = async (id) => {
        const elems = await this.getAll();
        const elemId = elems.find(e => e.id == id);
        return elemId;
    }
    
    add = async (elem) => {
        try {
            const timestamp = new Date().toLocaleString();
            const elems = await this.getAll();
            let newId;
            if (elems.length == 0) {
                newId = 1;
            } else {
                newId = elems[elems.length - 1].id + 1;
            }
            logger.info(elem)
            const newElem = { ...elem, id: newId, timestamp };
            elems.push(newElem);
            await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2));
            return ({msg: `Agregado!`});
        } catch (error) {
            logger.error(error);
            return ({code: 500, msg: `Error al agregar`});
        }
    }

    update = async (elem) => {
        try {
            const elems = await this.getAll();
            const index = elems.findIndex(e => e.id == elem.id);
            if (index == -1) {
                return ({code: 404, msg: `No encontrado`});
            } else {
                elems[index] = { ...elems[index],...elem};
                await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2));
                return ({msg: `Actualizado`});
            } 
        } catch (error) {
            logger.error(error);;
            return ({code: 500, msg: `Error al actualizar`});
        }
    }

    deleteById = async (id) => {
        try {
            const elems = await this.getAll();
            const index = elems.findIndex(e => e.id == id);
            if (index == -1) {
                return ({code: 500, msg: `No se encontro el id ${id}`});
            }
            elems.splice(index, 1);
            await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2));
        } catch (error) {
            logger.error(error);
            return ({code: 500, msg: `Error al eliminar`});
        }
    }

    deleteAll = async () => {
        try {
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2));
        } catch (error) {
            logger.error(error);
            return ({code: 500, msg: `Error al eliminar`});
        }
    }

}

export default ContenedorArchivos;
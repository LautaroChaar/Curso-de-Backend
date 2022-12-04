import ContenedorMongoDB from "../../containers/contenedorMongoDB.js";
import { logger } from "../../utils/configLogger.js";
import { config } from "../../utils/config.js";
import mongoose from 'mongoose';
import { carritosModel } from '../../models/carritos.model.js';

class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(carritosModel);
    }

    add = async (id) => {
        try {
            const productos = [];
            const timestamp = new Date().toLocaleString();
            const strConn = config.atlas.strConn;
            await mongoose.connect(strConn); 
            if (await this.model.find({id: id}) == false) {
                const obj =  {  id: id, productos, timestamp };
                await this.model.create(obj);
                return ({msg: `Agregado!`});
            } 
            return
        } catch (error) {
            logger.error(error);
            return ({code: 500, msg: `Error al agregar`});
        } 
    }
    
}

export default CarritosDaoMongoDB;
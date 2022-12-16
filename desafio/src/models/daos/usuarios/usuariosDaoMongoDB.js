import mongoose from 'mongoose';
import {config} from '../../../utils/config.js';
import ContenedorMongoDB from "../../containers/contenedorMongoDB.js";
import { usuariosModel } from "../../../models/usuariosModel.js";


class UsuariosDaoMongoDB extends ContenedorMongoDB {
   constructor() {
      super(usuariosModel);
   }

getById = async (username) => {
    try {
        const strConn = config.atlas.strConn;
        await mongoose.connect(strConn);
        if (await this.model.find({username: username}) == false) {
            return false;
        } else {
            let res = await this.model.find({username: username});
            return res[0];
        }
    } catch (error) {
        console.log(error);
        return ({code: 500, msg: `Error al completar la solicitud`});
    } 
}

add = async (elem) => {
    try {
        const strConn = config.atlas.strConn;
        await mongoose.connect(strConn); 
        const objs = await this.model.find();
        let id;
        if (objs.length === 0) {
            id = 1;
        } else {
            id = objs[objs.length - 1].id + 1;
        }
        const obj =  { ...elem, id };
        await this.model.create(obj);
        return ({msg: `Agregado!`});
    } catch (error) {
        return ({code: 500, msg: `Error al agregar`});
    } 
}

}

export default UsuariosDaoMongoDB;
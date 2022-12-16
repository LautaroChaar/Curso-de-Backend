import CustomError from "./CustomError.class.js";
import DBClient from "./DBClient.class.js";
import {config} from "../utils/config.js";
import { logger } from "../utils/configLogger.js";
import mongoose from "mongoose";

let instance = null;

class MongoDBClient extends DBClient {
    constructor(){
        super();
        this.connected = false;
        this.client = mongoose;
    }

    async connect(){
        try {
            await this.client.connect(config.atlas.strConn);
            this.connected = true
            logger.info('Base de datos conectada');
        } catch (error) {
            throw new CustomError(500, "Error al conectarse a mongodb", error);
        }
    }

    async disconnect(){
        try {
            await this.client.connection.close();
            this.connected = false;
            logger.info('Base de datos desconectada');
        } catch (error) {
            throw new CustomError(500, "Error al desconectarse a mongodb", error);
        }
    }

    static getInstance() {
        if (!instance) {
            instance = new MongoDBClient()
        }
        return instance;
    }

}

export default MongoDBClient;

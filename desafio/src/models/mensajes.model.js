import { Schema, model } from "mongoose";

const mensajeSchema = new Schema({
    author: {type: Object, required: true},
    timestamp: {type: String, required: true},
    text: {type: String, required: true},
    id: {type: Number, required: true}
})

export const mensajesModel = model('mensajes', mensajeSchema);
import { Schema, model } from "mongoose";

const usuarioSchema = new Schema({
    id: {type: Number, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}
})

export const usuariosModel = model('usuarios', usuarioSchema);
import { Schema, model } from "mongoose";

const usuarioSchema = new Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    adress: {type: String, required: true},
    age: {type: Number, required: true},
    phone: {type: Number, required: true},
    avatar: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}
})

export const usuariosModel = model('usuarios', usuarioSchema);
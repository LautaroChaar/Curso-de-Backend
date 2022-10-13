import { Schema, model } from "mongoose";

const carritoSchema = new Schema({
    id: {type: Number, required: true},
    timestamp: {type: String, required: true},
    productos: {type: Array, required: true},
})

export const carritosModel = model('carritos', carritoSchema);

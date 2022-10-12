import admin from 'firebase-admin';
import {config} from '../utils/config.js';


admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore();

class ContenedorFirebase {
    constructor(coleccion) {
        this.coleccion = db.collection(coleccion);
    }

    getAll = async () => {
        try {
            let querySnapshot = await this.coleccion.get();
            let docs = querySnapshot.docs;
            const response = docs.map((doc) => ({
                id: doc.id,
                descripcion: doc.data().descripcion,
                codigo: doc.data().codigo,
                foto: doc.data().foto,
                nombre: doc.data().nombre,
                precio: doc.data().precio,
                stock: doc.data().stock,
                timestamp: doc.data().timestamp
            }))
            return response;
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al completar la solicitud`});
        }
    }

    getById = async (id) => {
        try {
            const doc = this.coleccion.doc(`${id}`);
            const item = await doc.get();
            return item.data();
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al completar la solicitud`});
        }
    }

    add = async (elem) => {
        try {
            const timestamp = new Date().toLocaleString();
            let querySnapshot = await this.coleccion.get();
            let docs = querySnapshot.docs;
            let id;
            if (querySnapshot.size === 0) {
                id = 1;
            } 
            else {
                id = Number(docs[docs.length - 1].id) + 1;
            }
            let doc = this.coleccion.doc(`${id}`);
            const obj = { ...elem, timestamp, id };
            await doc.create(obj);
            return ({msg: `Agregado!`});
        } catch (error) {
            return ({code: 500, msg: `Error al agregar`});
        }
    }

    update = async (elem) => {
        try {
            let doc = this.coleccion.doc(`${elem.id}`);
            let item = await doc.get();
            if (!item.exists) {
                return ({code: 404, msg: `Producto no encontrado`});
            } else {
                delete elem.id;
                await doc.update(elem);
                return ({msg: `Producto actualizado`});
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al actualizar`});
        }
    }

    deleteById = async (id) => {
        try {
            let doc = this.coleccion.doc(`${id}`);
            let item = await doc.get();
            if (!item.exists) {
                return ({code: 404, msg: `Producto ${id} no encontrado`});
            } else {
                await doc.delete();
                return ({msg: `Producto ${id} eliminado con exito!`});
            }
        } catch (error) {
            return ({code: 500, msg: `Error al eliminar`});
        }
    }
    

}

export default ContenedorFirebase;
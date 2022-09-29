import admin from 'firebase-admin';
import {config} from '../utils/config.js';


admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore();

class ContenedorFirebase {
    constructor(productosColeccion, carritosColeccion) {
        this.productosColeccion = db.collection(productosColeccion);
        this.carritosColeccion = db.collection(carritosColeccion);
    }

    getCartProducts = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const doc = this.carritosColeccion.doc(`${id}`);
            const item = await doc.get();
            if (!item.exists) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`});
            } else {
                return item.data().productos;
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al obtener los productos del carrito mediante el metodo ${req.method}`});
        }
    }
    
    newCart = async (req, res) => {
        try {
            let querySnapshot = await this.carritosColeccion.get();
            let docs = querySnapshot.docs;
            let id;
            if (querySnapshot.size === 0) {
                id = 1;
            } 
            else {
                id = Number(docs[docs.length - 1].id) + 1;
            }
            let doc = this.carritosColeccion.doc(`${id}`);
            const date = new Date().toLocaleString();
            const obj = { ...req.body, timestamp: date };
            await doc.create(obj);
            return ({msg: 'Carrito creado con exito!'});
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al crear un nuevo carrito mediante el metodo ${req.method}`});
        }
    }
    
    addCartProduct = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const doc = this.carritosColeccion.doc(`${id}`);
            const item = await doc.get();
            if (!item.exists) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`});
            } else {
                const doc2 = this.productosColeccion.doc(`${req.body.id}`);
                const item2 = await doc2.get();
                if (!item2.exists) {
                    return ({code: 404, msg: `Producto no encontrado`});
                } else {
                    let array = item.data().productos;
                    let doc2Id = Number(doc2.id);
                    let newObj = {...item2.data(), id: doc2Id}
                    array.push(newObj);
                    await doc.update({productos: array});
                    return ({msg: `Producto agregado con exito al carrito!`});
                }
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al agregar un producto en el carrito mediante el metodo ${req.method}`});
        }
    }
    
    deleteCart = async (req, res) => {
        try {
            const id = Number(req.params.id);
            let doc = this.carritosColeccion.doc(`${id}`);
            let item = await doc.get();
            if (!item.exists) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`});
            } else {
                await doc.delete();
                return ({msg: `Carrito ${id} eliminado con exito!`});
            }
        } catch (error) {
            console.log(error);
            return({code: 500, msg: `Error al eliminar el carrito mediante el metodo ${req.method}`});
        } 
    }
    
    deleteCartProduct = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const id_prod = Number(req.params.id_prod);
            const doc = this.carritosColeccion.doc(`${id}`);
            const item = await doc.get();
            if (!item.exists) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`});
            } else {
                const array = item.data().productos;
                const array2 = array.filter((item) => item.id != id_prod);
                await doc.update({productos: array2});
                return ({msg: `Producto eliminado con exito del carrito!`});              
            }    
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al eliminar el producto del carrito mediante el metodo ${req.method}`});
        } 
    }

    getProducts = async (req, res) => {
        try {
            let querySnapshot = await this.productosColeccion.get();
            let docs = querySnapshot.docs;
            if (req.params.id) {
                const id = Number(req.params.id);
                const doc = this.productosColeccion.doc(`${id}`);
                const item = await doc.get();
                if (!item.exists) {
                    return ({code: 404, msg: `Producto ${id} no encontrado`});
                } else {
                    return item.data();
                }
            } else { 
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
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al obtener metodo ${req.method} en la ruta ${req.url}`});
        } 
    }

    addProduct = async (req, res) => {
        try {
            let querySnapshot = await this.productosColeccion.get();
            let docs = querySnapshot.docs;
            let id;
            if (querySnapshot.size === 0) {
                id = 1;
            } 
            else {
                id = Number(docs[docs.length - 1].id) + 1;
            }
            let doc = this.productosColeccion.doc(`${id}`);
            const date = new Date().toLocaleString();
            const obj = { ...req.body, timestamp: date };
            await doc.create(obj);
            return ({msg: 'Producto agregado con exito!'});
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `No se pudo agregar el producto mediante el metodo ${req.method}`});
        }
    }
    
    updateProduct = async (req, res)=>{
        try {
            const id = Number(req.params.id);
            let doc = this.productosColeccion.doc(`${id}`);
            let item = await doc.get();
            if (!item.exists) {
                return ({code: 404, msg: `Producto ${id} no encontrado`});
            } else {
                await doc.update(req.body);
                return ({msg: `Producto ${id} actualizado`});
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al actualizar el producto mediante el metodo ${req.method}`});
        }
    }
    
    deleteProduct = async (req, res) => {
        try {
            const id = Number(req.params.id);
            let doc = this.productosColeccion.doc(`${id}`);
            let item = await doc.get();
            if (!item.exists) {
                return ({code: 404, msg: `Producto ${id} no encontrado`});
            } else {
                await doc.delete();
                return ({msg: `Producto ${id} eliminado con exito!`});
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al eliminar el producto mediante el metodo ${req.method}`});
        } 
    }
}

export default ContenedorFirebase;
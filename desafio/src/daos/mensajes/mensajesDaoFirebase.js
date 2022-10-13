import ContenedorFirebase from '../../containers/contenedorFirebase.js';

class MensajesDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('mensajes');
    }

    getAll = async () => {
        try {
            let querySnapshot = await this.coleccion.get();
            let docs = querySnapshot.docs;
            const response = docs.map((doc) => ({
                author: {
                    email: doc.data().author.email,
                    nombre: doc.data().author.nombre,
                    apellido: doc.data().author.apellido,
                    edad: doc.data().author.edad,
                    alias: doc.data().author.alias,
                    avatar: doc.data().author.avatar
                },
                timestamp: doc.data().timestamp,
                text: doc.data().text,
                id: doc.id
            }));
            console.log(response)
            return response;
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al completar la solicitud`});
        }
    }
}

export default MensajesDaoFirebase;
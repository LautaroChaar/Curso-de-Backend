class ContenedorMemoria {
    constructor(dataBase) {
        this.dataBase = dataBase;
    }

    getAll = async () => {
        try {
            return (this.dataBase);
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al completar la solicitud`});
        }
    }

    getById = async (id) => {
        const elems = await this.getAll();
        const elemId = elems.find(e => e.id == id);
        return elemId;
    }
    
    add = async (elem) => {
        try {
            const timestamp = new Date().toLocaleString();
            const elems = await this.getAll();
            let newId;
            if (elems.length == 0) {
                newId = 1;
            } else {
                newId = elems[elems.length - 1].id + 1;
            }
            const newElem = { ...elem, id: newId, timestamp };
            elems.push(newElem);
            return ({msg: `Agregado!`});
        } catch (error) {
            return ({code: 500, msg: `Error al agregar`});
        }
    }

    update = async (elem) => {
        try {
            const elems = await this.getAll();
            const index = elems.findIndex(e => e.id == elem.id);
            if (index == -1) {
                return ({code: 404, msg: `No encontrado`});
            } else {
                elems[index] = { ...elems[index], ...elem}
                return ({msg: `Actualizado`});
            } 
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al actualizar`});
        }
    }

    deleteById = async (id) => {
        try {
            const elems = await this.getAll();
            const index = elems.findIndex(e => e.id == id);
            if (index == -1) {
                return ({code: 500, msg: `No se encontro el id ${id}`});
            } else {
                this.dataBase.splice(index, 1);
                return ({msg: `Eliminado!`});
            }
        } catch (error) {
            return ({code: 500, msg: `Error al eliminar`});
        }
    }

    deleteAll = async () => {
        try {
            this.productos = [];
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al eliminar`});
        }
    }

}

export default ContenedorMemoria;
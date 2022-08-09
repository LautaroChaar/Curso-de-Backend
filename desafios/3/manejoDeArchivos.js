const fs = require('fs/promises');

class Contenedor {
    constructor(route) {
        this.route = route
    }

    async getAll() {
        try {
            const objs = await fs.readFile(this.route, 'utf-8');
            return JSON.parse(objs);
        } catch (error) {
            return "No se pudo obtener la lista de productos";
        }
    }

    async getRandom() {
        try {
            const objs = await this.getAll();
            const random = Math.floor(Math.random()*objs.length);
            return objs[random];
        } catch (error) {
            return "No se pudo obtener el productos";
        }
    }

    async save(obj) {
        try {
            const objs = await this.getAll();
            let newId;
            if (objs.length === 0) {
                newId = 1;
            } else {
                newId = objs[objs.length - 1].id + 1;
            }

            const newObj = {id: newId, ...obj};
            objs.push(newObj);

            await fs.writeFile(this.route, JSON.stringify(objs, null, 2));
            return newId;

        } catch (error) {
            return "No se pudo guardar el producto";
        }
    }

    async getById(id) {
        try {
            const objs = await this.getAll();
            const idObj = objs.find((item) => item.id === id );
            if (idObj === undefined) {
                return "No se encontro el producto";
            } else {
                return idObj;
            }
        } catch (error) {
            return "No se pudo obtener el producto"
        }
    }

    async deleteById(id) {
        try {
            const objs = await this.getAll();
            const indexObj = objs.findIndex((item) => item.id === id);

            if (indexObj === -1) {
                return "No se encontro el producto";
            } else {
                objs.splice(indexObj, 1);
                await fs.writeFile(this.route, JSON.stringify(objs, null, 2));
            }
        } catch (error) {
            return "No se pudo eliminar el producto"
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.route, JSON.stringify([], null, 2));
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = Contenedor;
import knex from 'knex';

export class ContenedorMariaDB {
    constructor(carritos, productos, config){
        this.knexCli = knex(config);
        this.carritos = carritos;
        this.productos = productos;
    }
    
    addCartProduct = async (req, res) => {
        try {
            const id = Number(req.params.id);
            if (await this.knexCli.from(this.carritos).select('*').where({id: id}) == false) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`});
            } else {
                if (await this.knexCli.from(this.productos).select('*').where({id: req.body.id}) == false) {
                    return ({code: 404, msg: `Producto no encontrado`});
                } else {
                    let res = await this.knexCli.from(this.productos).select('*').where({id: req.body.id});
                    
                    await this.knexCli.from(this.carritos).select('productos').where({id: id}).update({'productos': res})
                    
                    
                    
                    return ({msg: `Producto agregado con exito al carrito!`});
                }
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al agregar un producto en el carrito mediante el metodo ${req.method}`});
        }
    }

    newCart = async (req, res) => {
        try {
            const objs = await this.knexCli.from(this.carritos).select('*');
            let id;
            if (objs.length === 0) {
                id = 1;
            } else {
                id = objs[objs.length - 1].id + 1;
            }
            const obj =  { ...req.body, id };
            await this.knexCli(this.carritos).insert(obj);
            return ({msg: 'Carrito creado con exito!'});
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al crear un nuevo carrito mediante el metodo ${req.method}`});
        }
    }

    deleteCart = async (req, res) => {
        try {
            const id = Number(req.params.id);
            if (await this.knexCli.from(this.carritos).select('*').where({id: id}) == false) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`});
            } else {
                await this.knexCli.from(this.carritos).where({id: id}).del();
                return ({msg: `Carrito ${id} eliminado con exito!`});
            }
        } catch (error) {
            console.log(error);
            return({code: 500, msg: `Error al eliminar el carrito mediante el metodo ${req.method}`});
        }
    }

    getProducts = async (req, res) => {
        try {
            if (req.params.id) {
                const id = Number(req.params.id);
                if (await this.knexCli.from(this.productos).select('*').where({id: id}) == false) {
                    return ({code: 404, msg: `Producto ${id} no encontrado`});
                } else {
                    return await this.knexCli.from(this.productos).select('*').where({id: id});
                }
            } else {
                return await this.knexCli.from(this.productos).select('*').orderBy('id', 'asc');
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al obtener metodo ${req.method} en la ruta ${req.url}`});
        }
    }


    updateProduct = async (req, res)=>{
        try {
            const id = Number(req.params.id);
            if (await this.knexCli.from(this.productos).select('*').where({id: id}) == false) {
                return ({code: 404, msg: `Producto ${id} no encontrado`});
            } else {
                await this.knexCli.from(this.productos).where({id: id}).update(req.body);
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
            if (await this.knexCli.from(this.productos).select('*').where({id: id}) == false) {
                return ({code: 404, msg: `Producto ${id} no encontrado`});
            } else {
                await this.knexCli.from(this.productos).where({id: id}).del();
                return ({msg: `Producto ${id} eliminado con exito!`});
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al eliminar el producto mediante el metodo ${req.method}`});
        }
    }

    addProduct = async (req, res) => {
        try {
            const objs = await this.knexCli.from(this.productos).select('*');
            let id;
            if (objs.length === 0) {
                id = 1;
            } else {
                id = objs[objs.length - 1].id + 1;
            }
            const obj =  { ...req.body, id };
            await this.knexCli(this.productos).insert(obj);
            return ({msg: 'Producto agregado con exito!'});
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `No se pudo agregar el producto mediante el metodo ${req.method}`});
        }
    }

}

export default ContenedorMariaDB;
class ContenedorMemoria {
    constructor(carritos, productos) {
        this.carritos = carritos;
        this.productos = productos;
    }

    getCartProducts = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const indexObj = this.carritos.findIndex((item)=> item.id == id);
            if (indexObj == -1) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`});
            } else {
                let data = this.carritos[indexObj].productos;
                return (data); 
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al obtener los productos del carrito mediante el metodo ${req.method}`});
        }
    }

    newCart = async (req, res) => {
        try {
            let id;
            if (this.carritos.length === 0) {
                id = 1;
            } else {
                id = this.carritos[this.carritos.length - 1].id + 1;
            }
            const date = new Date().toLocaleString();
            const obj =  { ...req.body, id, timestamp: date };
            this.carritos.push(obj);
            return ({msg: 'Carrito creado con exito!'});
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al crear un nuevo carrito mediante el metodo ${req.method}`});
        } 
    }

    
    addCartProduct = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const indexObj = this.carritos.findIndex((item)=> item.id == id);
            const indexProd = this.productos.findIndex((item)=> item.id == req.body.id);
            if (indexObj == -1 || indexProd == -1) {
                return ({code: 404, msg: `El carrito ${id} o el producto ${req.body.id} no existen`});
            } else {
                this.carritos[indexObj].productos.push(this.productos[indexProd]);
                return ({msg: `Producto agregado con exito al carrito!`});
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al agregar un producto en el carrito mediante el metodo ${req.method}`});
        } 
    }
    
    deleteCart = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const indexObj = this.carritos.findIndex((item)=> item.id == id);
            if (indexObj == -1) {
                return ({code: 404, msg: `Carrito ${id} no encontrado`})
            } else {
                this.carritos.splice(indexObj, 1);
                return ({msg: `Carrito ${id} eliminado!`});
            }
        } catch (error) {
            console.log(error)
            return ({code: 500, msg: `Error al obtener ${req.method} ${req.url}`});
        }
    }
    
    deleteCartProduct = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const id_prod = Number(req.params.id_prod);
            const indexObj = this.carritos.findIndex((item)=> item.id == id);
            if (indexObj == -1)  {
                return ({code: 404, msg: `El carrito ${id} no existe`});
            } else {
                let prods = this.carritos[indexObj].productos;
                const indexProd = prods.findIndex((item)=> item.id == id_prod);
                if (indexProd == -1) {
                    return ({code: 404, msg: `Producto no encontrado`});
                } else {
                    prods.splice(indexProd, 1);
                    return ({msg: `Producto eliminado con exito del carrito!`});
                }
            }
        } catch (error) {
            console.log(error);
            return ({code: 500, msg: `Error al eliminar el producto del carrito mediante el metodo ${req.method}`});
        }
    }



    getProducts = async (req, res) => {
        try {
            if (req.params.id) {
                const id = Number(req.params.id);
                const indexObj = this.productos.findIndex((item)=> item.id == id);
                if (indexObj == -1) {
                    return ({code: 404, msg: `Producto ${id} no encontrado`})
                } else {
                    return(this.productos[indexObj]);
                }
            } else {
                return (this.productos);
            }
        } catch (error) {
            console.log(error)
            return ({code: 500, msg: `Error al obtener ${req.method} ${req.url}`});
        }
    }
    
    addProduct = async (req, res) => {
        let id;
        if (this.productos.length === 0) {
            id = 1
        } else {
            id = this.productos[this.productos.length - 1].id + 1
        }
        const data = {...req.body, id}
        this.productos.push(data);
        return ({msg: 'Agregado!', ...req.body, id});
    }
    
    updateProduct = async (req, res)=>{
        try {
            const id = Number(req.params.id);
            const indexItem = this.productos.findIndex((item)=> item.id == id);
            if (indexItem == -1) {
                return ({code: 404, msg: `Producto ${id} no encontrado`})
            } else {
                this.productos[indexItem] = { ...req.body, id }
                return ( {msg: `Producto ${id} actualizado`});
            }
        } catch (error) {
            console.log(error)
            return ({code: 500, msg: `Error al obtener ${req.method} ${req.url}`});
        }
    }
    
    deleteProduct = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const indexObj = this.productos.findIndex((item)=> item.id == id);
            if (indexObj == -1) {
                return ({code: 404, msg: `Producto ${id} no encontrado`})
            } else {
                this.productos.splice(indexObj, 1);
            }
            return ({msg: `Producto ${id} eliminado!`});
        } catch (error) {
            console.log(error)
            return ({code: 500, msg: `Error al obtener ${req.method} ${req.url}`});
        }
    }
}

export default ContenedorMemoria;
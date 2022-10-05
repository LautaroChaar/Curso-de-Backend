import ContenedorMongoDB from "../../containers/contenedorMongoDB.js";
import { productosModel } from "../../models/productos.model.js";
import { carritosModel } from '../../models/carritos.model.js';

class ProductosDaoMongoDB extends ContenedorMongoDB {
   constructor() {
    super(carritosModel, productosModel);
   }
}

export default ProductosDaoMongoDB;
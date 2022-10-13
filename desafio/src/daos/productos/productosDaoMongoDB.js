import ContenedorMongoDB from "../../containers/contenedorMongoDB.js";
import { productosModel } from "../../models/productos.model.js";

class ProductosDaoMongoDB extends ContenedorMongoDB {
   constructor() {
      super(productosModel);
   }
}

export default ProductosDaoMongoDB;
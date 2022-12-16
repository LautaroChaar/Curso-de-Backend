class ProductoDTO {
    constructor(datos, cotizaciones) {
        this.nombre = datos.nombre;
        this.descripcion = datos.descripcion;
        this.precio = datos.precio;

        for (const [denominacion, valor] of Object.entries(cotizaciones)) {
            this[denominacion] = valor
        }
    }
}

export default ProductoDTO;
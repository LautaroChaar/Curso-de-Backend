class UsuarioDTO {
    constructor(datos, info) {
        this.nombreCompleto = datos.name + ' ' + datos.lastname;
        this.direccion = datos.adress;
        this.telefono = datos.phone;
        this.email = datos.username;
        this.imagen = datos.avatar;

        for (const [denominacion, valor] of Object.entries(info)) {
            this[denominacion] = valor
        }
    }
}

export default UsuarioDTO;
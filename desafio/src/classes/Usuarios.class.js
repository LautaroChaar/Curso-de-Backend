class Usuarios {
    
    getAge(fecha) {
        const fechaUsuario = fecha.slice(0, 10).split('-');
        const año = Number(fechaUsuario[0]);
        const añoActual = new Date().getFullYear();
        const edad = añoActual - año;
        return edad;
    }
    
    getBirthday(fecha) {
        const fechaUsuario = fecha.slice(0, 10).split('-');
        const cumpleaños = `${fechaUsuario[2]}/${fechaUsuario[1]}`;
        return cumpleaños
    }
    
}

export default Usuarios;


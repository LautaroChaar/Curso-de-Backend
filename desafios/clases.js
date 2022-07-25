class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = libros,
        this.mascotas = mascotas
    }

    getFullName() {
        return `El usuario se llama ${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        return `${this.nombre} tiene ${this.mascotas.length} mascota/s`;
    }

    addBook(libro, autor) {
        this.libros.push({
            nombre: libro,
            autor: autor
        });
    }

    getBookNames() {
        const booksNames = [];
        this.libros.map(item => {
            booksNames.push(item.nombre);
        })
        return booksNames;
    }

}

const usuario1 = new Usuario("Lautaro", "Chaar", [], []);
console.log(usuario1.getFullName());
usuario1.addMascota("perro");
usuario1.addMascota("gato");
console.log(usuario1.countMascotas());
usuario1.addBook("The Hobbit", "J.R.R.Tolkien");
usuario1.addBook("Muerte en el Nilo", "Agatha Christie");
console.log(usuario1.getBookNames()); 
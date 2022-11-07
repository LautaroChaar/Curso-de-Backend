function generarNumero () {
    let random = Math.floor(Math.random() * ((1000 + 1) - 1) + 1);
    return random
}

function listaNumeros (cantidad) {
    let array = [];
    
    for (let i = 0; i < cantidad; i++ ) {
        let num = generarNumero();
        array.push(num);
    }
    array.sort();
    const respuesta = array.reduce((acum, item) => {
        const contador = acum[item] ||  0;
        return {
            acum,
            [item]: count + 1
        };
    }, {});

    return respuesta;
}

process.on('message', cantidad =>  {
    const lista = listaNumeros(cantidad);
    process.send(lista);
    process.exit(1);
});
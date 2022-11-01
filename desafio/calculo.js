function generarNumero () {
    let random = Math.floor(Math.random() * ((1000 + 1) - 1) + 1);
    return random
}

function listaNumeros () {
    let array = [];
    
    for (let i = 0; i < 1000; i++ ) {
        let num = generarNumero();
        array.push(num);
    }
    array.sort();
    let respuesta = array.reduce((acum, item) => {
        acum[item] = (acum[item] || 0) + 1;
        return acum
    }, {})

    return respuesta;
}

process.on('message', msg =>  {
    console.log('mensaje desde el procesos principal:\n');
    console.log(msg);

    const lista = listaNumeros();
    process.send(lista);
});




// const calculo = () => {
//     let sum = 0
//     for (let i = 0; i < 6e9; i++) {
//         sum += i
//     }
//     return sum
// }

// process.on('exit', () => {
//     console.log(`worker #${process.pid} cerrado`)
// })

// process.on('message', msg => {
//     console.log(`worker #${process.pid} iniciando su tarea`)
//     const sum = calculo()
//     process.send(sum)
//     console.log(`worker #${process.pid} finalizó su trabajo`)
//     process.exit()
// })

// process.send('listo')

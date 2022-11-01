import { Router } from 'express';
import { fork } from 'child_process';

const forkedProcess = fork('./calculo.js');
const routerRandoms = new Router();

// function generarNumero () {
//     let random = Math.floor(Math.random() * ((1000 + 1) - 1) + 1);
//     return random
// }

// function listaNumeros (cant) {
//     let array = [];
    
//     for (let i = 0; i < cant; i++ ) {
//         let num = generarNumero();
//         array.push(num);
//     }
    
//     let respuesta = array.sort().reduce((acum, item) => {
//         acum[item] = (acum[item] || 0) + 1;
//         return acum
//     }, {})

//     return respuesta;
// }

routerRandoms.get('/:cant?', async (req, res) => {
    let cantidad = Number(req.params.cant);
    let respuesta;
    if (!cantidad) {
        forkedProcess.send('inicio')
        forkedProcess.on('message', msg => {
            console.log('mensaje desde el procesos secundario:');
            console.log(msg);
            respuesta = 121882
        });
        ;
        // respuesta = listaNumeros(10);
    } else {
        respuesta = listaNumeros(cantidad);
    }
    res.render('viewNumRandoms',  {respuesta} );
});

export { routerRandoms };




// app.get('/no-bloqueante', (req, res) => {
//     const computo = fork(path.resolve(process.cwd(), 'computo.js'))
//     computo.on('message', resultado => {
//         if (resultado === 'listo') {
//             computo.send('start')
//         } else {
//             res.json({ resultado })
//         }
//     })
// })
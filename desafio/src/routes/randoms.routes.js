import { Router } from 'express';
import { fork } from 'child_process';

const routerRandoms = new Router();

routerRandoms.get('/:cant?', (req, res) => {
    const forkedProcess = fork('./calculo.js');
    let cantidad;
    if (req.params.cant) {
        cantidad = Number(req.params.cant);
    } else {
        cantidad = 100000000;
    }

    forkedProcess.send(cantidad);

    forkedProcess.on('message', lista => {
        console.log(lista);
    });
    res.render('viewNumRandoms');
});    


export { routerRandoms };
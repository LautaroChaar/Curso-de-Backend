import { Router } from 'express';
import { fork } from 'child_process';
import { logger } from '../utils/configLogger.js';

const routerRandoms = new Router();

routerRandoms.get('/:cant?', (req, res) => {
    const {url, method } = req;
    // const forkedProcess = fork('./calculo.js');
    // let cantidad;
    // if (req.params.cant) {
    //     cantidad = Number(req.params.cant);
    // } else {
    //     cantidad = 100000000;
    // }

    // forkedProcess.send(cantidad);

    // forkedProcess.on('message', lista => {
    //     console.log(lista);
    // });

    logger.info(`Ruta ${method} /api/randoms${url}`);
    res.render('viewNumRandoms');
});    


export { routerRandoms };


// node server.js 8080 FORK
// artillery quick --count 20 -n 50 http://localhost:8080/info > result_fork2.txt
/*
    node --prof server.js
    curl -X GET "http://localhost:8080/newUser?username=marian&password=qwerty123"
    artillery quick --count 10 -n 50 "http://localhost:8080/auth-bloq?username=marian&password=qwerty123" > result_bloq.txt
    ** renombrar el archivo resultado Isolate a bloq-v8.log

    node --prof server.js
    curl -X GET "http://localhost:8080/newUser?username=marian&password=qwerty123"
    artillery quick --count 10 -n 50 "http://localhost:8080/auth-nobloq?username=marian&password=qwerty123" > result_nobloq.txt
    ** renombrar el archivo resultado Isolate a nobloq-v8.log

    Para desencriptar los archivos resultados v8
    node --prof-process conConsole.log > result_prof-conConsole.txt
    node --prof-process sinConsole.log > result_prof-sinConsole.txt
*/

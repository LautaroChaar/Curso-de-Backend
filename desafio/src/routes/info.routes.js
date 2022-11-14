import { Router } from 'express';
import util from 'util';
import minimist from 'minimist';
import os from 'os';
import compression from 'compression';
import { logger } from '../utils/configLogger.js';


const CPU_CORES = os.cpus().length;

const routerInfo = new Router();

let args = minimist(process.argv.slice(2));

function print(obj) {
    return util.inspect(obj, {showHidden: false, depth: 12, colors: true});
}


routerInfo.get('/', (req, res) => {
    let memoria = print(process.memoryUsage());
    let argumentos = print(args);
    const {url, method } = req;
    logger.info(`Ruta ${method} /info${url}`);
    res.render('viewInfo', {memoria, argumentos, CPU_CORES});
})

routerInfo.get('/zip', compression(), (req, res) => {
    let memoria = print(process.memoryUsage());
    let argumentos = print(args);
    const {url, method } = req;
    logger.info(`Ruta ${method} /info${url}`);
    res.render('viewInfo', {memoria, argumentos, CPU_CORES});
})


export { routerInfo };
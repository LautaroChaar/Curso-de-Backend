import { Router } from 'express';
import util from 'util';
import minimist from 'minimist';


const routerInfo = new Router();

let args = minimist(process.argv.slice(2));

function print(obj) {
    return util.inspect(obj, {showHidden: false, depth: 12, colors: true});
}


routerInfo.get('/', (req, res) => {
    let memoria = print(process.memoryUsage());
    let argumentos = print(args);
    res.render('viewInfo', {memoria, argumentos});
})


export { routerInfo };
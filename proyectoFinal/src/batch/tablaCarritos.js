import knex from 'knex';
import { config } from '../utils/config.js';

const knexCli = knex(config.mariaDB);

knexCli.schema.dropTableIfExists('coder')
    .then(()=>{
        knexCli.schema.createTable('carritos', table => {
            table.increments('id').primary();
            table.string('productos').notNullable();
            table.timestamp('date').notNullable();
        })
            .then(()=> console.log("Tabla creada"))
            .catch(err=> {
                console.log(err); 
                throw err;
            })
            .finally(()=>{
                knexCli.destroy();
            });
    });
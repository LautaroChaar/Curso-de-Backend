import knex from 'knex';
import { config } from '../utils/config.js';

const knexCli = knex(config.mariaDB);

knexCli.schema.dropTableIfExists('coder')
    .then(()=>{
        knexCli.schema.createTable('productos', table => {
            table.increments('id').primary();
            table.string('nombre', 50).notNullable();
            table.string('descripcion', 50).notNullable();
            table.string('codigo', 50).notNullable();
            table.timestamp('date').notNullable();
            table.decimal('precio').notNullable();
            table.decimal('stock').notNullable();
            table.string('foto').notNullable();
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
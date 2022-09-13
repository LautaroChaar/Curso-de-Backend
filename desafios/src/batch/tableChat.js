import knex from 'knex';
import { configSQLite } from '../utils/configSQLite.js';

const knexCli = knex(configSQLite.db);

knexCli.schema.dropTableIfExists('chat')
    .then(()=>{
        knexCli.schema.createTable('chat', table => {
            table.increments('id').primary();
            table.string('author', 50).notNullable();
            table.timestamp('date').notNullable();
            table.string('text', 50).notNullable();
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

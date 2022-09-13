import knex from 'knex';

export class Contenedor {
    constructor(tableName, config){
        this.knexCli = knex(config.db);
        this.tableName = tableName;
    }

    async getAll(){
        try {
            return await this.knexCli.from(this.tableName).select('*').orderBy('id', 'asc');
        } catch (error) {
            throw error;
        }
    }

    async getById(id){
        try {
            return await this.knexCli.from(this.tableName).select('*').where({id: id});
        } catch (error) {
            throw error;
        }
    }

    async add(obj){
        try {
            return await this.knexCli(this.tableName).insert(obj);
        } catch (error) {
            throw error;
        }
    }

    async update(id, obj){
        try {
            return await this.knexCli.from(this.tableName).where({id: id}).update(obj);
        } catch (error) {
            throw error;
        }
    }

    async delete(id){
        try {
            return await this.knexCli.from(this.tableName).where({id: id}).del();
        } catch (error) {
            throw error;
        }
    }

}

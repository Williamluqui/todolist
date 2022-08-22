const knex = require("../database/connection");

class listApp{

    async findAll(){
        
        try {
            let resultList = await knex.select().orderBy('id','desc').table('list');
            return resultList;

        } catch (error) {
            console.log(error)
        }
    }
    async newList(body){
        try {
            await knex.insert({body}).table("list");
        } catch (error) {
            console.log(error);
        }

    }

}

module.exports = new listApp;


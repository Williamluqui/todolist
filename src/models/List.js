const knex = require("../database/connection");
const User = require("./User");

class listApp {
  
  async findAll() {
    try {
      let resultList = await knex
      .select()
      .table("users")
      .orderBy("list.id" ,"desc")
      .innerJoin("list","list.user_id","users.id");
      return resultList;
    } catch (error) {
      console.log(error);
    }
  }
  async newList(body,id) {
   
    try {
      if (id == undefined) return;
      await knex
      .insert({body,user_id:id})  // ADICIONAR ID DO USUARIO E SALVAR NO BD
      .table("list");
      
    } catch (error) {
      console.log(error);
    }
  }
  
  async findById(id) {
    try {
      let result = await knex
        .select(["id", "body", "checked"])
        .where({ id: id })
        .table("list");

      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async update(id, body) {
    let updateList = await this.findById(id);

    if (updateList != undefined && body != undefined) {
      let editList = {};
      // editList.id = id
      editList.body = body;
      try {
        return await knex.where({ id: id }).update(editList).table("list");
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  async delete(id) {
    try {
      await knex.where({ id: id }).delete(id).table("list");
    } catch (error) {
      console.log(error);
    }
  }

  async checkedList(id) {
    try {
      const dataCheck = await this.findById(id);
      // MARCAÇÃO E DESM. DO CHECKBOX
      if (dataCheck.checked == 1) {
        dataCheck.checked = 0;
      } else {
        dataCheck.checked = 1;
      }
      if (dataCheck != undefined) {
        await knex
          .where({ id: id })
          .update({ checked: dataCheck })
          .table("list");
        return dataCheck;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}

module.exports = new listApp();

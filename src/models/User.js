const knex = require("../database/connection");
const bcrypt = require("bcrypt");
const Passwordtoken = require("./Passwordtoken");

class User {
  async findAll() {
    try {
      let result = await knex.select(["id", "name", "email"]).table("users");
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findById(id) {
    try {
      let result = await knex
        .select(["id", "name", "email"])
        .where({ id: id })
        .table("users");
      return (result.length > 0) ? result[0]:undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async new(email, password, name) {
    try {
      let hash = await bcrypt.hash(password, 10);
      await knex.insert({ email, name, password: hash }).table("users");
    } catch (error) {
      console.log(error);
    }
  }
  async findEmail(email) {
    try {
      let result = await knex.select("*").from("users").where({ email: email }); // verificacao se email existe
      return (result.length > 0) ? true:false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async update(id, email, name) {
    let user = await this.findById(id);

    if (user != undefined) {
      let editUser = {};
      if (email != user.email) {
        let result = await this.findEmail(email);
        if (!result) {
          editUser.email = email;
        } else {
          return { status: false, error: "O email já esta cadastrado." };
        }
      }
      if (name != undefined) {
        editUser.name = name;
      }

      try {
        await knex.update(editUser).where({ id: id }).table("users");
        return { status: true };
      } catch (error) {
        return { status: false, error: error };
      }
    } else {
      return { status: false, error: "O usuário não existe" };
    }
  }
  async delete(id) {
    let user = await this.findById(id);
    if (user != undefined) {
      try {
        await knex.delete().where({ id: id }).table("users");
        return { status: true };
      } catch (error) {
        return { status: false, error: error };
      }
    } else {
      return {
        status: false,
        error: "Usuário não encontrado portanto não pode ser deletado !",
      };
    }
  }
  async findByEmail(email) {
    try {
      let result = await knex
        .select(["id", "name", "email", "password"])
        .where({ email: email })
        .table("users");
      return (result.length > 0) ? result[0]:undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  async changePassword(newPassword, id, token) {
    let hash = await bcrypt.hash(newPassword, 10);
    await knex.update({ password: hash }).where({ id: id }).table("users");
    await Passwordtoken.setUsed(token); // DEFINIR COMO TOKEN UTILIZADO
  }
}

module.exports = new User();

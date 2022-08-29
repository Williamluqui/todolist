const list = require("../models/List");
var session = require("express-session");
var flash = require("express-flash");
var cookieParser = require("cookie-parser");

let message = "";
let type = "";

class listAppController {
  async index(req, res) {
    /**
     * BUSCA NO BANCO DE DADOS POR UMA TAREFA
     */

    try {
      let messageListVoid =
        " Sem Tarefas no momento... 😢 , Adicione sua primeira tarefa... ";
      let findList = await list.findAll();
      if (findList.length > 0) {
        res.render("../src/views/index", {type,message: req.flash('message'),findList });
      } else {
        res.render("../src/views/index", { findList, messageListVoid });
      }
    } catch (error) {
      res.render("../src/views/error/500");
    }
  }
  async create(req, res) {
    let { body } = req.body;

    try {
      if (body <= 0 || body.length >= 50 || body == undefined) {
        type = "danger"
        req.flash('message','Por favor insira seu texto !')
        res.redirect("/");
        return;
      }
     
      type ="success"
      req.flash('message','Tarefa criada !')
      res.redirect("/");

      await list.newList(body);
        
    } catch (error) {
      console.log(error);
    }
  }

  async findListId(req, res) {
    let { id } = req.params;
    const result = await list.findById(id);

    try {
      if (isNaN(id)) {
        res.redirect("/");
        return;
      }
      if (result != undefined) {
        res.status(200).json({ result });
      } else {
        res.json({});
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateList(req, res) {
    let id = parseInt(req.params.id);
    let { body } = req.body;

    let result = await list.update(id, body);
    let message = {};

    try {
      if (isNaN(id)) {
        res.redirect("/");
        return;
      }
      if (body <= 0 ) {
        message = "Lista vazia , inserir dados !";
        res.redirect("/"); // arrumar msg erro
        return;
      }
      if (result != undefined) {
        message = req.flash("Dados Atualizados com Sucesso !");

        setTimeout(() => {
            type ="success"
            req.flash('message','Tarefa Atualizada !')
          res.redirect("/");
        }, 1000);
      } else {
        //
        res.status(400).json({ message: "erro" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteList(req, res) {
    let id = parseInt(req.params.id);

    try {
      if (id != undefined) {
        await list.delete(id);
        setTimeout(() => {
        type ="success"
        req.flash('message','Tarefa Deletada !')
        res.redirect("/");
        }, 1000);
        
       
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new listAppController();

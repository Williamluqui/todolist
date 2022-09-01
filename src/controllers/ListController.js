const list = require("../models/List");

let type = "";

class listAppController {
  async index(req, res) {
    try {
      let messageListVoid =
        " Sem Tarefas no momento... 😢 , Adicione sua primeira tarefa... ";
      let findList = await list.findAll();
      if (findList.length > 0) {
        res.render("../src/views/index", {
          type,
          message: req.flash("message"),
          findList,
        });
      } else {
        res.render("../src/views/index", {
          findList,
          messageListVoid,
          type,
          message: req.flash("message"),
        });
      }
    } catch (error) {
      res.render("../src/views/error/500");
    }
  }
  async create(req, res) {
    let { body } = req.body;
    try {
      if (body.length >= 50) {
        type = "danger";
        req.flash("message", "Coloque menos que 50 caracteres!");
        res.redirect("/");
        return;
      }
      if (body <= 0 || body == undefined) {
        type = "danger";
        req.flash("message", "Por favor insira seu texto !");
        res.redirect("/");
        return;
      }
      type = "success";
      req.flash("message", "Tarefa criada !");
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
    try {
      if (Number.isNaN(id)) {
        res.redirect("/");
        console.log(isNaN(id));
        return;
      }
      if (body.length <= 0) {
        type = "danger";
        req.flash("message", "Insira dados na lista! ");
        res.redirect("/");
        return;
      }
      if (!undefined) {
        type = "success";
        req.flash("message", "Tarefa Atualizada !");
        res.redirect("/");
        await list.update(id, body);
      } else {
        type = "danger";
        req.flash("message", "Erro tente novamente! ");
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
        type = "success";
        req.flash("message", "Tarefa Deletada !");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async listChecked(req, res) {
    let id = parseInt(req.params.id);
    let checkId = await list.checkedList(id);
    try {
      if (isNaN(id)) {
        res.redirect("/");
        return;
      }
      if (checkId != undefined) {
        res.redirect("/");
      } else {
        type = "danger";
        req.flash("message", "Erro ao marcar a Tarefa!");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new listAppController();

const list = require("../models/List");
const user = require("../controllers/UserController");

const jwt = require("jsonwebtoken");

const {SECRET} = process.env;

let type = "";
class listAppController {
  async index(req, res) {
  let messageListVoid =
        " Sem Tarefas no momento... 😢 , Adicione sua primeira tarefa... ";
        const {token} = req.cookies;
        const decode = jwt.verify(token,SECRET);
        
    try {
      
      const findList = await list.findAll();
      
      // // filtrar tarefas do usuario logado //
      let listUser = await findList.map((list)=>{     
          if (list.user_id == decode.user) { 
              return list ;
          }else{
              return undefined;
          }                    
      })
      // retirando Null do array // 
      listUser = await listUser.filter(n => n);
      if (findList.length > 0) {
       
        res.render("../src/views/index", {
          type,
          message: req.flash("message"),
          messageListVoid,
          findList:listUser
            
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
    const {token} = req.cookies;
    const decode = jwt.verify(token,SECRET);
    const decodeUserId= decode.user; 

    try {
      if (body.length >= 50) {
        type = "danger";
        req.flash("message", "Coloque menos que 50 caracteres!");
        res.redirect("/tasks");
        return;
      }
      if (body <= 0 || body == undefined) {
        type = "danger";
        req.flash("message", "Por favor insira seu texto !");
        res.redirect("/tasks");
        return;
      }
      type = "success";
      req.flash("message", "Tarefa criada !");
      await list.newList(body,decodeUserId);
      res.redirect("/tasks");
    } catch (error) {
      console.log(error);
    }
  }

  async findListId(req, res) {
    let { id } = req.params;
    const result = await list.findById(id);
    try {
      if (isNaN(id)) {
        res.redirect("/tasks");
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
        res.redirect("/tasks");
        console.log(isNaN(id));
        return;
      }
      if (body.length <= 0) {
        type = "danger";
        req.flash("message", "Insira dados na lista! ");
        res.redirect("/tasks");
        return;
      }
      if (!undefined) {
        type = "success";
        req.flash("message", "Tarefa Atualizada !");
        await list.update(id, body);
        res.redirect("/tasks");
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
        res.redirect("/tasks");
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
        res.redirect("/tasks");
        return;
      }
      if (checkId != undefined) {
        res.redirect("/tasks");
      } else {
        type = "danger";
        req.flash("message", "Erro ao marcar a Tarefa!");
        res.redirect("/tasks");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new listAppController();

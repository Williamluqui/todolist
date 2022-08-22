const list = require("../models/List");
var session = require('express-session')
var flash = require('express-flash')
var cookieParser = require("cookie-parser");

class listAppController{

    async index (req,res){
        /**
         * BUSCA NO BANCO DE DADOS POR UMA TAREFA
         */
       var messageError = req.flash('erro')
        
        try {
            let message = "Sem Tarefas no momento... 😢 , Adicione sua primeira tarefa..."
            let findList = await list.findAll();
            if (findList.length > 0) {

                res.render("../src/views/index",{findList});
                
            }else{
                res.render("../src/views/index",{findList, message});
              
            } 
        } catch (error) {
            console.log(error)
        }
       
    }
    async create(req,res){
        let {body} = req.body;
        
        try {
            if (body <= 0) {
                /**
                 * Inserir mensagem de erro para o front
                 * res.json({message: "Por favor insira seu texto !"})
                 */
            
                res.redirect('/')
                return
            }
            await list.newList(body);
            res.redirect("/");
        } catch (error) {
            console.log(error)
        }

        
        
    }

}

module.exports = new listAppController;
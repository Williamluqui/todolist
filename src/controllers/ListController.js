const list = require("../models/List");
var session = require('express-session')
var flash = require('express-flash')
var cookieParser = require("cookie-parser");

class listAppController{

    async index (req,res){
        /**
         * BUSCA NO BANCO DE DADOS POR UMA TAREFA
         */
       
        try {
            let message = " Sem Tarefas no momento... 😢 , Adicione sua primeira tarefa... "
            let findList = await list.findAll();
            if (findList.length > 0) {
                res.render("../src/views/index",{findList});
            }else{
                res.render("../src/views/index",{findList, message});
            } 
        } catch (error) {
            res.render("../src/views/error/500")
        }
       
    }
    async create(req,res){
        let {body} = req.body;
        try {
            if (body <= 0 || body == undefined){
                
                /**
                 * Inserir mensagem de erro para o front
                 * res.json({message: "Por favor insira seu texto !"})
                 */
                res.redirect('/?error=inserir?tarefa');
                return;
            }
            await list.newList(body);
            res.redirect("/");
        }catch (error) {
            console.log(error)
        }
    }

    async findListId(req,res){
            let {id} = req.params;
            let result = await list.findById(id);
            
        try {
            if (isNaN(id)) {
                res.redirect("/" );
                return;
            }
            if (result != undefined) {
                res.status(200).json({result})
            } else {
                res.json({})
                }
        } catch (error) {
             console.log(error)   
            }

    }

    async updateList(req, res){
        let id = parseInt(req.params.id) 
        let { body } = req.body;
       
       
        let result = await list.update(id, body);
        let message = {}
        console.log(message)
        
    try {
        if (isNaN(id)) {
            res.redirect("/" );
            return;
        }
        if (body <= 0) {
            message = "Lista vazia , inserir dados !"
            res.redirect("/") // arrumar msg erro
            return
        }
        if (result != undefined ){
            message =  req.flash("Dados Atualizados com Sucesso !");
            
             setTimeout(() => {
                res.redirect("/");
             }, 1000);   
            

         }else{
            //
            res.status(400).json({message:"erro"})


         }
     
    }catch (error) {
      console.log(error)
    }
}

}

module.exports = new listAppController;
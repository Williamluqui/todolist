const User = require("../models/User");
const PasswordToken = require("../models/Passwordtoken");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET
const bcrypt = require("bcrypt");

let type = "";

class UserController{
    // home view register
    async index(req, res){
         res.render("../src/views/register",{type,message: req.flash("message")});
    }

    // home view login
    async indexLogin(req, res){
        res.render("../src/views/login",{type,message: req.flash("message")});
    }

    //TODOS USUARIOS 
    async allUsers(req,res){
        
        let users = await User.findAll();
        res.json(users)
    }

    // FILTRAR USUARIOS 
    async findUser(req,res){
        let {id} = req.params;
        let user = await User.findById(id);
        if (user == undefined) {
            res.clearCookie('token');
            res.redirect('/')
        }else{
            res.json(user);
        }
    }

    async created(req,res){
        let {email, name, password, confirmPassword} = req.body;

        const regexEmail =
        /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
        const regexName = /^([A-Za-z])+$/
        try {
        
        if(!regexName.test(name) || name == undefined){
            type = "danger"
            req.flash("message", "Insira um nome valido!");   
            res.redirect("/register")
            return;
        }
        if (!regexEmail.test(email) || email == undefined ) {
            type = "danger" 
            req.flash("message", "O email Já esta cadastrado ou é invalido!");
            res.redirect("/register")
            return;       
         }
         let emailExist = await User.findEmail(email);
         if(emailExist){
             type = "danger"
             req.flash("message", "Email já cadastrado!"); 
             res.redirect("/register")
             return;
         }
         if (password.length < 6) {
            type = "danger"
            req.flash("message", "Insira 6 caracteres");  
            res.redirect("/register")
            return;
        }
        if(password == undefined || password != confirmPassword){
            type = "danger"
            req.flash("message", "As Senhas estão diferentes!");  
            res.redirect("/register")
            return
        }     
        await User.new(email.toLowerCase(), password, name);
        res.redirect("/tasks");
    } catch (error) {
        res.render("../src/views/error/500");
    }
    } 
    async edit(req, res){
        let {id, name, email} = req.body;
        let result = await User.update(id, email, name);
        if (result != undefined) {
            if (result.status) {
                res.json({message:"Usuário editado!"} )
            }else{
                res.json(result.error)
            }
        }else{
            res.status(406).json({message: "Ocorreu um erro no servidor!"})
        }
    }
    async remove(req, res){
        let {id} = req.params;
        let result = await User.delete(id);
        if (result.status) {
            res.status(200).json({message:"Usuário deletado com Sucesso !"})
        }else{
            res.status(406).json({message:result.error});
        }
    }
     async recoveryPassword(req, res){
        let {email} = req.body;
        let result = await PasswordToken.create(email);
        console.log(result.status)
        if (result.status){
            console.log(result.token)
            res.status(200).send(""+ result.token)
            
        } else {
            res.status(406).send(result.error)
        }
     }
     async changePassword(req, res){
        let {token,password} = req.body;
        let isTokenValid = await PasswordToken.validate(token);

        if (isTokenValid.status){
          await User.changePassword(password,isTokenValid.tokenUser.user_id,isTokenValid.tokenUser.token);
          res.status(201).json({message:"Usuário Criado"})
        } else {
            res.status(406).json({message:"Token Inválido !"})
        }
    }

     async signIn(req, res){
        let {email,password} = req.body;
        
        
        if (email.length <= 0 || password.length <= 0) {
            type = "danger"
            req.flash("message", "Preencha os campos");
            res.redirect("/login");
            return;
        }    
        let user = await User.findByEmail(email);
        if (user != undefined) {
            const result = await  bcrypt.compare(password,user.password);
            
            if (result) {
            const token = jwt.sign({ email: user.email, user:user.id }, SECRET,{expiresIn:'5h'});
            const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour  
            res.cookie('token', token,{expires: expiryDate , httpOnly:false}); // 18000000 '5h'
            res.redirect("/tasks")
            }else{
                type = "danger"
                req.flash("message", "Email ou senha incorreto!");
                res.cookie('token', 'InvalidToken',{maxAge:1,httpOnly:true});
                res.redirect("/login");
                return;
            }
        } else {
            type = "danger"
            req.flash("message", "Esse email não existe!");
            res.redirect("/login");
        }
    }

    async logout(req, res) {
        res.redirect('/');
        res.cookie('token', 'InvalidToken',{maxAge:1});
        
    }

}



module.exports = new UserController();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
    const authToken = req.headers['authorization']
    
    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        let token = bearer[1];
        
        try {
            let decoded =  jwt.verify(token,SECRET);
            console.log(decoded)
            if (decoded == User.id) {
                next();
            } else {
                res.status(401).json({message: "você não tem permissão para acessar essa rota !"});
                return;
            }
        } catch (error) {
            res.status(401).json({message:"Você não esta logado no sistema !"})
        }
    }else{
        res.status(401).json({message:"você não está autenticado!"})
        return;
    }
}
const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET

module.exports = function(req, res, next) { 

    const acessToken =  req.cookies.token;
     
    if(!acessToken){
        type = "danger"
        req.flash("message", "Ops Você não tem permissão para isso !!");
       return res.redirect("/") 
    } 
    try {
     const validToken = jwt.verify(acessToken, SECRET);
     if (validToken) return next();
        
    } catch (err) {
        type = "danger"
        req.flash("message", "Ops Você não tem permissão para isso !!");
        res.redirect("/login")
     return 
    }
}

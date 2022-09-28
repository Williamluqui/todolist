const jwt = require("jsonwebtoken");
const {SECRET} = process.env;

module.exports =  (req, res, next) => {
  const acessToken = req.cookies.token;

  if (acessToken == undefined) {
    type = "danger";
    req.flash("message", "Ops Você não tem permissão para isso !! ");
    return res.redirect("/login");
  }
  try {
    const validToken = jwt.verify(acessToken, SECRET);
    if (validToken) return next();
  } catch (err) {
    type = "danger";
    req.flash("message", "Ops Você não tem permissão para isso !!");
    res.redirect("/login");
    return;
  }
};

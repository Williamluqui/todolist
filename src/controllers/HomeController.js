
class HomeController {
    async index(req, res) {
      res.render("../src/views/home")
    }
  }
  
  module.exports = new HomeController();
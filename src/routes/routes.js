const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/HomeController");
const listController = require("../controllers/ListController");
const UserController = require("../controllers/UserController");

// Middlewares
const validateToken = require("../middlewares/auth");

//Index
router.get('/',HomeController.index);
router.get('/register',UserController.index);
router.get('/login',UserController.indexLogin);

// Rotas de Usuarios 
router.post('/user',UserController.created);
router.get ('/user/:id',validateToken, UserController.findUser);
router.post('/user/login',UserController.signIn);
router.get('/user/logout',UserController.logout);

// Rotas das Listas
router.get('/tasks',validateToken, listController.index);
router.post('/savelist',validateToken,listController.create);
router.get('/list/:id',validateToken,listController.findListId);
router.post('/update/:id',validateToken,listController.updateList);
router.post('/deleteList/:id',validateToken,listController.deleteList);
router.get('/check/:id',validateToken,listController.listChecked);


module.exports = router;

const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/HomeController");

const listController = require("../controllers/ListController")

const UserController = require("../controllers/UserController");
// Middlewares
const AdminAuth = require("../middlewares/AdminAuth");
const validateToken = require("../middlewares/auth")
//Index
router.get('/',HomeController.index);
router.get('/register',UserController.index);
router.get('/login',UserController.indexLogin);

// Router Users
router.post('/user',UserController.created);
router.get('/user',validateToken,UserController.allUsers);
router.get ('/user/:id',validateToken,UserController.findUser);
// router.put('/user',validateToken,UserController.edit);
// router.delete('/user/:id',validateToken,UserController.remove);
// router.post('/recoverypassword',UserController.recoveryPassword);
// router.post('/changepassword',UserController.changePassword);
router.post('/user/login',UserController.signIn);
router.get('/user/logout',UserController.logout);

// Lists
router.get('/tasks',validateToken, listController.index);
router.post('/savelist',validateToken,listController.create);
router.get('/list/:id',validateToken,listController.findListId);
router.post('/update/:id',validateToken,listController.updateList);
router.post('/deleteList/:id',validateToken,listController.deleteList);
router.get('/check/:id',validateToken,listController.listChecked);


module.exports = router;

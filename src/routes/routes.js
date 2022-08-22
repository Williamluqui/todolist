const express = require("express");
const router = express.Router();

const listController = require("../controllers/ListController")



router.get('/',listController.index);
router.post('/savelist',listController.create);


module.exports = router;

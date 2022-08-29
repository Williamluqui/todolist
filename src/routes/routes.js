const express = require("express");
const router = express.Router();

const listController = require("../controllers/ListController")

router.get('/',listController.index);
router.post('/savelist',listController.create);
router.get('/list/:id',listController.findListId);
router.post('/update/:id',listController.updateList);
router.post('/deleteList/:id',listController.deleteList);

module.exports = router;

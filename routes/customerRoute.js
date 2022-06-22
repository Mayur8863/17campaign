const router  = require("express").Router();
controllers  = require('../controllers/customerController.js')

router.get("/get",controllers.customerGet);
router.post("/post",controllers.customerPost);

module.exports = router;
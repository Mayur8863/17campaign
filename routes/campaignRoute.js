const router = require("express").Router();

const controllers = require("../controllers/campaignController");

router.get("/get",controllers.campaignGet);
router.post("/post",controllers.campaignPost);

module.exports = router;
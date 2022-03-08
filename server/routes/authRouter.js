const authController = require("../controllers/authController");

const router = require("express").Router();

router.post("/login", authController.login);
router.post("/logout", authController.signOut);

module.exports = router;

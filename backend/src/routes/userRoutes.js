const express = require("express");
const { register, login, getUserProfile } = require("../controllers/userController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/register",register);
router.post("/login",login);
router.get("/",auth,getUserProfile);


module.exports = router;

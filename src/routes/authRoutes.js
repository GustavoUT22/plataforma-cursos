const express = require("express");

const router = express.Router();
const verifyToken = require("../middlewares/auth.middleware");
const verifyRole = require("../middlewares/role.middleware");

const {getUsers, login, register} = require("../controllers/authController")

router.post("/register", register);
router.post("/login", login);
router.get("/users", verifyToken, verifyRole("admin"), getUsers);

module.exports = router;
// Importamos express para crear los endpoints
const express = require("express");

// Creamos el objeto router que nos permitirá crear rutas
const router = express.Router();

// Importamos los controladores que asignaremos a las rutas
const {getUsers, login, register} = require("../controllers/authController")

// Definimos rutas y que controllers aplicarán cada una de las rutas
// router.get("/users", getUsers)
router.post("/register", register);
router.post("/login", login);
router.get("/users", getUsers);

// Exportamos las rutas ya definidas
module.exports = router;
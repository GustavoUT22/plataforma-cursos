// src/routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();

const { registrarUsuario, loginUsuario } = require('../controllers/usuarioController');


router.post('/usuario/registrar', registrarUsuario);

router.post('/usuario/login', loginUsuario);

module.exports = router;
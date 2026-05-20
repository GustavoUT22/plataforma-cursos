// src/routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const { crearCurso, obtenerCursos } = require('../controllers/courseController');

router.post('/cursos', crearCurso);

router.get('/cursos', obtenerCursos);

module.exports = router;
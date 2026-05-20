// src/routes/enrollmentRoutes.js
const express = require('express');
const router = express.Router();
const { inscribirCurso, obtenerMisCursos } = require('../controllers/enrollmentController');

router.post('/inscripciones', inscribirCurso);

router.get('/inscripciones/estudiante/:estudianteId', obtenerMisCursos);

module.exports = router;
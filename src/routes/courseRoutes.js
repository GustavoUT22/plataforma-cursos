// src/routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const { createCourse, getCourses } = require('../controllers/courseController');

router.post('/courses', createCourse);

router.get('/courses', getCourses);

module.exports = router;
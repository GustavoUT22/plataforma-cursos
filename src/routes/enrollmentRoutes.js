// src/routes/enrollmentRoutes.js
const express = require('express');
const router = express.Router();
const { enrollmentCourse, getMyCourses } = require('../controllers/enrollmentController');

router.post('/enrollments', enrollmentCourse);

router.get('/enrollments/student/:studentId', getMyCourses);

module.exports = router;
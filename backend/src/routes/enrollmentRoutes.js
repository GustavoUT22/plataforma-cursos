const express = require('express');
const router = express.Router();
const { enrollmentCourse, getMyCourses } = require('../controllers/enrollmentController');
const verifyToken = require("../middlewares/auth.middleware");
const verifyRole = require("../middlewares/role.middleware");

router.post('/enrollments', verifyToken, verifyRole('student'), enrollmentCourse);
router.get('/enrollments/student/:studentId', verifyToken, verifyRole('admin', 'teacher'), getMyCourses);

module.exports = router;
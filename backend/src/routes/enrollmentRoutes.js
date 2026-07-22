const express = require('express');
const router = express.Router();
const { enrollmentCourse, getMyCourses, getMyEnrollments, getAllEnrollments, deleteEnrollment, deleteMyEnrollment } = require('../controllers/enrollmentController');
const verifyToken = require("../middlewares/auth.middleware");
const verifyRole = require("../middlewares/role.middleware");

router.post('/enrollments', verifyToken, verifyRole('student'), enrollmentCourse);
router.get('/enrollments/me', verifyToken, verifyRole('student'), getMyEnrollments);
router.delete('/enrollments/me/:id', verifyToken, verifyRole('student'), deleteMyEnrollment);
router.get('/enrollments/student/:studentId', verifyToken, verifyRole('admin', 'teacher'), getMyCourses);
router.get('/admin/enrollments', verifyToken, verifyRole('admin'), getAllEnrollments);
router.delete('/admin/enrollments/:id', verifyToken, verifyRole('admin'), deleteEnrollment);

module.exports = router;

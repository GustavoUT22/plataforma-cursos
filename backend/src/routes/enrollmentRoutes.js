const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { enrollmentCourse, getMyCourses, getMyEnrollments, getAllEnrollments, deleteEnrollment, deleteMyEnrollment } = require('../controllers/enrollmentController');
=======
const { enrollmentCourse, getMyCourses, getMyEnrollments, adminEnrollment } = require('../controllers/enrollmentController');
>>>>>>> 4828cdaa0e894dde8498eb386907b11efa108cc7
const verifyToken = require("../middlewares/auth.middleware");
const verifyRole = require("../middlewares/role.middleware");

router.post('/enrollments', verifyToken, verifyRole('student'), enrollmentCourse);
router.post('/enrollments/admin', verifyToken, verifyRole('admin'), adminEnrollment);
router.get('/enrollments/me', verifyToken, verifyRole('student'), getMyEnrollments);
router.delete('/enrollments/me/:id', verifyToken, verifyRole('student'), deleteMyEnrollment);
router.get('/enrollments/student/:studentId', verifyToken, verifyRole('admin', 'teacher'), getMyCourses);
router.get('/admin/enrollments', verifyToken, verifyRole('admin'), getAllEnrollments);
router.delete('/admin/enrollments/:id', verifyToken, verifyRole('admin'), deleteEnrollment);

module.exports = router;

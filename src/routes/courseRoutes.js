const express = require('express');
const router = express.Router();
const { createCourse, getCourses, updateCourse, deleteCourse } = require('../controllers/courseController');
const verifyToken = require("../middlewares/auth.middleware");
const verifyRole = require("../middlewares/role.middleware");

router.post('/courses', verifyToken, verifyRole('admin'), createCourse);
router.get('/courses', getCourses);
router.put('/courses/:id', verifyToken, verifyRole('admin'), updateCourse);
router.delete('/courses/:id', verifyToken, verifyRole('admin'), deleteCourse);

module.exports = router;
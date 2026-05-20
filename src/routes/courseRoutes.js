const express = require('express');
const router = express.Router();
const { createCourse, getCourses } = require('../controllers/courseController');
const verifyToken = require("../middlewares/auth.middleware");
const verifyRole = require("../middlewares/role.middleware");

router.post('/courses', verifyToken, verifyRole('admin'), createCourse);
router.get('/courses', getCourses);

module.exports = router;
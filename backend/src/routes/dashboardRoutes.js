const express = require('express');
const router = express.Router();
const { getDashboard } = require('../controllers/dashboardController');
const verifyToken = require("../middlewares/auth.middleware");
const verifyRole = require("../middlewares/role.middleware");

router.get('/admin/dashboard', verifyToken, verifyRole('admin'), getDashboard);

module.exports = router;
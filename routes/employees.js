const express = require('express');
const employeeController = require('../controllers/employeeController');
const { authMiddleware, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, employeeController.getAllEmployees);
router.post('/', authMiddleware, adminOnly, employeeController.createEmployee);

module.exports = router;

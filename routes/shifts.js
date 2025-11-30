const express = require('express');
const shiftController = require('../controllers/shiftController');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { validateShift } = require('../middleware/validation');

const router = express.Router();

router.post('/', authMiddleware, adminOnly, validateShift, shiftController.createShift);
router.get('/', authMiddleware, shiftController.getShifts);
router.delete('/:id', authMiddleware, adminOnly, shiftController.deleteShift);

module.exports = router;

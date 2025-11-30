const shiftService = require('../services/shiftService');

const createShift = async (req, res) => {
  try {
    const { employeeId, date, startTime, endTime } = req.body;

    if (!employeeId || !date || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const shift = await shiftService.createShift(employeeId, date, startTime, endTime);
    res.status(201).json({ success: true, data: shift });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getShifts = async (req, res) => {
  try {
    const { employeeId, date } = req.query;
    const shifts = await shiftService.getShifts(employeeId, date);
    res.json({ success: true, data: shifts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteShift = async (req, res) => {
  try {
    const { id } = req.params;
    await shiftService.deleteShift(id);
    res.json({ success: true, message: 'Shift deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { createShift, getShifts, deleteShift };

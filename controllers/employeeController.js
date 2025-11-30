const employeeService = require('../services/employeeService');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name, code, department, userId } = req.body;

    if (!name || !code || !department || !userId) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const employee = await employeeService.createEmployee(name, code, department, userId);
    res.status(201).json({ success: true, data: employee });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getAllEmployees, createEmployee };

const Employee = require('../models/Employee');

const getAllEmployees = async () => {
  return await Employee.find().populate('userId', 'email role');
};

const getEmployeesByUser = async (userId) => {
  return await Employee.find({ userId }).populate('userId', 'email');
};

const createEmployee = async (name, code, department, userId) => {
  const existingEmployee = await Employee.findOne({ code });
  if (existingEmployee) {
    throw new Error('Employee code already exists');
  }

  const employee = new Employee({ name, code, department, userId });
  await employee.save();
  return employee;
};

module.exports = {
  getAllEmployees,
  getEmployeesByUser,
  createEmployee,
};

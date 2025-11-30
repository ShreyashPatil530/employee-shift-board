const Shift = require('../models/Shift');

const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const calculateDuration = (startTime, endTime) => {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  return endMinutes - startMinutes;
};

const checkOverlapWithOtherShifts = async (employeeId, date, startTime, endTime, excludeShiftId = null) => {
  const dateStr = new Date(date).toDateString();
  
  let query = {
    employeeId,
    date: {
      $gte: new Date(dateStr),
      $lt: new Date(new Date(dateStr).getTime() + 24 * 60 * 60 * 1000),
    },
  };

  if (excludeShiftId) {
    query._id = { $ne: excludeShiftId };
  }

  const existingShifts = await Shift.find(query);

  for (const shift of existingShifts) {
    const existingStart = timeToMinutes(shift.startTime);
    const existingEnd = timeToMinutes(shift.endTime);
    const newStart = timeToMinutes(startTime);
    const newEnd = timeToMinutes(endTime);

    if (!(newEnd <= existingStart || newStart >= existingEnd)) {
      return true;
    }
  }

  return false;
};

const createShift = async (employeeId, date, startTime, endTime) => {
  const duration = calculateDuration(startTime, endTime);
  if (duration < 240) {
    throw new Error('Shift must be at least 4 hours');
  }

  const hasOverlap = await checkOverlapWithOtherShifts(employeeId, date, startTime, endTime);
  if (hasOverlap) {
    throw new Error('Employee has overlapping shift on this date');
  }

  const shift = new Shift({ employeeId, date, startTime, endTime });
  await shift.save();
  return shift.populate('employeeId');
};

const getShifts = async (employeeId = null, date = null) => {
  let query = {};

  if (employeeId) {
    query.employeeId = employeeId;
  }

  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
    query.date = { $gte: startDate, $lt: endDate };
  }

  return await Shift.find(query).populate('employeeId');
};

const deleteShift = async (shiftId) => {
  const shift = await Shift.findByIdAndDelete(shiftId);
  if (!shift) {
    throw new Error('Shift not found');
  }
  return shift;
};

module.exports = {
  createShift,
  getShifts,
  deleteShift,
  checkOverlapWithOtherShifts,
};

const validateShift = (req, res, next) => {
  const { date, startTime, endTime } = req.body;

  if (!date || !startTime || !endTime) {
    return res.status(400).json({
      success: false,
      message: 'Date, startTime, and endTime are required',
    });
  }

  const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
    return res.status(400).json({
      success: false,
      message: 'Time format must be HH:MM (24-hour)',
    });
  }

  next();
};

module.exports = { validateShift };

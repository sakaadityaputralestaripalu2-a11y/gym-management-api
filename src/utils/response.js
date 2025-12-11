exports.success = (res, status = 200, message = 'OK', data = {}) => {
  return res.status(status).json({ success: true, message, data });
};

exports.error = (res, status = 500, message = 'Error', errors = []) => {
  return res.status(status).json({ success: false, message, errors });
};

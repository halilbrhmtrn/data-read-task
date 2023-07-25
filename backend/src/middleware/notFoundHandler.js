const notFoundHandler = (req, res, next) => {
  // Return a 404 Not Found response
  res.status(404).json({ error: 'Not Found' });
};

module.exports = {
  notFoundHandler,
};


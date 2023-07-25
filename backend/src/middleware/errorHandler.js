const errorHandler = (err, req, res, next) => {
  // Handle and log the error
  console.error(err);
  
  // Return an error response
  res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = {
  errorHandler,
};


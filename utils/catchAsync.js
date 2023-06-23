module.exports = (fn) => (req, res, next) => {
  // Call the original async route handler function with the provided request, response, and next parameters.
  // If the function throws an error, catch it and pass it to the global error handling middleware.
  fn(req, res, next).catch(next);
};

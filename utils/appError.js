//  Custom error class for application errors
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // Determine if the error is a client error (4xx) or server error (5xx)
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // Indicates if the error is operational (can be handled by the application) or a programming error
    this.isOperational = true;

    // Capture stack trace for debugging purposes
    Error.captureStackTrace(this, AppError);
  }
}

module.exports = AppError;

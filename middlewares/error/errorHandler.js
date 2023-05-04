const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`) //create our own error message with new Error
  res.status(404)
  next(error) //send error to the next middleware - which is the errorHandler below - so the custom message we created will be apply to the error message in errHandler function
}

const errorHandler = (err, req, res, next) => {
  //needs 4 arguments
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err?.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = { errorHandler, notFound }

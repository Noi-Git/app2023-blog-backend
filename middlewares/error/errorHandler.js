const errorHandler = (err, req, res, next) => {
  //needs 4 arguments
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
}

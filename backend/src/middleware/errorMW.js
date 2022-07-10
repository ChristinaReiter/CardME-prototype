//not working hehe

const errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode)
  res.json({    
    message: err.message,
    stack: err.stack,
  });
}

module.exports = {
    errorHandler,
};
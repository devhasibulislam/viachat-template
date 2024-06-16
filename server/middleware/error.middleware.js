function error(err, _, res, _) {
  res.send({
    status: res.statusCode,
    acknowledgement: false,
    message: err.name,
    description: err.message,
  });
}

module.exports = error;

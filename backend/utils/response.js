function sendResponse(response, message, data, success, statusCode) {
  response.status(statusCode).send({
    success,
    message,
    data,
  });
}

module.exports.sendSuccess = function (
  response,
  message,
  data,
  statusCode = 200
) {
  sendResponse(response, message, data, true, statusCode);
};

module.exports.sendError = function (
  response,
  message,
  data = {},
  statusCode = 400
) {
  sendResponse(response, message, data, false, statusCode);
};

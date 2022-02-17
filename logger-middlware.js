const logger = require('./utils/logger');

const LoggerMiddleware = function (request, response, next) {
  console.log(`middleware`);
  logger.error(params);
  next();
}

module.exports = LoggerMiddleware;
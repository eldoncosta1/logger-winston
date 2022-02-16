const { format, createLogger, transports } = require('winston');;
const { combine, json, label, timestamp, printf } = format;

// Import mongodb
require('winston-mongodb');

const logConfiguration = {
  'transports': [
    new transports.Console({
      level: 'error' | 'warn',
      format: combine(
        // label({
        //   label: `🚩 level`
        // }),
        timestamp({
          format: 'YYYY-MMM-DD HH:mm:ss'
        }),
        printf(info => `${info.level}: ${info.label}: ${info.timestamp}: ${info.message}`),
        json()
      )
    }),
    new transports.File({
      filename: 'logs/server.log',
      format: combine(
        // label({
        //   label: `🚩 level`
        // }),
        timestamp({
          format: 'YYYY-MMM-DD HH:mm:ss'
        }),
        printf(info => `${info.level}: ${info.label}: ${info.timestamp}: ${info.message}`),
        json()
      )
    }),
    new transports.MongoDB({
      level: 'error' | 'warn',
      db: 'mongodb://localhost:27017/dev_class_backend',
      options: {
        useUnifiedTopology: true
      },
      collection: 'event_logger',
      format: format.combine(
        format.timestamp(),
        // convert logs to a json format
        format.json()
      )
    })
  ]
};

module.exports = createLogger(logConfiguration);

// const logger = winston.createLogger(logConfiguration);

// logger.error("Hello, Winston logger, the first error!");
// logger.warn("Hello, Winston logger, the first warning!");
// logger.warn("Hello, Winston logger, the second warning!");
// logger.error("Hello, Winston logger, the second error!");
// logger.info("Hello, Winston logger, some info!");
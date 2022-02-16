const winston = require('winston');
const { format, createLogger } = winston;
const { combine, json, label, timestamp, printf } = format;

const logConfiguration = {
  'transports': [
    new winston.transports.Console({
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
    new winston.transports.File({
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
const express = require('express');

const logger = require('./utils/logger');
const LoggerMiddleware = require('./logger-middlware');

const bodyParser = require('body-parser');
const responseTime = require('response-time')


// const LoggerMiddleware = function (request, response, next) {
//   console.log(`middleware`);
//   // logger.error(params);
//   next();
// }

const app = express();
const port = 3000;
const host = 'localhost';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(LoggerMiddleware);
app.use(responseTime());

app.get('/', (req, res) => {
  res.send('Hello World!');
  logger.info('Server Sent a Hello World', { userId: 10 });
});


// Introduce error by using undefined variable y
app.get('/calc', (req, res) => {
  const x = y + 10;
  res.send(x.toString());
});

// Capture 500 errors
app.use((err, req, res, next) => {
  res.status(500).send('Could not perform the calculation');

  // logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  logger.error('ERROR 500', { method: req.method, path: req.path, ip: req.ip, duration: res.get('X-Response-Time') })
});

// Capture 404 errors
app.use((req, res, next) => {
  res.status(404).send('Page not found');
  // logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  const userId = 10;
  const name = 20;
  const params = { userId, name };

  // logger.error('page not found', { params })
  logger.error('ERROR 404', { method: req.method, path: req.path, ip: req.ip, duration: res.get('X-Response-Time') })
});


app.listen(port, () => {
  console.log('Server started...');
  logger.info(`Server started and running on http://${host}:${port}`);
});

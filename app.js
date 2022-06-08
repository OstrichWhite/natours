// node_modules
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json()); //used to parse the incoming requests with JSON payloads
app.use((req, res, nexting) => {
  console.log('hello from the middleware');
  nexting();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// START SERVER
module.exports = app;

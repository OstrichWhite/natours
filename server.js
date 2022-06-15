/* eslint-disable no-console */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1); //0- success, 1-exception
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log('DB Connected Succesfully'));
// .catch((err) => console.log('something happened to Database', err));

const port = process.env.PORT || 1234;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); //0- success, 1-exception by putting this into the callback for give time to server to finish all the previous operations (req,res)
  });
});

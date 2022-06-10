const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected Succesfully'))
  .catch((err) => console.log('something happened to Database', err));

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

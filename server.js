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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Tour must have a Name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 2.5,
  },
  price: {
    type: Number,
    required: [true, 'A Tour must have a Price'],
  },
});
const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Forest Hiker 1',
  rating: 4.7,
  price: 1560,
});

testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log(err));

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

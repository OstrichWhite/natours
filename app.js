// core modules
const fs = require('fs');
// node_modules
const express = require('express');

const app = express();

// Middlewares
app.use(express.json()); //used to parse the incoming requests with JSON payloads

// File Read here
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'hello from the server',
    app: 'natours',
  }); //res.json give the json = JS Obj >>> JSON
});

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours, //tours:tours Obj //ES6 consider if obj has single value then key and value are the same name
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  // console.log(req.params);
  const id = req.params.id * 1; //convert string to number
  const tour = tours.find((el) => el.id === id);
  if (id > tours.length || !tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Tour' });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour, //tour:tour
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Tour' });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour Here...>',
    },
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Tour' });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const port = 1234;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// core modules
const fs = require('fs');
// node_modules
const express = require('express');
const morgan = require('morgan');

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

// File Read here
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// ROUTE HANDLERS
const getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours, //tours:tours Obj //ES6 consider if obj has single value then key and value are the same name
    },
  });
};

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Tour' });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour Here...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Tour' });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// Routes
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// ROUTES
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// START SERVER
const port = 1234;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

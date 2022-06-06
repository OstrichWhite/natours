// core modules
const fs = require('fs');
// node_modules
const express = require('express');

const app = express();

// File reads are done in top level code so file read done once a program executed if you put it on the http method handlers you will regret for this later. 😭
const tours = JSON.parse(
  //JSON.parse = JSON >>> JS Obj
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours, //ES6 consider if single value then key and value are the same name
    },
  });
});

// app.get('/', (req, res) => {
//   //   res.status(200).send('hello from the server side');
//   res.status(200).json({ message: 'hello from the server', app: 'natours' }); //res.json give the json = JS Obj >>> JSON
// });

// app.post('/', (req, res) => {
//   res.status(404).send(`You can't post to this endpoint...`);
// });

const port = 1234;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

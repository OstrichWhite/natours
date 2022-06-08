const app = require('./app');

const port = 1234;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

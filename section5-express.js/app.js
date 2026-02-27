const express = require('express');

const app = express();

// https://expressjs.com/en/5x/api.html#app.use
// app.use([path,] callback [, callback...])
// path defaults to '/' if not specified. This means that the middleware function will be executed for every request to the app, regardless of the requested path. 
// If a path is specified, the middleware function will only be executed for requests that match the specified path.
app.use('/', (req, res, next) => {
  console.log('This always runs!');
  next();
});

app.use('/add-product', (req, res, next) => {
  console.log('In another middleware!');
  res.send('<h1>Add Product Page</h1>');
});

app.use('/', (req, res, next) => {
  console.log('In another middleware!');
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);
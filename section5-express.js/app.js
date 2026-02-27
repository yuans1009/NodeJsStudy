const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse body sent by HTML forms
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/add-product', (req, res, next) => {
  res.send('<form action="/products" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

app.post('/products', (req, res, next) => {
   console.log(req.body); // undefined, because we haven't set up body parsing middleware yet
   res.redirect('/'); // redirect to the root path
});

app.get('/', (req, res, next) => {
  console.log('In another middleware!');
  res.send('<h1>Hello from Express - GET!</h1>');
});

app.listen(3000);
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

// NOTE: the order of middleware matters if using app.use()! 
// We need to set up body parsing middleware before we define our routes that need to access req.body
// app.get() app.post() use exact path matching, while app.use() will match any path that starts with the given path (or all paths if no path is given). So if we use app.use() for our routes, we need to make sure to place it after the body parsing middleware, otherwise req.body will be undefined in our route handlers.
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// This will catch any requests that haven't been handled by the above routes and send a 404 response
app.use((req, res, next) => {
  res.status(404)
     .send('<h1>Page Not Found</h1>');
});

app.listen(3000);
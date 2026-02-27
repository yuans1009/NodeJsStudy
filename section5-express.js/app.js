const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

// NOTE: the order of middleware matters if using app.use()! 
// We need to set up body parsing middleware before we define our routes that need to access req.body
// app.get() app.post() use exact path matching, while app.use() will match any path that starts with the given path (or all paths if no path is given). So if we use app.use() for our routes, we need to make sure to place it after the body parsing middleware, otherwise req.body will be undefined in our route handlers.
app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000);
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorCotnroller = require("./controllers/error");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); // views is the default value, can be omitted

const adminRoutes = require("./routes/admin");
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorCotnroller.get404);
   
app.listen(3000);

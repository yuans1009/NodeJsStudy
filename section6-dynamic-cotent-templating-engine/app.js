const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const app = express();

// set up express-handlebars as templating engine
// the name should be the same as the extension of the template files
app.engine('handlebars', expressHbs());
app.set('view engine', 'handlebars');
app.set('views', 'views'); // views is the default value, can be omitted

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404)
       .render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);

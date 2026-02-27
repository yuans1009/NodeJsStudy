const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res, next) => {
   // '/' means the root path of OS.
   // res.sendFile('/views/shop.html');

   // __dirname is the directory of the current module (i.e. the directory of this shop.js file). 
   // So we need to go up one level to get to the root directory of our project, and then navigate to the views folder and then to shop.html.
   res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
});

module.exports = router;
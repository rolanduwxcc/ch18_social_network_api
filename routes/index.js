//import mw and routes
const router = require('express').Router();
const apiRoutes = require('./api');

//add prefixes to routes
router.use('/api', apiRoutes);


//default 404 page if can't resolve a route
router.use((req, res) => {
    res.status(404).send('<h1>😝 404 Error WLR</h1>')
});

module.exports = router;
const router = require('express').Router();

const tmEventRoutes = require('./tmEventController');

router.use('/events', tmEventRoutes);

module.exports = router;
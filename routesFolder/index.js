const router = require('express').Router();

const Stores = require('./store');

router.use('/stores', Stores);

module.exports = router;

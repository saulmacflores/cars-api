const router = require('express').Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const Stores = require('./store');
const Vehicles = require('./vehicles');

// use the swagger documentation
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router.use('/stores', Stores);
router.use('/vehicles', Vehicles);

module.exports = router;

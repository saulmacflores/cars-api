// Ryan Singleton
const routes = require("express").Router();
const vehiclesController = require("../controllersFolder/vehicles");
const { isAuthenticated } = require("../middlewareFolder/authenticate");
const validation = require("../middlewareFolder/validation/validate.vehicles");

routes.get("/new", (req, res) => {
    res.render("new-vehicle");
});

routes.get("/", (req, res) => {
  /* #swagger.parameters['vin'] = {
    in: 'query',
    description: 'Vehicle Identification Number to filter vehicles by.',
    required: false,
    type: 'string'
    } */
  /* #swagger.parameters['make'] = {
    in: 'query',
    description: 'Make of the vehicle to filter vehicles by.',
    required: false,
    type: 'string'
    } */

  // Normalize query parameters to lowercase keys
  const queryParams = Object.keys(req.query).reduce((acc, key) => {
    acc[key.toLowerCase()] = req.query[key];
    return acc;
  }, {});

  const { vin, make } = queryParams;

  if (vin) {
    // get vehicle by vin
    return vehiclesController.getVehicleByVIN(req, res, vin); // Make sure to pass vin if needed
  } else if (make) {
    // get vehicles by make
    return vehiclesController.getVehiclesByMake(req, res, make); // Make sure to pass make if needed
  } else {
    // get all vehicles
    return vehiclesController.getAllVehicles(req, res);
  }
});

//Get by vehicle ID
routes.get("/:vehicle_id", vehiclesController.getOneVehicle);



// create a vehicle
routes.post("/", validation.saveVehicle, vehiclesController.create);

// update a vehicle
routes.put("/:_id", validation.saveVehicle ,vehiclesController.update);

// delete a vehicle or all vehicles
routes.delete("/:_id", validation.saveVehicle, vehiclesController.deleteOne);
routes.delete("/", validation.saveVehicle, vehiclesController.deleteAll);

module.exports = routes;

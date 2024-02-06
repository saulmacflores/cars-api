// Ryan Singleton
const routes = require("express").Router();
const vehiclesController = require("../controllersFolder/vehicles");
const { isAuthenticated } = require("../middlewareFolder/authenticate");

routes.get("/", vehiclesController.getAllVehicles);

routes.get("/:vehicle_id", vehiclesController.getOneVehicle);

// create a vehicle
routes.post("/", vehiclesController.create);

// update a vehicle
routes.put("/:_id", vehiclesController.update);

// delete a vehicle or all vehicles
routes.delete("/:_id", vehiclesController.deleteOne);
routes.delete("/", vehiclesController.deleteAll);

module.exports = routes;

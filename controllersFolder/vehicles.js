// Ryan Singleton
const Vehicle = require("../modelsFolder/vehicles.js");

const getAllVehicles = async (req, res, next) => {
  // #swagger.tags = ['Vehicles']
  // #swagger.description = 'Endpoint to get all vehicles'
  // #swagger.summary = 'Get all vehicles'
  try {
    const vehicles = await Vehicle.find({});
    res.json(vehicles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error accessing the database", error: error });
  }
};

const getOneVehicle = async (req, res, next) => {
  // #swagger.tags = ['Vehicles']
  // #swagger.description = 'Endpoint to get one vehicle'
  // #swagger.summary = 'Get one vehicle'

  const vehicleId = req.params.vehicle_id;

  if (!vehicleId) {
    return res
      .status(400)
      .json({ message: "Vehicle ID is required in the path." });
  }

  try {
    const vehicle = await Vehicle.findById(vehicleId);
    if (vehicle) {
      res.json(vehicle);
    } else {
      res.status(404).json({ message: "Vehicle not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error accessing the database: " + error.message });
  }
};

const getVehicleByVIN = async (req, res, vin, next) => {
    // #swagger.tags = ['Vehicles']
  // #swagger.description = 'Endpoint to get a vehicle by VIN'
  // #swagger.summary = 'Get one vehicle by VIN'

//   const { vin } = req.query; // Get VIN from query parameters

  if (!vin) {
    return res
      .status(400)
      .json({ message: "VIN query parameter is required." });
  }

  try {
    const vehicle = await Vehicle.findOne({ vin: vin });
    if (vehicle) {
      res.json(vehicle);
    } else {
      res
        .status(404)
        .json({ message: "Vehicle with the specified VIN not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error accessing the database: " + error.message });
  }
};

const getVehiclesByMake = async (req, res, next) => {
     // #swagger.tags = ['Vehicles']
  // #swagger.description = 'Endpoint to get all vehicles by make'
  // #swagger.summary = 'Get all vehicles by make'

  const { make } = req.query; // Get make from query parameters

  if (!make) {
    return res
      .status(400)
      .json({ message: "Make query parameter is required." });
  }

  try {
    const vehicles = await Vehicle.find({ make: make });
    if (vehicles.length > 0) {
      res.json(vehicles);
    } else {
      res
        .status(404)
        .json({ message: "No vehicles found for the specified make." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error accessing the database: " + error.message });
  }
};

const create = (req, res) => {
  // #swagger.tags = ['Vehicles']
  // #swagger.description = 'Endpoint to create a vehicle'
  // #swagger.summary = 'Create a vehicle'

  const { make, model, year, color, price, condition, vin } = req.body;

  // Validation
  if (!make) {
    return res.status(400).send({ message: "Make field cannot be empty!" });
  }
  if (!model) {
    return res.status(400).send({ message: "Model field is required!" });
  }
  if (!year || isNaN(year) || year.length !== 4) {
    return res
      .status(400)
      .send({ message: "Year must be a valid 4-digit number!" });
  }
  if (!color) {
    return res.status(400).send({ message: "Color field cannot be empty!" });
  }
  if (!price || isNaN(price)) {
    return res.status(400).send({ message: "Price must be a valid number!" });
  }
  if (!condition || (condition !== "New" && condition !== "Used")) {
    return res
      .status(400)
      .send({ message: "Condition must be either 'New' or 'Used'!" });
  }
  if (!vin) {
    return res.status(400).send({ message: "VIN field cannot be empty!" });
  }

  // Create a Vehicle
  const vehicle = new Vehicle({
    make,
    model,
    year,
    color,
    price,
    condition,
    vin,
  });

  // Save Vehicle in the database
  vehicle
    .save()
    .then((data) => {
      res.send(
        `Success! ${data.make} ${data.model} created with VIN: ${data.vin} and ID: ${data._id}.`
      );
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error occurred while creating the Vehicle: " + err.message,
      });
    });
};

// Update a Vehicle by the id in the request
const update = (req, res) => {
  // #swagger.tags = ['Vehicles']
  // #swagger.description = 'Endpoint to update a vehicle'
  // #swagger.summary = 'Update a vehicle'

  const id = req.params._id;

  if (!id) {
    return res.status(400).send({
      message: "Vehicle ID is required.",
    });
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  Vehicle.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Vehicle with id=${id}. Maybe Vehicle was not found!`,
        });
      } else {
        res.send({ message: "Vehicle was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Vehicle with id=" + id + ": " + err.message,
      });
    });
};

// Delete a Vehicle with the specified id in the request
const deleteOne = (req, res) => {
  // #swagger.tags = ['Vehicles']
  // #swagger.description = 'Endpoint to delete a vehicle'
  // #swagger.summary = 'Delete a vehicle'

  const id = req.params._id;

  if (!id) {
    return res.status(400).send({
      message: "Vehicle ID is required.",
    });
  }

  Vehicle.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Vehicle with id=${id}. Maybe Vehicle was not found!`,
        });
      } else {
        res.status(200).send({
          message: "Vehicle was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Vehicle with id=" + id + ": " + err.message,
      });
    });
};

// Delete all Vehicles from the database.
const deleteAll = (req, res) => {
  // #swagger.tags = ['Vehicles']
  // #swagger.description = 'Endpoint to delete all vehicles'
  // #swagger.summary = 'Delete all vehicles'

  Vehicle.deleteMany({})
    .then((data) => {
      res.status(200).send({
        message: `${data.deletedCount} Vehicles were deleted successfully!`,
      });
    })
    .catch((err) => {
      console.error("Error deleting vehicles: ", err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all vehicles.",
      });
    });
};

module.exports = {
  getAllVehicles,
  getOneVehicle,
  getVehicleByVIN,
  getVehiclesByMake,
  create,
  update,
  deleteOne,
  deleteAll,
};

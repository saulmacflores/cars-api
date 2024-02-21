const validator = require("./validate.setup");

// Create saveUser

const saveVehicle = async (req, res, next) => {
  const validationRule = {
    make: "required|string",
    model: "required|string",
    year: "required|integer", 
    color: "required|string",
    price: "required|numeric", 
    condition: "required|string",
    vin: "required|string",
    base64Image: "required|string",
  };
  try {
    await validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: "Validation failed",
          data: error,
        });
      } else {
        next();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  saveVehicle,
};

// Ryan Singleton
const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema(
  {
    make: String,
    model: String,
    year: Number,
    color: String,
    price: Number,
    condition: String,
    vin: String,
    base64Image: String,
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema, "vehicles"); // this last parameter specifies the collection name

module.exports = Vehicle;

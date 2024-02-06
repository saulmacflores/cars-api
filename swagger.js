const swaggerAutogen = require("swagger-autogen")();
const local = "localhost:3000";
const render = "";

const doc = {
  info: {
    title: "Team Project",
    description:
      "This API allows you to create, read, update, and delete vehicles, stores, parts, and users.",
  },
  host: local,
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const routes = ["./routesFolder/index.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);

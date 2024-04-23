const swaggerJsDoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fxcure Payment Gateway API",
      version: "1.0.0",
      description: "Secure_Payment_lottri for App Development",
    },
    servers: [
      {
        url: `${process.env.API_URL}`,
        description: "Local server",
      },
    ],
  },
  apis: ["./src/features/**/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;

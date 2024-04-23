require("dotenv").config();
require("module-alias/register");

const express = require("express");
const { loadRoutes } = require("@features/routeLoader");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("@config/swaggerConfig");

const cookieparser = require("cookie-parser");
const cors = require("cors");
const { imageMovingJob } = require("@features/uploads/v1/uploadsService");

//cron job

//const { errorMiddleware } = require('./src/middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieparser());


var whitelist = ['http://localhost:3001', 'http://localhost:3000','https://rajexp-api.fluttertop.com']
var corsOptions = {
  origin: function (origin, callback) {
    // if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    // } else {
    //   callback(new Error('Not allowed by CORS'))
    // }
  }
}
app.use(cors(corsOptions));

loadRoutes(app);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware
// app.use(errorMiddleware);
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
